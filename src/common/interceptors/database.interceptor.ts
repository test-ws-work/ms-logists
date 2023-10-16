import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { isPrismaError } from '../errors/utils/is-prisma.error';
import { handleDatabaseErrors } from '../errors/utils/handle-database.erros.util';
import { DatabaseError } from '../errors/database.errors';

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (isPrismaError(error)) {
          error = handleDatabaseErrors(error);
        }
        if (error instanceof DatabaseError) {
          throw new BadRequestException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}
