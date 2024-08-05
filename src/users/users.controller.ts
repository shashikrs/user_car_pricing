import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersRegisterRequestDto } from './dtos/users-register-request.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UsersUpdateRequestDto } from './dtos/users-update-request.dto';
import { UsersResponseDto } from './dtos/users-response.dto';
import { Serialize } from 'src/decorators/serialize.decorator';

@Controller('users')
@Serialize(UsersResponseDto)
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/register')
  async register(
    @Body() userRegisterReq: UsersRegisterRequestDto,
  ): Promise<User> {
    return await this.usersService.register(userRegisterReq);
  }

  @Post('/create')
  async create(@Body() userCreateReq: UsersRegisterRequestDto): Promise<User> {
    return await this.usersService.create(userCreateReq);
  }

  @Get()
  async find(): Promise<User[]> {
    return await this.usersService.find();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.usersService.findOne(+id);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: number,
    @Body() userUpdateReq: UsersUpdateRequestDto,
  ) {
    return await this.usersService.update(+id, userUpdateReq);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number) {
    return this.usersService.remove(+id);
  }
}
