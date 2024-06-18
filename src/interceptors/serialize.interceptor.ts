import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassConstructor<T> {
  new (...args: any[]): T
}

/**
 * Custom decorator to format outgoing responses
 */
export function Serialize<T extends object>(dto: ClassConstructor<T>) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor<T extends object> implements NestInterceptor<T, T> { // implements -> class has to satisfy all the requirements of an abstract class or interface
  constructor(private dto: ClassConstructor<T>) {}

  intercept(context: ExecutionContext, handler: CallHandler<T>): Observable<T> {

    return handler.handle().pipe(
      map((data: T) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true // only expose properties decorated with @Expose inside the DTO
        })
      })
    )
  }
}