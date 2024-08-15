import { IsBoolean } from 'class-validator';

export class ReportsApproveDto {
  @IsBoolean()
  approved: boolean;
}
