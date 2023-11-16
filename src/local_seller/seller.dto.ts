import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class ProductDto{

@IsNotEmpty({message:'Enter a valid name'})
name: string;

  @IsNumber()
  id: number;

  @IsNotEmpty()
  price: string;

  

}

export class CustomerDto {
    @IsString({ message: "invalid name" })
    @Matches(/^[a-zA-Z]+$/, { message: "enter a proper name" })
    name: string;

    @IsEmail({}, { message: "invalid email" })
    email: string;

    @IsNotEmpty()
    password: string;
    phone: number;
    address: string;
    filenames: string;
    
    @IsNumber()
    id: number;
}
