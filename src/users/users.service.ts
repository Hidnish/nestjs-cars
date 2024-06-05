import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

/*
  BREAKDOWN:
  1. private: abberviates property definition and assignment
  2. Repository<User>: implies that 'repo' is an instance of a TypeORM repository that deals with instances of Users
  3. @InjectRepository(User): helps DI system by informing that we need the User repository (DI cannot recognize generic types on its own)
*/
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password }); // create() does not persist/save data in the DB, it only creates an ENTITY. Needed in case ENTITY class contains hooks/validation.

    return this.repo.save(user); // save() takes ENTITY and saves it in the DB. You could skip create() and use save({ email, password }) directly, but skips trigger hooks/validation.
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id }); // returns one record, if no records returns null
  }

  find(email: string) {
    return this.repo.find({ where: { email } }); // returns an array, if no records returns []
  }

  async update(id: number, attrs: Partial<User>) { // Partial: type with at least some of the properties contained in the generic
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);

    return this.repo.save(user); // -> could use update() -> PRO: allow to avoid findOne(), CONS: skip any hook execution
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found')
    };
    return this.repo.remove(user) // -> could use delete() -> PRO: allow to avoid findOne(), CONS: skip any hook execution
  }
}
