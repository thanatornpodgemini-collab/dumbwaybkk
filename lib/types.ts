export type CategoryId =
  | 'rail'
  | 'motorbike'
  | 'klong_boat'
  | 'electrocution'
  | 'soi_dog'
  | 'billboard'
  | 'construction'
  | 'songkran'
  | 'pollution'
  | 'tuktuk'
  | 'street_food'
  | 'flood'
  | 'bts_psd'
  | 'makkasan_crossing'
  | 'sikhio_crash';

export type Severity = 'fatal' | 'injury' | 'near_miss';

export interface LocalizedText {
  en: string;
  th: string;
}

export interface Incident {
  id: string;
  category: CategoryId;
  title: LocalizedText;
  summary: LocalizedText;
  /** ISO date, e.g. "2022-08-15" */
  date: string;
  /** Bangkok district / khwaeng / soi - free-form locality label */
  location: LocalizedText;
  /** [longitude, latitude] for Mapbox */
  coordinates: [number, number];
  /** approximate radius of impact in meters */
  radiusM: number;
  severity: Severity;
  /** number of people affected (best effort) */
  victims?: number;
  /** original news sources */
  sources: { name: string; url: string }[];
  /** true when entry comes from the curated seed file rather than the scraper */
  seed?: boolean;
  /** true for rare, systemic-failure events — the map's reason for existing */
  blackSwan?: boolean;
  /** the specific safeguards that all failed at once, one line each */
  systemFailures?: LocalizedText[];
}

export interface CategoryMeta {
  id: CategoryId;
  label: LocalizedText;
  color: string;
  /** short, deadpan one-liner shown above the character */
  tagline: LocalizedText;
  /** groups the category under the "Black swans" section of the filter */
  blackSwan?: boolean;
}

export type Lang = 'en' | 'th';
