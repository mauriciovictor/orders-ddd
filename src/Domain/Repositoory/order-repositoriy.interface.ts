import { Order } from '../Entity/order.js';
import { RepositoryInterface } from './repository-interface.js';

export interface OrderRepositoryInterface extends RepositoryInterface<Order> {}
