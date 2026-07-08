import incidentsJson from '@/data/incidents.json';
import type { Incident, CategoryId } from './types';

export const incidents: Incident[] = incidentsJson as unknown as Incident[];

export function getIncidents(filter?: {
  category?: CategoryId;
  /** Cross-cutting: only fat-tail / black-swan incidents, regardless of category. */
  blackSwanOnly?: boolean;
}): Incident[] {
  return incidents.filter(
    (i) =>
      (!filter?.category || i.category === filter.category) &&
      (!filter?.blackSwanOnly || i.blackSwan === true),
  );
}

export function getIncidentById(id: string): Incident | undefined {
  return incidents.find((i) => i.id === id);
}

export function countByCategory(filter?: { blackSwanOnly?: boolean }): Record<CategoryId, number> {
  const counts = {} as Record<CategoryId, number>;
  for (const inc of incidents) {
    if (filter?.blackSwanOnly && !inc.blackSwan) continue;
    counts[inc.category] = (counts[inc.category] ?? 0) + 1;
  }
  return counts;
}

/** Which categories contain at least one fat-tail / black-swan incident — for filter badges. */
export function categoriesWithBlackSwan(): Set<CategoryId> {
  return new Set(incidents.filter((i) => i.blackSwan).map((i) => i.category));
}

export const blackSwanCount = incidents.filter((i) => i.blackSwan).length;

export const isSeedDataset = incidents.every((i) => i.seed);
