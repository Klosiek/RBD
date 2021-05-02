import { BuildingId, PlaceType } from "../enums";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bill } from "./Bill";

@Entity()
export class HistoricalData extends BaseEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  OwnerId: number;

  @Column()
  PlaceId: number;

  @Column()
  ResidentsCount: number;

  @Column()
  PlaceType: PlaceType;

  @Column()
  BuildingId: BuildingId;

  @Column()
  RenovationFundContribution: number;

  @OneToMany(() => Bill, (x) => x.UserData)
  Bills: Bill[];
}
