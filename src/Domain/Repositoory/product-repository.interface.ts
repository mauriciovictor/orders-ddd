import { RepositoryInterface } from './repository-interface';
import { Product } from '../Entity/product';

interface ProductRepository extends RepositoryInterface<Product> {}
