import { UsersResponseDto } from '../users/dtos/users-response.dto';
import { User } from '../users/entities/user.entity';

export type TDtos = typeof UsersResponseDto;

export type TEntities = typeof User | typeof Report;
