class OrderItem {
  _id: string;
  _name: string;
  _product_id: string;
  _price: number;
  _quantity: number = 1;

  constructor(id: string, product_id: string, name: string, price: number, quantity: number) {
    this._id = id;
    this._name = name;
    this._product_id = product_id;
    this._price = price;
    this._quantity = quantity;
  }

  get price(): number {
    return this._price;
  }

  get id(): string {
    return this._id;
  }

  get quantity(): number {
    return this._quantity;
  }

  get product_id(): string {
    return this._product_id;
  }

  get name(): string {
    return this._name;
  }

  orderItemTotal(): number {
    return this._price * this._quantity;
  }
}

export { OrderItem };
