import { Typeorm } from './Infra/db/typeorm/index.js';

const dataSource = await Typeorm.connect();
