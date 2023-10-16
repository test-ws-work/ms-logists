import { ConflictError } from './conflict.errors';
import { PrismaClientError } from './prisma.client.error';

export class UniqueConstraintError extends ConflictError {
  constructor(err: PrismaClientError) {
    const uniqueField = err.meta.target;

    super(`A record with this ${uniqueField} already exists`);
  }
}
