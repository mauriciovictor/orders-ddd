import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('customers')
export class CustomerEntity {
  @PrimaryColumn('uuid')
  declare id: string;

  @Column('text')
  declare name: string;

  @Column('text')
  declare street: string;

  @Column('real')
  declare number: number;

  @Column('text')
  declare zipcode: string;

  @Column('text', { nullable: true })
  declare city: string;

  @Column('boolean')
  declare active: boolean;

  @Column('real')
  declare rewardPoints: number;
}
