import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReportsCreateRequestDto } from './dtos/reports-create-request.dto';
import { ReportsResponseDto } from './dtos/reports-response.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { Serialize } from '../decorators/serialize.decorator';
import { Report } from './entities/report.entity';
import { ReportsUpdateRequestDto } from './dtos/reports-update-request.dto';
import { ReportsApproveDto } from './dtos/reports-approve-request.dto';
import { AdminGuard } from '../guards/admin.guard';
import { ReportsGetEstimateDto } from './dtos/reports-get-estimate-request.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportsResponseDto)
  async create(
    @Body() createReport: ReportsCreateRequestDto,
    @CurrentUser() user: User,
  ): Promise<Report> {
    return await this.reportsService.create(createReport, user);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @Serialize(ReportsResponseDto)
  async update(
    @Param('id') id: number,
    @Body() updateReq: ReportsUpdateRequestDto,
    @CurrentUser() user: User,
  ): Promise<Report> {
    return await this.reportsService.update(+id, updateReq, user);
  }

  @Patch('/:id/approve')
  @UseGuards(AuthGuard, AdminGuard)
  @Serialize(ReportsResponseDto)
  async approve(
    @Param('id') id: number,
    @Body() approveReq: ReportsApproveDto,
  ): Promise<Report> {
    return await this.reportsService.approve(id, approveReq);
  }

  @Get('/estimate')
  @UseGuards(AuthGuard)
  @Serialize(ReportsResponseDto)
  async getEstimate(@Query() query: ReportsGetEstimateDto): Promise<Report[]> {
    return await this.reportsService.createEstimate(query);
  }
}
