import { describe, expect, it } from 'vitest';
import { Order } from '../entity/order.js';
import { OrderItem } from '../entity/order_item.js';
import { OrderService } from './order.service.js';
import { Customer } from '../../customer/entity/customer.js';

describe('Order Service unit tests', () => {
  it('should place an order', () => {
    const customer = new Customer('123', 'Customer 1');
    const orderItem1 = new OrderItem('1', '123', 'item 1', 150, 2);

    const order = OrderService.placeOrder(customer, [orderItem1]);

    expect(customer.rewardPoints).toBe(150);
    expect(order.total()).toBe(300);
  });

  it('should get total of all orders', () => {
    const orderItem1 = new OrderItem('1', '123', 'item 1', 100, 2);
    const orderItem2 = new OrderItem('2', '1234', 'item 2', 150, 2);
    const orderItem3 = new OrderItem('3', '12345', 'item 3', 100, 2);

    const order1 = new Order('1', '123', [orderItem1, orderItem2, orderItem3]);
    const order2 = new Order('2', '1234', [orderItem3, orderItem2]);
    const order3 = new Order('3', '12345', [orderItem1, orderItem3]);

    const total = OrderService.totalOrders([order1, order2, order3]);

    expect(total).toBe(1600);
  });
});
