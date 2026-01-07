import { Order } from '../entity/order.js';
import { OrderItem } from '../entity/order_item.js';

interface OrderPropsInterface {
  id: string;
  customer_id: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    product_id: string;
  }[];
}

class OrderFactory {
  static create(orderProps: OrderPropsInterface): Order {
    const items: OrderItem[] = orderProps.items.map(
      (item) => new OrderItem(item.id, item.product_id, item.name, item.price, item.quantity)
    );
    return new Order(orderProps.id, orderProps.customer_id, items);
  }
}

export { OrderFactory };
