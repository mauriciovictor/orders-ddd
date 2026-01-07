import { Order } from '../entity/order.js';
import { Customer } from '../../customer/entity/customer.js';
import { OrderItem } from '../entity/order_item.js';
import { v4 as uuidv4 } from 'uuid';

class OrderService {
  static totalOrders(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0);
  }

  static placeOrder(customer: Customer, orderItems: OrderItem[]): Order {
    const order = new Order(uuidv4(), customer.id, orderItems);
    customer.addRewardPoints(order.total() / 2);
    return order;
  }
}
export { OrderService };
