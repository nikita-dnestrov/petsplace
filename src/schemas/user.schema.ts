import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ESchemaNames } from '.';

export type UserDoc = User & Document;

export enum EUserStatus {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
  DELETED = 'DELETED',
}

@Schema({ timestamps: true, collection: ESchemaNames.USERS })
export class User {
  @Prop({ required: true, type: String })
  username: string;

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({
    required: false,
    type: String,
    default: EUserStatus.ACTIVE,
    enum: ['ACTIVE', 'BLOCKED', 'DELETED'],
  })
  status: EUserStatus;

  @Prop({
    required: false,
    default: [],
    type: [{ type: Types.ObjectId, ref: ESchemaNames.PRODUCTS }],
  })
  products: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
