import { PrimaryGeneratedColumn, Entity, Column } from "typeorm";

@Entity()
export class BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    createdAt!: Date;

    @Column({ nullable: true })
    createdBy!: string;

    @Column({ nullable: true })
    updatedAt!: Date;
    
    @Column({ nullable: true })
    updatedBy!: string;

}