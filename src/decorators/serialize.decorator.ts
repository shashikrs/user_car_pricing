import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { TDtos } from '../types/types';

export function Serialize(dto: TDtos) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
