import { Expose, Transform } from 'class-transformer';
import { User } from '../../users/user.entity';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  year: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  make: number;

  @Expose()
  model: string;

  @Expose()
  mileage: string;

  @Expose()
  approved: boolean;

  @Transform(({ obj }) => obj.user.id) // take original Report entity (aka obj) and extract info related to user
  @Expose()
  userId: number;
}
