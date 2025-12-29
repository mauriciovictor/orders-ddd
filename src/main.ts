import {Customer} from "./entity/customer";
import {Address} from "./ValueObject/Address";
import {Order} from "./entity/order";
import {OrderItem} from "./entity/order_item";

let customer = new Customer('123', 'Mauricio Ferreira');
let address = new Address('Teste', '12', 'teste', 'teste')
customer.setAddress(address);
customer.activate()

let item1 = new OrderItem('123', 'product 1', 10);
let item2 = new OrderItem('1234', 'product 2', 10);
const order = new Order('123', '123', [item1, item2])