import { Types } from 'mongoose';
import { Typegoose, prop } from 'typegoose';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';
import { getModelBySchema, getProviderByModel } from '../../transform/model.transform';

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

export class BatchTag extends Typegoose {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  ids: Types.ObjectId[];
}

export const TagModel = getModelBySchema(Tag);
export const TagProvider = getProviderByModel(TagModel);
