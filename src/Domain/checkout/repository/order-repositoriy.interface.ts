import { Order } from '../entity/order.js';
import { RepositoryInterface } from '../../@shared/repository/repository-interface.js';

export interface OrderRepositoryInterface extends RepositoryInterface<Order> {}
