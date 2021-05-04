import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RenovationFund extends BaseEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  OwnerId: number;

  @Column()
  RenovationFundContribution: number;

  @Column()
  PaymentDate: Date;
}
