import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("customer")
export class CustomerEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ name: "name", type: "character varying", })
    name: string;
    @Column()
    password: string;
   
    @Column()
    address: string;
    @Column()
    filename: string;

    @ManyToOne(() => CustomerEntity, customer => customer.products)
    customer: CustomerEntity;
    products: any;

   
    

}