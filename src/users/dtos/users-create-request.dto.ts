import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UsersCreateRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
