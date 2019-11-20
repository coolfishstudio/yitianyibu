/**
 * 系统公告
 */

import { Types } from 'mongoose';
import { Typegoose } from 'typegoose';
import { getModelBySchema, getProviderByModel } from '../../transform/model.transform';

export class Announcement extends Typegoose {
  content: string;
  type: string;
  url?: string;
  state: string;
  createAt: Date;
  updateAt: Date;
}

export const AnnouncementModel = getModelBySchema(Announcement);
export const AnnouncementProvider = getProviderByModel(AnnouncementModel);
