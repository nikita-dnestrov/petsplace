import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { aggregationPopulate } from 'src/helper/aggregationPopulate';
import { ESchemaNames } from 'src/schemas';
import { EProductStatus, Product } from 'src/schemas/product.schema';
import { User } from 'src/schemas/user.schema';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private product: Model<Product>,
    @InjectModel(User.name) private user: Model<User>
  ) {}

  async createProduct(data: ProductDto) {
    const savedProduct = await new this.product(data).save();
    await this.user.findByIdAndUpdate(data.seller, {
      $push: { products: savedProduct._id },
    });
    return await this.product.findById(savedProduct._id);
  }

  async getProducts() {
    return this.product.aggregate(
      aggregationPopulate([
        {
          from: ESchemaNames.CATEGORIES,
          foreignField: '_id',
          localField: 'category',
          as: 'category',
        },
        {
          from: ESchemaNames.USERS,
          foreignField: '_id',
          localField: 'seller',
          as: 'seller',
        },
      ])
    );
  }

  async getProductById(id) {
    return await this.product.findById(id);
  }

  async updateProductById(id, data) {
    return await this.product.findByIdAndUpdate(id, data);
  }

  async softDeleteProductById(id) {
    const found = await this.product.findById(id);

    await this.user.findByIdAndUpdate(found.seller, {
      $pull: { products: found._id },
    });

    return await this.product.findByIdAndUpdate(id, { status: EProductStatus.DELETED });
  }

  async hardDeleteProductById(id) {
    return await this.product.findByIdAndDelete(id);
  }

  async clearDeleted() {
    return await this.product.deleteMany({ status: EProductStatus.DELETED });
  }
}
