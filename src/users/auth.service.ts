import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

// original scrypt requires the use of callbacks
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
  // 1. See if email is in use
    const users = await this.userService.find(email);

    if (users.length) {
      throw new BadRequestException('Email in use');
    }

  // 2. Hash the users password
    // 2.1 generate salt
    const salt = randomBytes(8).toString('hex'); // turn a buffer to a hexidecimal string, every byte is converted to 2 characters

    // 2.2 Hash the salt and password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // 2.3 join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

  // 3. Create new user and save it
    const user = await this.userService.create(email, result);
    
  // 4. return the user
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Incorrect password');
    }

    return user;
  }
}
