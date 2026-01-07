import { RepositoryInterface } from '../../@shared/repository/repository-interface.js';
import { Product } from '../entiity/product.js';

interface ProductRepository extends RepositoryInterface<Product> {}
