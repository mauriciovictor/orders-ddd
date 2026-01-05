import { Typeorm } from './Infra/DB/typeorm/index.js';

const dataSource = await Typeorm.connect();
