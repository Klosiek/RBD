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
  Paid: boolean;

  @Column({ nullable: true })
  PaymentDate: Date;

  @Column({ type: "float" })
  Amount: number;

  @ManyToOne(() => HistoricalData, (x) => x.Bills)
  HistoricalData: HistoricalData;
}
