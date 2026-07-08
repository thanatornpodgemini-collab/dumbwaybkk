'use client';

import * as React from 'react';
import Map, { Marker, Popup, Source, Layer, NavigationControl, type MapRef } from 'react-map-gl';
import type { FeatureCollection, Feature, Polygon } from 'geojson';
import 'mapbox-gl/dist/mapbox-gl.css';

import { getIncidents } from '@/lib/incidents';
import { CATEGORIES_BY_ID } from '@/lib/categories';
import { useApp } from '@/lib/store';
import { CHARACTERS } from './characters';
import { IncidentPopup } from './IncidentPopup';
import { MissingTokenPlaceholder } from './MissingTokenPlaceholder';

const BANGKOK_CENTER = { longitude: 100.5018, latitude: 13.7563, zoom: 11 };

function metersToDegLat(m: number) {
  return m / 111320;
}
function metersToDegLng(m: number, lat: number) {
  return m / (111320 * Math.cos((lat * Math.PI) / 180));
}

function circlePolygon(lng: number, lat: number, radiusM: number, steps = 48): Feature<Polygon> {
  const coords: [number, number][] = [];
  const dLat = metersToDegLat(radiusM);
  const dLng = metersToDegLng(radiusM, lat);
  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * Math.PI * 2;
    coords.push([lng + dLng * Math.cos(theta), lat + dLat * Math.sin(theta)]);
  }
  return {
    type: 'Feature',
    properties: {},
    geometry: { type: 'Polygon', coordinates: [coords] },
  };
}

export function IncidentMap() {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const style = process.env.NEXT_PUBLIC_MAPBOX_STYLE ?? 'mapbox://styles/mapbox/light-v11';
  const activeCategory = useApp((s) => s.activeCategory);
  const blackSwanOnly = useApp((s) => s.blackSwanOnly);
  const selectedId = useApp((s) => s.selectedIncidentId);
  const setSelected = useApp((s) => s.setSelectedIncidentId);
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  const mapRef = React.useRef<MapRef>(null);

  const incidents = React.useMemo(
    () => getIncidents({ category: activeCategory ?? undefined, blackSwanOnly }),
    [activeCategory, blackSwanOnly],
  );

  const isFiltered = activeCategory !== null || blackSwanOnly;

  // Keep the selection reachable: some black-swan sites (Sikhio, 250 km NE)
  // sit far outside the default Bangkok viewport.
  React.useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (!isFiltered) {
      map.flyTo({ center: [BANGKOK_CENTER.longitude, BANGKOK_CENTER.latitude], zoom: BANGKOK_CENTER.zoom, duration: 1200 });
      return;
    }
    if (incidents.length === 0) return;
    let minLng = Infinity, minLat = Infinity, maxLng = -Infinity, maxLat = -Infinity;
    for (const i of incidents) {
      minLng = Math.min(minLng, i.coordinates[0]);
      maxLng = Math.max(maxLng, i.coordinates[0]);
      minLat = Math.min(minLat, i.coordinates[1]);
      maxLat = Math.max(maxLat, i.coordinates[1]);
    }
    map.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 100, maxZoom: 13, duration: 1200 },
    );
  }, [isFiltered, incidents]);

  const radiiGeoJson: FeatureCollection = React.useMemo(
    () => ({
      type: 'FeatureCollection',
      features: incidents.map((i) => ({
        ...circlePolygon(i.coordinates[0], i.coordinates[1], i.radiusM),
        properties: { id: i.id, color: CATEGORIES_BY_ID[i.category].color },
      })),
    }),
    [incidents],
  );

  if (!token) {
    return <MissingTokenPlaceholder incidents={incidents} />;
  }

  const selected = incidents.find((i) => i.id === selectedId) ?? null;

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={token}
      mapStyle={style}
      initialViewState={BANGKOK_CENTER}
      style={{ width: '100%', height: '100%' }}
      reuseMaps
    >
      <NavigationControl position="top-right" />

      <Source id="incident-radii" type="geojson" data={radiiGeoJson}>
        <Layer
          id="radii-fill"
          type="fill"
          paint={{
            'fill-color': ['get', 'color'],
            'fill-opacity': 0.18,
          }}
        />
        <Layer
          id="radii-line"
          type="line"
          paint={{
            'line-color': ['get', 'color'],
            'line-width': 2,
            'line-dasharray': [2, 2],
          }}
        />
      </Source>

      {incidents.map((inc) => {
        const C = CHARACTERS[inc.category];
        return (
          <Marker
            key={inc.id}
            longitude={inc.coordinates[0]}
            latitude={inc.coordinates[1]}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelected(inc.id);
            }}
          >
            <button
              type="button"
              aria-label={inc.title.en}
              className="block hover:-translate-y-1 transition-transform drop-shadow"
              onMouseEnter={() => setHoveredId(inc.id)}
              onMouseLeave={() => setHoveredId((id) => (id === inc.id ? null : id))}
              onFocus={() => setHoveredId(inc.id)}
              onBlur={() => setHoveredId((id) => (id === inc.id ? null : id))}
            >
              <C
                size={inc.blackSwan ? 60 : 48}
                severity={inc.severity}
                motionState={
                  hoveredId === inc.id || selectedId === inc.id ? 'active' : 'idle'
                }
              />
            </button>
          </Marker>
        );
      })}

      {selected ? (
        <Popup
          longitude={selected.coordinates[0]}
          latitude={selected.coordinates[1]}
          anchor="top"
          closeOnClick={false}
          onClose={() => setSelected(null)}
          maxWidth="320px"
        >
          <IncidentPopup incident={selected} />
        </Popup>
      ) : null}
    </Map>
  );
}
