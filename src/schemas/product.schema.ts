import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ESchemaNames } from '.';

export type ProductDoc = Product & Document;

export enum EProductStatus {
  CREATED = 'CREATED',
  DELETED = 'DELETED',
}

@Schema({ timestamps: true, collection: ESchemaNames.PRODUCTS })
export class Product {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: Types.ObjectId, ref: ESchemaNames.CATEGORIES })
  category: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: ESchemaNames.USERS })
  owner: Types.ObjectId;

  @Prop({ required: true, type: [{ type: Types.ObjectId, ref: ESchemaNames.USERS }] })
  ownerHistory: Types.ObjectId[];

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: false, type: String })
  photo: string;

  @Prop({
    required: false,
    type: String,
    default: EProductStatus.CREATED,
    enum: ['CREATED', 'DELETED'],
  })
  status: EProductStatus;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
