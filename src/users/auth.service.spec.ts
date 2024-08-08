import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;
  const users: User[] = [];

  beforeEach(async () => {
    fakeUsersService = {
      find: () => Promise.resolve(users),
      findOneByEmail: (email) => {
        const user: User = users.find((user) => user.email === email);
        return Promise.resolve(user);
      },
      create: ({ email, password }) => {
        const user = { id: Math.random() * 9999, email, password } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('can register a new user', async () => {
    const user = await service.register({
      email: 'test@test.com',
      password: 'test',
    });

    expect(user.password).not.toEqual('test');

    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error user registers with an email already in use', async () => {
    await expect(
      service.register({
        email: 'test@test.com',
        password: 'test',
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('can log in', async () => {
    const user = await service.login({
      email: 'test@test.com',
      password: 'test',
    });

    expect(user.password).not.toEqual('test');

    const [salt, hash] = user.password.split('.');

    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if login is called with unused email', async () => {
    await expect(
      service.login({
        email: 'asd@test.com',
        password: 'test',
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('throws an error if logged in using invalid password', async () => {
    await expect(
      service.login({
        email: 'test@test.com',
        password: '1234',
      }),
    ).rejects.toThrow(BadRequestException);
  });
});
