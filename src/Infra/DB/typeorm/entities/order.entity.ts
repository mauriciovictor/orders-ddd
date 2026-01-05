import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CustomerEntity } from './customer.entity.js';
import { OrderItemEntity } from './order-item.entity.js';

@Entity('orders')
export class OrderEntity {
  @PrimaryColumn('uuid')
  declare id: string;

  @Column('uuid')
  declare customer_id: string;

  @Column('real')
  declare total: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.orders)
  @JoinColumn({ name: 'customer_id' })
  declare customer: CustomerEntity;

  @OneToMany(() => OrderItemEntity, (item) => item.order, {
    cascade: ['update', 'insert'],
  })
  declare items: OrderItemEntity[];
}
