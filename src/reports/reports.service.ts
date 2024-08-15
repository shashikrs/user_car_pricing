import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReportsCreateRequestDto } from './dtos/reports-create-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { User } from 'src/users/entities/user.entity';
import { ReportsUpdateRequestDto } from './dtos/reports-update-request.dto';
import { ReportsApproveDto } from './dtos/reports-approve-request.dto';
import { ReportsRelation } from './enums/reports.enum';
import { ReportsGetEstimateDto } from './dtos/reports-get-estimate-request.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportsRepository: Repository<Report>,
  ) {}

  async create(
    createReq: ReportsCreateRequestDto,
    user: User,
  ): Promise<Report> {
    try {
      const report = await this.reportsRepository.create(createReq);
      report.user = user;
      return this.reportsRepository.save(report);
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateReq: ReportsUpdateRequestDto,
    user: User,
  ): Promise<Report> {
    try {
      const report = await this.findOne(id);
      Object.assign(report, updateReq);
      return await this.reportsRepository.save(report);
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number, include: ReportsRelation[] = []): Promise<Report> {
    try {
      if (!id) {
        throw new BadRequestException(`Id not provided`);
      }

      if (!include.includes(ReportsRelation.user)) {
        include.push(ReportsRelation.user);
      }

      const findOneOptions: FindOneOptions<Report> = {
        where: { id },
        relations: include,
      };
      const report = await this.reportsRepository.findOne(findOneOptions);

      if (!report) {
        throw new NotFoundException(`Report with id: ${id} not found`);
      }

      return report;
    } catch (error) {
      throw error;
    }
  }

  async approve(id: number, approveReq: ReportsApproveDto): Promise<Report> {
    try {
      const report = await this.findOne(id);
      report.approved = approveReq.approved;
      return await this.reportsRepository.save(report);
    } catch (error) {
      throw error;
    }
  }

  async createEstimate(estimateDto: ReportsGetEstimateDto): Promise<Report[]> {
    const { make, model, lng, lat, year, mileage } = estimateDto;
    return this.reportsRepository
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lng - :lng BETWEEN -5 and 5', { lng })
      .andWhere('year - :year BETWEEN -3 and 3', { year })
      .andWhere('approved is TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }
}
