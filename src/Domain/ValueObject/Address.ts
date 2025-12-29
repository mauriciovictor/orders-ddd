class Address {
    _street: string;
    _number: string;
    _city: string;
    _zip: string;

    constructor(street: string, number: string,  zip: string, city: string) {
        this._street = street;
        this._city = city;
        this._zip = zip;
        this._number = number;

        this.validate();
    }

    validate() {
        if(this._street.length == 0) {
            throw new Error('Street cannot be empty')
        }

        if(this._city.length == 0) {
            throw new Error('City cannot be empty')
        }
    }

    toString() {
        return `${this._street}, ${this._number}, ${this._zip} ${this._city}`
    }
}


// @ts-ignore
export {Address}