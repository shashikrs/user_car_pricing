import { ReportsResponseDto } from 'src/reports/dtos/reports-response.dto';
import { UsersResponseDto } from '../users/dtos/users-response.dto';
import { User } from '../users/entities/user.entity';

export type TDtos = typeof UsersResponseDto | typeof ReportsResponseDto;

export type TEntities = typeof User | typeof Report;
