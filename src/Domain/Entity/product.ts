class Product {
  _id: string;
  _name: string;
  _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;

    this.validate();
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error('Product id cannot be empty');
    }

    if (this._name.length === 0) {
      throw new Error('Product name cannot be empty');
    }

    if (this._price <= 0) throw new Error('Product price must be greater than zero');

    return true;
  }

  get id() {
    return this._id;
  }

  changeName(name: string) {
    this._name = name;
  }

  changePrice(price: number) {
    this._price = price;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }
}

export { Product };
