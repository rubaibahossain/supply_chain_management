import { Module } from '@nestjs/common';

import { SellerModule } from './local_seller/seller.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [SellerModule, TypeOrmModule.forRoot(
    { type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'Local_Seller',
    autoLoadEntities: true,
    synchronize: true,
    } )],
  controllers: [],
  providers: [],
})
export class AppModule {}
