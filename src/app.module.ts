import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/petsplace'),
    AuthModule,
    UserModule,
    ProductModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
