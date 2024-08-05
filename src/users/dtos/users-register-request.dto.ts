import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UsersRegisterRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
