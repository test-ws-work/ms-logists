import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LogistDtoRequest } from '../dto/requests/logist-request.dto';
import { LogistsRepository } from '../repositories/logist.repository';
import { CustomerTypeEnum } from '../common/enums/customer.enum';
import { LogistDtoResponse } from '../dto/responses/logist-response.dto';
import { LogistUpdateDtoRequest } from '../dto/requests/logist-update-request.dto';

@Injectable()
export class LogistsService {
  private readonly LOGGER = new Logger(LogistsService.name);

  constructor(private readonly logistsRepository: LogistsRepository) {}

  async create(request: LogistDtoRequest): Promise<LogistDtoResponse> {
    const saltOrRounds = 10;
    const password = request.password;
    const hashPass = await bcrypt.hash(password, saltOrRounds);

    const data: LogistDtoRequest = {
      customerType: CustomerTypeEnum.ADMIN,
      email: request.email,
      firstName: request.firstName,
      lastName: request.lastName,
      password: hashPass,
    };

    this.LOGGER.log('Saving logist on database...');
    const logist = await this.logistsRepository.create(data);
    this.LOGGER.log('Saved.');

    delete logist.password;

    return logist;
  }

  async findOne(logistId: number): Promise<LogistDtoResponse> {
    this.LOGGER.log('Searching logist by id...');
    const logist = await this.logistsRepository.findOne(logistId);
    this.LOGGER.log('Found.');

    delete logist.password;

    return logist;
  }

  async update(
    id: number,
    request: LogistUpdateDtoRequest,
  ): Promise<LogistDtoResponse> {
    const saltOrRounds = 10;
    const password = request.password;
    const hashPass = bcrypt.hashSync(password, saltOrRounds);

    const data: LogistUpdateDtoRequest = {
      ...request,
      password: hashPass,
    };

    this.LOGGER.log('Updating logist...');
    const logist = await this.logistsRepository.update(id, data);
    this.LOGGER.log('Updated.');

    delete logist.password;

    return logist;
  }

  async remove(logistId: number): Promise<void> {
    this.LOGGER.log('Deleting logist...');
    this.logistsRepository.delete(logistId);
    this.LOGGER.log('Deleted.');
  }

  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<LogistDtoResponse> {
    this.LOGGER.log('Searching logist by email and password...');
    const logist = await this.logistsRepository.findByEmail(email);
    this.LOGGER.log('Found.');

    if (!logist) {
      throw new BadRequestException('Email or password incorrect.');
    }

    const isMatch = await bcrypt.compare(password, logist.password);

    if (!isMatch) {
      throw new BadRequestException('Email or password incorrect.');
    }

    delete logist.password;

    return logist;
  }
}
