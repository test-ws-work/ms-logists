import { PrismaclientError } from '../prisma.client.error';

export const isPrismaError = (e: PrismaclientError) => {
  return (
    typeof e.code === 'string' &&
    typeof e.clientVersion === 'string' &&
    (typeof e.meta === 'undefined' || typeof e.meta === 'object')
  );
};
