import type { CategoryId } from '@/lib/types';
import type { CharacterProps } from './CharacterBase';
import type { CharacterTimeline } from './timelines';
import { RailCharacter, railTimeline } from './RailCharacter';
import { MotorbikeCharacter, motorbikeTimeline } from './MotorbikeCharacter';
import { KlongBoatCharacter, klongBoatTimeline } from './KlongBoatCharacter';
import { ElectrocutionCharacter, electrocutionTimeline } from './ElectrocutionCharacter';
import { SoiDogCharacter, soiDogTimeline } from './SoiDogCharacter';
import { BillboardCharacter, billboardTimeline } from './BillboardCharacter';
import { ConstructionCharacter, constructionTimeline } from './ConstructionCharacter';
import { SongkranCharacter, songkranTimeline } from './SongkranCharacter';
import { PollutionCharacter, pollutionTimeline } from './PollutionCharacter';
import { TukTukCharacter, tuktukTimeline } from './TukTukCharacter';
import { StreetFoodCharacter, streetFoodTimeline } from './StreetFoodCharacter';
import { FloodCharacter, floodTimeline } from './FloodCharacter';

export const CHARACTERS = {
  rail: RailCharacter,
  motorbike: MotorbikeCharacter,
  klong_boat: KlongBoatCharacter,
  electrocution: ElectrocutionCharacter,
  soi_dog: SoiDogCharacter,
  billboard: BillboardCharacter,
  construction: ConstructionCharacter,
  songkran: SongkranCharacter,
  pollution: PollutionCharacter,
  tuktuk: TukTukCharacter,
  street_food: StreetFoodCharacter,
  flood: FloodCharacter,
} as const satisfies Record<CategoryId, (props: CharacterProps) => JSX.Element>;

/** Bespoke "how it goes wrong" timeline per category, mirroring CHARACTERS. */
export const TIMELINES = {
  rail: railTimeline,
  motorbike: motorbikeTimeline,
  klong_boat: klongBoatTimeline,
  electrocution: electrocutionTimeline,
  soi_dog: soiDogTimeline,
  billboard: billboardTimeline,
  construction: constructionTimeline,
  songkran: songkranTimeline,
  pollution: pollutionTimeline,
  tuktuk: tuktukTimeline,
  street_food: streetFoodTimeline,
  flood: floodTimeline,
} as const satisfies Record<CategoryId, CharacterTimeline>;

export type CharacterComponent = (typeof CHARACTERS)[CategoryId];

export {
  RailCharacter,
  MotorbikeCharacter,
  KlongBoatCharacter,
  ElectrocutionCharacter,
  SoiDogCharacter,
  BillboardCharacter,
  ConstructionCharacter,
  SongkranCharacter,
  PollutionCharacter,
  TukTukCharacter,
  StreetFoodCharacter,
  FloodCharacter,
};
