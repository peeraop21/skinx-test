import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './_base.entity';

@Entity()
export class Post extends BaseEntity {

    @Column()
    title!: string;

    @Column({ nullable: true })
    content!: string;

    // @Column('simple-array',{ nullable: true})
    @Column('text', { array: true })
    tags!: string[]
}