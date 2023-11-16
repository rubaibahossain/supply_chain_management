import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Session, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { SellerService } from './seller.service';
import { CustomerDto, ProductDto } from './seller.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { SessionGuard } from './seller.guards';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @UseGuards(SessionGuard)
    @Get('/index')
    getIndex(): any {
        return this.sellerService.getIndex();
    }
    
//Product
  @Get('products')
  getAllProducts() {
    return this.sellerService.getAllProducts();
  }

  @Get('products/:id')
  getProductById(@Param('id') id:number) {
    return this.sellerService.getProductById(id);
  }

  @Get('products/:name')
  getProductByName(@Param('name') name:string) {
    return this.sellerService.getProductByName(name);
  }

  @Post('products')
  @UsePipes(new ValidationPipe())
  addProduct(@Body() productDto: ProductDto){
    return this.sellerService.addProduct(productDto);
  }

  @Put('products/:id')
  @UsePipes(new(ValidationPipe))
  updateProduct(@Param('id') id:number, @Body() productDto: ProductDto){
    return this.sellerService.updateProduct(id, productDto);
  }

  @Delete('products/:id')
  deleteProduct(@Param('id') id:string){
    return this.sellerService.deleteProduct(id);
  }

  @Get('products/:id/customers')
  getProductsForCustomer(@Param('id') id:number){
    return this.sellerService.getProductsForCustomer(id);
  }


//Customer
  @Get('customers')
  getAllCustomers() {
    return this.sellerService.getAllCustomers();
  }

  @Get('customers/:id')
  getCustomerById(@Param('id') id:number) {
    return this.sellerService.getCustomerById(id);
  }

  @Post('customers')
  @UsePipes(new ValidationPipe())
  addCustomer(@Body() customerDto: CustomerDto){
    return this.sellerService.addCustomer(customerDto);
  }

  @Post(('/upload'))
    @UseInterceptors(FileInterceptor('myfile',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 30000 },
            storage: diskStorage({
                destination: './uploads',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }
    ))
    uploadFile(@UploadedFile() myfileobj: Express.Multer.File): object {
        console.log(myfileobj)
        return ({ message: "file uploaded" });
    }

  @Put('customers/:id')
  updateCustomer(@Param('id') id:number, @Body() customerDto: CustomerDto){
    return this.sellerService.updateCustomer(id, customerDto);
  }

  @Delete('customers/:id')
  deleteCustomer(@Param('id') id:string){
    return this.sellerService.deleteCustomer(id);
  }

  @Get('customer/:id/products')
  getCustomersForProduct(@Param('id') id:number){
    return this.sellerService.getCustomersForProduct(id);
  }
  @Post('login')
  async login(@Body() customerDto:CustomerDto, 
  @Session() session)
  {
   if(await this.sellerService.login(customerDto))
   {
    session.email=customerDto.name;
    return true;
   }
   else
   {
    throw new HttpException('UnauthorizedException', 
    HttpStatus.UNAUTHORIZED); 
  
   }
  }



}
