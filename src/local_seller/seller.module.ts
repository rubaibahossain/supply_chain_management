import { Module } from '@nestjs/common';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { CustomerEntity } from './entity/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, CustomerEntity])],
  controllers: [SellerController],
  providers: [SellerService],
})
export class SellerModule {}
