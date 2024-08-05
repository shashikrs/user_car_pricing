import { UsersResponseDto } from 'src/users/dtos/users-response.dto';
import { User } from 'src/users/entities/user.entity';

export type TDtos = typeof UsersResponseDto;

export type TEntities = typeof User | typeof Report;
