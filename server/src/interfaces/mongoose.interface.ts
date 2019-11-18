/**
 * Mongoose 和 Paginate 模型的兼容
 */

import { ModelType } from 'typegoose';
import { PaginateModel, Document } from 'mongoose';

export type TypeMongooseModel<T> = ModelType<T> & PaginateModel<T & Document>;
