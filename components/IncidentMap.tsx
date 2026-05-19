'use client';

import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Map, { Marker, Popup, Source, Layer, NavigationControl } from 'react-map-gl';
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
  const selectedId = useApp((s) => s.selectedIncidentId);
  const setSelected = useApp((s) => s.setSelectedIncidentId);

  const incidents = React.useMemo(
    () => getIncidents({ category: activeCategory ?? undefined }),
    [activeCategory],
  );

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
            >
              <C size={48} animation="bob" />
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

/** Renders a character to inline SVG markup (handy for non-React map markers if needed later). */
export function characterMarkup(category: keyof typeof CHARACTERS) {
  const C = CHARACTERS[category];
  return renderToStaticMarkup(<C size={48} />);
}
