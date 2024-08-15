import { PartialType } from '@nestjs/swagger';
import { ReportsCreateRequestDto } from './reports-create-request.dto';

export class ReportsUpdateRequestDto extends PartialType(
  ReportsCreateRequestDto,
) {}
