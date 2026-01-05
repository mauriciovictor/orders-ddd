import { OrderItem } from './order_item.js';

class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;

    this.validate();
  }

  validate(): boolean {
    if (this._id.length == 0) {
      throw new Error('Order id cannot be empty');
    }

    if (this._customerId.length == 0) {
      throw new Error('Customer id cannot be empty');
    }

    if (this._items.length == 0) {
      throw new Error('Order items cannot be empty');
    }

    if (this._items.some((item) => item._quantity <= 0))
      throw new Error('Order items quantity must be greater than zero');

    return true;
  }

  get customer_id() {
    return this._customerId;
  }

  get id() {
    return this._id;
  }

  addItem(item: OrderItem) {
    this._items.push(item);
  }

  get items() {
    return this._items;
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
  }
}

export { Order };
