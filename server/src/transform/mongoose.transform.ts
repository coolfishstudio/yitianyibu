import * as _mongoose from 'mongoose';
import * as _mongooseAutoIncrement from 'mongoose-auto-increment';
import * as _mongoosePaginate from 'mongoose-paginate';
import * as APP_CONFIG from '../app.config';

_mongoose.set('useFindAndModify', false);
(_mongoose as any).Promise = global.Promise;

_mongooseAutoIncrement.initialize(_mongoose.connection);

(_mongoosePaginate as any).paginate.options = {
  limit: APP_CONFIG.APP.LIMIT,
};

export const mongoose = _mongoose;
export const mongooseAutoIncrement = _mongooseAutoIncrement;
export const mongoosePaginate = _mongoosePaginate;
export default mongoose;
