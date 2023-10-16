import { PartialType } from '@nestjs/mapped-types';
import { LogistDtoRequest } from './logist-request.dto';

export class LogistUpdateDtoRequest extends PartialType(LogistDtoRequest) {}
