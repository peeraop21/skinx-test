import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './_base.entity';

@Entity()
export class User extends BaseEntity {

  @Column()
  username!: string;

  @Column()
  password!: string

  @Column('simple-array', { nullable: true })
  roles!: string[];

}