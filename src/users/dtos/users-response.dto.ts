import { Exclude, Expose } from 'class-transformer';

export class UsersResponseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
