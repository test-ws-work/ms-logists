import { Logist } from '@prisma/client';

export class LogistEntity implements Logist {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  customerType: string;
}
