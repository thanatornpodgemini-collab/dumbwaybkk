import type { CategoryId } from '@/lib/types';
import type { CharacterProps } from './CharacterBase';
import { RailCharacter } from './RailCharacter';
import { MotorbikeCharacter } from './MotorbikeCharacter';
import { KlongBoatCharacter } from './KlongBoatCharacter';
import { ElectrocutionCharacter } from './ElectrocutionCharacter';
import { SoiDogCharacter } from './SoiDogCharacter';
import { BillboardCharacter } from './BillboardCharacter';
import { ConstructionCharacter } from './ConstructionCharacter';
import { SongkranCharacter } from './SongkranCharacter';
import { PollutionCharacter } from './PollutionCharacter';
import { TukTukCharacter } from './TukTukCharacter';
import { StreetFoodCharacter } from './StreetFoodCharacter';
import { FloodCharacter } from './FloodCharacter';

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
