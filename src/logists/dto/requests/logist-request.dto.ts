import { ApiProperty } from '@nestjs/swagger';

export class LogistDtoRequest {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  customerType: string;
}
