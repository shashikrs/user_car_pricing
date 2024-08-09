import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;
  let users: User[] = [];

  beforeEach(async () => {
    fakeUsersService = {
      find: () => Promise.resolve(users),
      findOne: (id) => {
        const user: User = users.find((user) => user.id === id);
        return Promise.resolve(user);
      },
      create: ({ email, password }) => {
        const user = { id: Math.random() * 9999, email, password } as User;
        users.push(user);
        return Promise.resolve(user);
      },
      remove: async (id) => {
        const user = await fakeUsersService.findOne(id);
        console.log(user);
        if (user) {
          users = users.filter((user) => user.id !== id);
          return Promise.resolve(user);
        } else {
          return Promise.reject(null);
        }
      },
    };

    fakeAuthService = {
      register: ({ email, password }) => {
        const user = { id: 1, email, password } as User;
        users.push(user);
        return Promise.resolve(user);
      },
      login: ({ email, password }) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: AuthService, useValue: fakeAuthService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('register a user', async () => {
    const user = await controller.register(
      { email: 'test@test.com', password: 'test' },
      {},
    );
    expect(user).toBeDefined;
  });

  it('throw error when user id not found', async () => {
    fakeUsersService.findOne = (id) => Promise.reject(new NotFoundException());
    await expect(controller.findOne(123)).rejects.toThrow(NotFoundException);
  });

  it('find one user by id : returns a user by id', async () => {
    const user = await controller.findOne(1);
    expect(user).toBeDefined;
  });

  it('find all users : returns a list of users', async () => {
    const users = await controller.find();
    expect(users.length).toBeDefined;
  });

  it('can login a user which returns a user and also sets the session object', async () => {
    const session = { userId: null };
    const user = await controller.login(
      { email: 'test@test.com', password: 'test' },
      session,
    );

    expect(user).toBeDefined;
    expect(session.userId).toBeDefined;
  });

  it('can remove an existing user by id', async () => {
    const user = await controller.findOne(1);
    expect(user).toBeDefined;
    const removedUser = await controller.remove(1);
    expect(removedUser).toBeDefined;
  });

  it('cannot remove an existing user by id', async () => {
    fakeUsersService.findOne = (id) => Promise.reject(new NotFoundException());
    await expect(controller.findOne(123)).rejects.toThrow(NotFoundException);
  });
});
