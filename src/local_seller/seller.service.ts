import { Injectable } from '@nestjs/common';
import { CustomerDto, ProductDto } from './seller.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { Repository } from 'typeorm';
import { CustomerEntity } from './entity/customer.entity';
import *as bcrypt from 'bcrypt';

@Injectable()
export class SellerService {
  
 
    constructor(
        @InjectRepository(ProductEntity)
        private productRepo: Repository<ProductEntity>,
        
        @InjectRepository(CustomerEntity)
        private customerRepo: Repository<CustomerEntity>,
    )
    {}

    async getIndex(): Promise<ProductEntity[]> {
        return this.productRepo.find();
    }
  
    getAllProducts():Promise<ProductEntity[]> {
        return this.productRepo.find();
    }
    async getProductById(id: number): Promise<ProductEntity> {
        return this.productRepo.findOneBy({id:id});
    }
    getProductByName(name: string):Promise<ProductEntity> {
        return this.productRepo.findOneBy({name:name});
      }
    async addProduct(productDto: ProductDto):Promise<ProductEntity> {
        return this.productRepo.save(productDto);
      }
      updateProduct(id: number, productDto:ProductDto):Promise<ProductEntity> {
        const res=  this.productRepo.update(id,productDto);

     return this.productRepo.findOneBy({id});
    }
    deleteProduct(id: string) {
        return this.productRepo.delete(id);
    }


    getAllCustomers():Promise<CustomerEntity[]> {
        return this.customerRepo.find();
    }
    getCustomerById(id: number): Promise<CustomerEntity> {
        return this.customerRepo.findOneBy({id:id});
    }
    getCustomerByName(name: string) {
        return this.customerRepo.findOneBy({name:name});
      }
    async addCustomer(customerDto: CustomerDto):Promise<CustomerEntity> {
        return this.customerRepo.save(customerDto);
      }
      updateCustomer(id: number, customerDto:CustomerDto):Promise<CustomerEntity> {
        const res=  this.customerRepo.update(id,customerDto);

      return this.customerRepo.findOneBy({id});
    }
    deleteCustomer(id: string) {
        return this.productRepo.delete(id);
    }
    
    
    getCustomersForProduct(id: number) {
       return this.productRepo.find(
        {
            where: {id:id},
            relations: {customer:true}
        }
       )
    }
    getProductsForCustomer(id: number) {
        return this.customerRepo.find(
            {
                where: {id:id},
                relations: {products:true}
            }
           )
    }
    
    async login(customerDto: CustomerDto) {
        const customer= await this.customerRepo.findOneBy({name:customerDto.name});
        const result = await bcrypt.compare(customerDto.password, customer.password);
        if(result)
        {
            return true;
        }
        else{
            return false;
        }
      }
      
}
