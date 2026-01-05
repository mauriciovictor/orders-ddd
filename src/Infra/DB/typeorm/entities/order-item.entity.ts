import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { OrderEntity } from './order.entity.js';
import { ProductEntity } from './product.entity.js';

@Entity('order_items')
export class OrderItemEntity {
  @PrimaryColumn('uuid')
  declare id: string;

  @Column('uuid')
  declare order_id: string;

  @Column('uuid')
  declare product_id: string;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  declare product: ProductEntity;

  @Column('real')
  declare quantity: number;

  @Column('text')
  declare name: string;

  @Column('real')
  declare price: number;

  @ManyToOne(() => OrderEntity, (order) => order.items)
  @JoinColumn({ name: 'order_id' })
  declare order: OrderEntity;
}
