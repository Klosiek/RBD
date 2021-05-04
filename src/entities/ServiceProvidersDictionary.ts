import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ServiceProvidersDictionary extends BaseEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  BillTypeId: number;

  @Column()
  ProviderName: string;
}
