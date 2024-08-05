import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UsersLoginRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
