import incidentsJson from '@/data/incidents.json';
import type { Incident, CategoryId } from './types';

export const incidents: Incident[] = incidentsJson as unknown as Incident[];

export function getIncidents(filter?: { category?: CategoryId }): Incident[] {
  if (!filter?.category) return incidents;
  return incidents.filter((i) => i.category === filter.category);
}

export function getIncidentById(id: string): Incident | undefined {
  return incidents.find((i) => i.id === id);
}

export function countByCategory(): Record<CategoryId, number> {
  const counts = {} as Record<CategoryId, number>;
  for (const inc of incidents) {
    counts[inc.category] = (counts[inc.category] ?? 0) + 1;
  }
  return counts;
}

export const isSeedDataset = incidents.every((i) => i.seed);
