import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersRegisterRequestDto } from './dtos/users-register-request.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UsersUpdateRequestDto } from './dtos/users-update-request.dto';
import { UsersResponseDto } from './dtos/users-response.dto';
import { AuthService } from './auth.service';
import { UsersLoginRequestDto } from './dtos/users-login-request.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../decorators/serialize.decorator';

@Controller('users')
@Serialize(UsersResponseDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('/register')
  async register(
    @Body() userRegisterReq: UsersRegisterRequestDto,
    @Session() session: Record<string, any>,
  ): Promise<User> {
    const user = await this.authService.register(userRegisterReq);
    session.userId = user.id;
    return user;
  }

  @Post('/login')
  async login(
    @Body() UsersLoginReq: UsersLoginRequestDto,
    @Session() session: Record<string, any>,
  ): Promise<User> {
    const user = await this.authService.login(UsersLoginReq);
    session.userId = user.id;
    return user;
  }

  @Post('/logout')
  async logout(@Session() session: Record<string, any>): Promise<void> {
    session.userId = null;
  }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  async whoami(@CurrentUser() user: User) {
    return user;
  }

  @Get()
  @UseGuards(AuthGuard)
  async find(): Promise<User[]> {
    return await this.usersService.find();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.usersService.findOne(+id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: number,
    @Body() userUpdateReq: UsersUpdateRequestDto,
  ) {
    return await this.usersService.update(+id, userUpdateReq);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: number) {
    return this.usersService.remove(+id);
  }
}
