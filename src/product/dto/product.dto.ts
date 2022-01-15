import { Types } from 'mongoose';
import { EProductStatus } from 'src/schemas/product.schema';

export class ProductDto {
  title: string;
  seller: Types.ObjectId;
  category: Types.ObjectId;
  price: number;
  status?: EProductStatus;
  _id?: Types.ObjectId;
}

export class CreateProductDto {
  title: string;
  category: string;
  price: number;
}
