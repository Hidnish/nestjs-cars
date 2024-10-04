import { User } from '../users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

@Entity() // Remember -> the entity automatically generates a repository for us
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  approved: boolean;  

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @Column() 
  mileage: number;

  @ManyToOne( // ManyToOne adds a foreign key column in the report table
    () => User, // () => ciruclar dependency solution
    (user) => user.reports
  )
  user: User;
}