import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ESchemaNames } from '.';

export type CategoryDoc = Category & Document;

export enum ECategoryStatus {
  CREATED = 'CREATED',
  DELETED = 'DELETED',
}

@Schema({ timestamps: true, collection: ESchemaNames.CATEGORIES })
export class Category {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({
    required: false,
    type: String,
    default: ECategoryStatus.CREATED,
    enum: ['CREATED', 'DELETED'],
  })
  status: ECategoryStatus;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
