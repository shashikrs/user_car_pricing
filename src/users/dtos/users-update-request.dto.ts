import { PartialType } from '@nestjs/swagger';
import { UsersCreateRequestDto } from './users-create-request.dto';

export class UsersUpdateRequestDto extends PartialType(UsersCreateRequestDto) {}
