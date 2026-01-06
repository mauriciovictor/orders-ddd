import type { Address } from '../ValueObject/Address';

class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = true;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  validate() {
    if (this._name.length == 0) throw new Error('Customer name cannot be empty');
    if (this._id.length == 0) throw new Error('Customer id cannot be empty');
  }

  isActive() {
    return this._active;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  get id() {
    return this._id;
  }

  activate() {
    if (this._address == undefined) {
      throw new Error('Address cannot be empty');
    }
    this._active = true;
  }

  get name() {
    return this._name;
  }

  deactivate() {
    this._active = false;
  }
  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  get rewardPoints() {
    return this._rewardPoints;
  }

  setAddress(address: Address) {
    this._address = address;
  }

  get address() {
    return this._address;
  }

  changeAddress(address: Address) {
    this._address = address;
  }
}

export { Customer };
