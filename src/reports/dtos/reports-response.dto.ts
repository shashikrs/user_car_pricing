import { Expose, Transform } from 'class-transformer';

export class ReportsResponseDto {
  @Expose()
  id: number;

  @Expose()
  approved: boolean;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  mileage: number;

  @Expose()
  price: number;

  @Transform(({ obj }) => {
    if (obj?.user?.id) {
      return obj.user.id;
    }
  })
  @Expose()
  userId: number;
}
