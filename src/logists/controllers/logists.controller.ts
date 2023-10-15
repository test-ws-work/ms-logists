import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LogistsService } from '../services/logists.service';
import { LogistDtoRequest } from '../dto/requests/logist-request.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LogistDtoResponse } from '../dto/responses/logist-response.dto';
import { LogistEntity } from '../entities/logist.entity';
import { LogistLoginDtoRequest } from '../dto/requests/logist-login-request.dto';

@ApiTags('ms-logists')
@Controller('api/v1/logists')
export class LogistsController {
  constructor(private readonly logistsService: LogistsService) {}

  @ApiResponse({
    status: 201,
    description: 'Create a new logist',
    type: LogistDtoResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid Request.' })
  @Post()
  async create(@Body() request: LogistDtoRequest): Promise<LogistEntity> {
    return this.logistsService.create(request);
  }

  @ApiResponse({
    status: 200,
    description: 'Search logist by id',
    type: LogistDtoResponse,
  })
  @ApiResponse({ status: 404, description: 'Logist not found.' })
  @Get(':logistId')
  async findOne(@Param('logistId') logistId: string): Promise<LogistEntity> {
    return this.logistsService.findOne(+logistId);
  }

  @ApiResponse({
    status: 201,
    description: 'Update logist',
    type: LogistDtoResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid Request.' })
  @ApiResponse({ status: 404, description: 'Logist not found.' })
  @Patch(':logistId')
  async update(
    @Param('logistId') logistId: string,
    @Body() updateLogistDto: LogistDtoRequest,
  ): Promise<LogistEntity> {
    return this.logistsService.update(+logistId, updateLogistDto);
  }

  @ApiResponse({
    status: 204,
    description: 'Remove logist',
  })
  @ApiResponse({ status: 404, description: 'Logist not found.' })
  @Delete(':logistId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('logistId') logistId: string): Promise<void> {
    this.logistsService.remove(+logistId);
  }

  @ApiResponse({
    status: 200,
    description: 'Search logist by email and password',
    type: LogistDtoResponse,
  })
  @ApiResponse({ status: 404, description: 'Email or password invalid' })
  @Post('/search-by-email-password')
  async findByEmailAndPassword(
    @Body() { email, password }: LogistLoginDtoRequest,
  ): Promise<LogistDtoResponse> {
    return this.logistsService.findByEmailAndPassword(email, password);
  }
}
