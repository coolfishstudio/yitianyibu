import { Types } from 'mongoose';
import { Typegoose, prop, plugin } from 'typegoose';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { getModelBySchema, getProviderByModel } from '../../transform/model.transform';
import { mongooseAutoIncrement } from '../../transform/mongoose.transform';

@plugin(mongooseAutoIncrement.plugin, {
  model: Tag.name,
  field: 'id',
  startAt: 1,
  incrementBy: 1,
})

export class Tag extends Typegoose {
  @IsNotEmpty({ message: '标签名称？' })
  @IsString({ message: '字符串？' })
  @prop({ required: true, validate: /\S+/ })
  name: string;

  @prop({ default: Date.now })
  createdAt: Date;

  @prop({ default: Date.now })
  updatedAt: Date;

  removed?: boolean;
  _id?: Types.ObjectId;
  count?: number;
}


export const TagModel = getModelBySchema(Tag);
export const TagProvider = getProviderByModel(TagModel);
