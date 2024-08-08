import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersRegisterRequestDto } from './dtos/users-register-request.dto';
import { UsersCreateRequestDto } from './dtos/users-create-request.dto';
import { UsersUpdateRequestDto } from './dtos/users-update-request.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userReq: UsersCreateRequestDto): Promise<User> {
    try {
      const user = this.userRepository.create(userReq);
      return await this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, userUpdateReq: UsersUpdateRequestDto) {
    try {
      const user = await this.findOne(id);
      Object.assign(user, userUpdateReq);
      return this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async find(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    try {
      if (!id) return null;
      const options: FindOneOptions<User> = { where: { id } };
      const user = await this.userRepository.findOne(options);

      if (!user) {
        throw new NotFoundException(`User with id: ${id} not found`);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      const options: FindOneOptions<User> = { where: { email } };
      const user = await this.userRepository.findOne(options);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<User> {
    try {
      const user = await this.findOne(id);
      console.log(user);
      return this.userRepository.remove(user);
    } catch (error) {
      throw error;
    }
  }

  async login() {}
}
