import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors
} from '@nestjs/common'
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { map } from 'rxjs'


export function Serialize<T>(dto: ClassConstructor<T>) {
  return UseInterceptors(new SerializeInterceptor<T>(dto))
}

export class SerializeInterceptor<T> implements NestInterceptor {

  constructor(private readonly dto: ClassConstructor<T>) { }

  intercept(_context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data: T) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true
        });
      })
    );
  }
}