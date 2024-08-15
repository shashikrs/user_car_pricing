import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { TEntities } from '../types/types';
import { ClassConstructor } from 'src/interfaces/class-constructor.interface';

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}
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
