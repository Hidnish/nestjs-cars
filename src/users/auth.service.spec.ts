import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // Create a fake copy of the users service
    const users: User[] = [];

    fakeUsersService = { // simulate basic logic for testing
      find: (email: string) => {
        const filteredUsers = users.filter(user => user.email === email);
        return Promise.resolve(filteredUsers); // still supposed to return a promise
      },
      create: (email: string, password: string) => {
        const user = { 
          id: Math.floor(Math.random() * 999999), 
          email, 
          password 
        } as User;
        users.push(user);
        return Promise.resolve(user);
      }
    }

    // fakeUsersService = { // Create a fake copy of the users service
    //   find: () => Promise.resolve([]), // instead of calling the userService.find from authService.signup
    //   create: (email: string, password: string) => // instead of calling userService.create from authService.signin
    //     Promise.resolve({ id: 1, email, password } as User)
    // }

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService, // if anyone asks for the UserService...
          useValue: fakeUsersService // provide them with fakeUsersService instead
        }
      ]
    }).compile();

    service = module.get(AuthService); // DI will create an instance of AuthService with all its dependencies initialized
  })

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  })

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('test@tesing.com', 'asdf');

    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  })

  it('throws an error is user signs up with an email that is already in use', async () => {
    // fakeUsersService.find = () => 
    //   Promise.resolve([{ id: 1, email: 'email@test.com', password: '1' } as User]) // tweak .find() method so that it returns a user record (otherwise test would not work)
    await service.signup('test@testing.com', 'asdf');

    await expect(
      service.signup('test@testing.com', 'asdf')
    )
      .rejects
      .toThrow(BadRequestException);
  })

  it('throws if signin is called with an unused email', async () => {

    await expect(service.signin('test@tesing.com', 'asdf'))
      .rejects
      .toThrow(NotFoundException);
  })

  it('throws if an invalid password is provided', async () => {
    // fakeUsersService.find = () => 
    //     Promise.resolve([{ email: 'asdf@asdf.com', password: 'asdf' } as User])
    await service.signup('asdf@asdf.com', 'wrongpassword');

    await expect(service.signin('asdf@asdf.com', 'ieodjwn949320vf0'))
      .rejects
      .toThrow(BadRequestException);
  })

  it('returns a user if correct password is provided', async () => {
    await service.signup('asdf@asdf.com', 'mypassword');
    const user = await service.signin('asdf@asdf.com', 'mypassword');
    expect(user).toBeDefined();
  })
})