import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { TDtos, TEntities } from 'src/types/types';
import { UsersResponseDto } from 'src/users/dtos/users-response.dto';

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: TDtos) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: TEntities) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
