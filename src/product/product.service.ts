import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { aggregationPopulate } from 'src/helper/aggregationPopulate';
import { ESchemaNames } from 'src/schemas';
import { EProductStatus, Product } from 'src/schemas/product.schema';
import { User } from 'src/schemas/user.schema';
import { ProductDto } from './dto/product.dto';
const ImageKit = require('imagekit');

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private product: Model<Product>,
    @InjectModel(User.name) private user: Model<User>
  ) {}

  async createProduct(data: ProductDto) {
    const savedProduct = await new this.product(data).save();
    await this.user.findByIdAndUpdate(data.owner, {
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
          localField: 'owner',
          as: 'owner',
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

  async updateProductPhoto(id: string, file: any) {
    const kit = new ImageKit({
      publicKey: 'public_wUjnhpIQcdnCoNN7ZWSAspmkGvA=',
      privateKey: 'private_R8ORWzyNCjDBJuie3N1fr05XFsQ=',
      urlEndpoint: 'https://ik.imagekit.io/et5tweaufke',
    });

    const response = await kit.upload({
      file: file.buffer.toString('base64'),
      fileName: `product_${id}.jpg`,
    });

    return await this.product.findByIdAndUpdate(id, { photo: response.url }, { new: true });
  }

  async softDeleteProductById(id) {
    const found = await this.product.findById(id);

    await this.user.findByIdAndUpdate(found.owner, {
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
