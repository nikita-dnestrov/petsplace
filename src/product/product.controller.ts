import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { toObjectId } from 'src/helper/objectIdmapper';
import { CreateProductDto, ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@UseGuards(AuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/')
  createProduct(@Body() body: CreateProductDto, @Req() req) {
    try {
      return this.productService.createProduct({
        ...body,
        owner: toObjectId(req.user._id),
        category: toObjectId(body.category),
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Put('/:id/photo')
  @UseInterceptors(FileInterceptor('file'))
  updatePhoto(@UploadedFile() file, @Param('id') id) {
    try {
      return this.productService.updateProductPhoto(id, file);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Get('/')
  getAll() {
    try {
      return this.productService.getProducts();
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    try {
      return this.productService.getProductById(id);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Put('/:id')
  updateById(@Param('id') id: string, @Body() body: Partial<ProductDto>) {
    try {
      return this.productService.updateProductById(id, body);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Delete('/:id/soft')
  softDeleteById(@Param('id') id: string) {
    try {
      return this.productService.softDeleteProductById(id);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Delete('/:id/hard')
  hardDeleteById(@Param('id') id: string) {
    try {
      return this.productService.hardDeleteProductById(id);
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
