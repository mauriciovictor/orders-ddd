import { Repository } from 'typeorm';
import { Typeorm } from '../DB/typeorm/index.js';
import { Order } from '../../Domain/Entity/order.js';
import { OrderEntity } from '../DB/typeorm/entities/order.entity.js';
import { OrderRepositoryInterface } from '../../Domain/Repositoory/order-repositoriy.interface.js';
import { OrderItem } from '../../Domain/Entity/order_item.js';

class OrderRepository implements OrderRepositoryInterface {
  private get repository(): Repository<OrderEntity> {
    return Typeorm.manager().getRepository(OrderEntity);
  }

  async update(entity: Order): Promise<void> {
    const orderEntity = this.repository.create({
      id: entity.id,
      customer_id: entity.customer_id,
      total: entity.total(),
      items: entity.items.map((item) => ({
        id: item.id,
        product_id: item.product_id,
        quantity: item.quantity,
        name: item.name,
        price: item.price,
      })),
    });

    await this.repository.save(orderEntity);
  }

  async findById(id: string): Promise<Order | undefined> {
    const orderModel = await this.repository.findOne({
      where: {
        id: id,
      },
      relations: ['items'],
    });

    if (!orderModel) throw new Error('Order not found');

    return orderModel ? this.toEntity(orderModel) : undefined;
  }

  toEntity(orderEntity: OrderEntity): Order {
    const items = orderEntity.items.map(
      (item) => new OrderItem(item.id, item.product_id, item.name, item.price, item.quantity)
    );
    return new Order(orderEntity.id, orderEntity.customer_id, items);
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.repository.find({
      relations: ['items'],
    });
    return orders.map((order) => this.toEntity(order));
  }

  async create(order: Order): Promise<void> {
    const orderEntity = this.repository.create({
      id: order.id,
      customer_id: order.customer_id,
      total: order.total(),
      items: order.items.map((item) => ({
        id: item.id,
        product_id: item.product_id,
        quantity: item.quantity,
        name: item.name,
        price: item.price,
      })),
    });

    await this.repository.save(orderEntity);
  }
}
export { OrderRepository };
