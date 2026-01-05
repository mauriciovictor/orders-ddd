import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { OrderItemEntity } from './order-item.entity.js';

@Entity('products')
export class ProductEntity {
  @PrimaryColumn('uuid')
  declare id: string;

  @Column('text')
  declare name: string;

  @Column('real')
  declare price: number;
}
