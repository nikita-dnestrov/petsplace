import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';

const MONGO_URL = process.env.MONGO_URL;
// 'mongodb+srv://nikitadnestrov:10102000nik@cluster0.nh3xp.mongodb.net/petsplace';

console.log(MONGO_URL);

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL),
    AuthModule,
    UserModule,
    ProductModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
