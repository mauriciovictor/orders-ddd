import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { OrderEntity } from '../../../../checkout/repository/typeorm/entity/order.entity.js';

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

  @OneToMany(() => OrderEntity, (order) => order.customer)
  declare orders: OrderEntity[];
}
