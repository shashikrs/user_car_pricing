import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { TDtos } from 'src/types/types';

export function Serialize(dto: TDtos) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
