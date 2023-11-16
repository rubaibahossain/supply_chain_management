import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity("product")
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;


  @Column()
  price: string;

  @OneToMany(() => ProductEntity, product => product.customer, { cascade: true })
     products: ProductEntity[];
  customer: any;
     
}
