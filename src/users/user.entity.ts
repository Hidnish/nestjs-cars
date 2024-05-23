import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// model that defines the structure and functionality + relation with other entities
@Entity() // -> at startup reaches in the db and looks for a User table/creates it
export class User {
  @PrimaryGeneratedColumn() // -> adds new column to the table (primary key)
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}