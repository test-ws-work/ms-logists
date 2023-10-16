import { DatabaseError } from '../database.errors';
import { PrismaClientError } from '../prisma.client.error';
import { UniqueConstraintError } from '../unique-constraint.error';

enum PrismaErrors {
  UNIQUE_CONSTRAINT_FAIL = 'P2002',
}

export const handleDatabaseErrors = (err: PrismaClientError): Error => {
  switch (err.code) {
    case PrismaErrors.UNIQUE_CONSTRAINT_FAIL:
      return new UniqueConstraintError(err);
    default:
      return new DatabaseError(err.message);
  }
};
