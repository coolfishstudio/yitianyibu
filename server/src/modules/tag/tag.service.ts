import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { InjectModel } from '../../transform/model.transform';

import { TypeMongooseModel } from '../../interfaces/mongoose.interface';
import { Tag } from './tag.model';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag) private readonly tagModel: TypeMongooseModel<Tag>,
  ) {}

  create(newTag: Tag): Promise<Tag> {
    return this.tagModel
      .find({ name: newTag.name })
      .exec()
      .then(existedTags => {
        return existedTags.length
          ? Promise.reject('标签名称已被占用')
          : new this.tagModel(newTag)
            .save()
            .then(tag => {
              return tag;
            });
      });
  }

  update(tagId: Types.ObjectId, newTag: Tag): Promise<Tag> {
    return this.tagModel
      .find({ name: newTag.name })
      .exec()
      .then(existedTag => {
        return existedTag && String(existedTag._id) !== String(tagId)
          ? Promise.reject('标签不存在')
          : this.tagModel
            .findByIdAndUpdate(tagId, newTag, { new: true })
            .exec()
            .then(tag => {
              return tag;
            });
      })
  }

  delete(tagId: Types.ObjectId): Promise<Tag> {
    return this.tagModel
      .findById(tagId)
      .exec()
      .then(existedTag => {
        return existedTag && String(existedTag._id) !== String(tagId)
          ? Promise.reject('标签不存在')
          : this.tagModel
            .findByIdAndUpdate(tagId, { removed: true }, { new: true })
            .exec()
            .then(tag => {
              return tag;
            });
      })
  }

  getByName(name: string): Promise<Tag> {
    return this.tagModel.findOne({ name }).exec();
  }

  findAll(querys): Promise<Tag> {
    return this.tagModel
      .find(querys)
      .exec()
  }
}
