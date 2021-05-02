import { BillType } from "../enums";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HistoricalData } from "./HistoricalData";

@Entity()
export class Bill extends BaseEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Type: BillType;

  @Column()
  Paid: number;

  @Column()
  PaymentDate: Date;

  @Column()
  Amount: number;

  @ManyToOne(() => HistoricalData, (x) => x.Bills)
  UserData: HistoricalData;
}
