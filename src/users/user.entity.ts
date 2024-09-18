import { 
  AfterInsert, 
  AfterRemove, 
  AfterUpdate, 
  Entity, 
  Column, 
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';
import { Report } from 'src/reports/report.entity';
// import { Exclude } from 'class-transformer';

// model that defines the structure and functionality + relation with other entities
@Entity() // -> at startup reaches in the db and looks for a User table/creates it
export class User {
  @PrimaryGeneratedColumn() // -> adds new column to the table (primary key)
  id: number;

  @Column()
  email: string;

  @Column()
  // @Exclude() // -> when you take an instance of a user, turn it into object and then json, exclude the password prop
  password: string;

  @OneToMany( // OneToMany does not change the user table, but allows for a foreign key in the Report table
    () => Report, // () => solution for circular dependency with Report entity, one is executed before the other
    (report) => report.user // takes an instance of the entity Report, and tells how to get back to User from there
  )
  reports: Report[];

  @AfterInsert() // -> example of hook
  logInsert() {
    console.log('Inserted User with id: ' + this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id: ' + this.id);
  }
}