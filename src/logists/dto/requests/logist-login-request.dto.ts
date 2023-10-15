import { ApiProperty } from '@nestjs/swagger';

export class LogistLoginDtoRequest {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
