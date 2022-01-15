import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { CategoryDto, CreateCategoryDto } from './category.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly productService: CategoryService) {}

  @Post('/')
  createCategory(@Body() body: CreateCategoryDto, @Req() req) {
    try {
      return this.productService.createCategory({
        ...body,
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Get('/')
  getAll() {
    try {
      return this.productService.getCategories();
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    try {
      return this.productService.getCategoryById(id);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Put('/:id')
  updateById(@Param('id') id: string, @Body() body: Partial<CategoryDto>) {
    try {
      return this.productService.updateCategoryById(id, body);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Delete('/:id/soft')
  softDeleteById(@Param('id') id: string) {
    try {
      return this.productService.softDeleteCategoryById(id);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Delete('/:id/hard')
  hardDeleteById(@Param('id') id: string) {
    try {
      return this.productService.hardDeleteCategoryById(id);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Delete('/')
  deleteById() {
    try {
      return this.productService.clearDeleted();
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
