import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, ECategoryStatus } from 'src/schemas/category.schema';
import { CreateCategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private category: Model<Category>) {}

  async createCategory(data: CreateCategoryDto) {
    const savedCategory = await new this.category(data).save();
    return await this.category.findById(savedCategory._id);
  }

  async getCategories() {
    return await this.category.find({});
  }

  async getCategoryById(id) {
    return await this.category.findById(id);
  }

  async updateCategoryById(id, data) {
    return await this.category.findByIdAndUpdate(id, data);
  }

  async softDeleteCategoryById(id) {
    return await this.category.findByIdAndUpdate(id, { status: ECategoryStatus.DELETED });
  }

  async hardDeleteCategoryById(id) {
    return await this.category.findByIdAndDelete(id);
  }

  async clearDeleted() {
    return await this.category.deleteMany({ status: ECategoryStatus.DELETED });
  }
}
