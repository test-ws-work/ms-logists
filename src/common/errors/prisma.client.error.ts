import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export type PrismaclientError = PrismaClientKnownRequestError & {
  meta?: { target: string };
};
