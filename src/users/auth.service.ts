import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRegisterRequestDto } from './dtos/users-register-request.dto';
import { User } from './entities/user.entity';
import { promisify } from 'util';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { UsersLoginRequestDto } from './dtos/users-login-request.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(userReq: UsersRegisterRequestDto): Promise<User> {
    try {
      const user = await this.usersService.findOneByEmail(userReq.email);

      if (user) {
        throw new BadRequestException(
          `User with email ${userReq.email} already exists`,
        );
      }
      userReq.password = await this.hashPassword(userReq.password);
      return await this.usersService.create(userReq);
    } catch (error) {
      throw error;
    }
  }

  async login(userReq: UsersLoginRequestDto): Promise<User> {
    try {
      const user = await this.usersService.findOneByEmail(userReq.email);

      if (!user) {
        throw new BadRequestException(
          `User with email ${userReq.email} not found`,
        );
      }

      const [salt] = user.password.split('.');

      const currentHashedPassword = await this.hashPassword(
        userReq.password,
        salt,
      );

      if (user.password !== currentHashedPassword) {
        throw new BadRequestException('Wrong password');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async hashPassword(
    password: string,
    salt: string = this.generateSalt(),
  ): Promise<string> {
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return salt + '.' + hash.toString('hex');
  }

  generateSalt(): string {
    return randomBytes(8).toString('hex');
  }
}
