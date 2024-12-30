import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';

import { ApiSuccessResponse } from '@cymulate-test/common';

import { AttemptService } from './attempt.service';
import { AccessControl, User } from '../../common/decorators';
import { UserDto } from '../user/user.dto';
import { AttemptCreationDto, AttemptDto, AttemptPaginationDto, HandleAttemptNotify } from './attempt.dto';

@Controller('/attempt')
@ApiTags('Attempt')
export class AttemptController {
  constructor(
    private readonly attemptService: AttemptService,
  ) {}

  @Post()
  @AccessControl()
  @ApiSuccessResponse({})
  async createAttempt(@Body() data: AttemptCreationDto, @User() user: UserDto) {
    try {
      await this.attemptService.createAttempt(user, data);
      return {
        success: true,
      };
    } catch (err) {
      throw new BadRequestException({
        success: false,
        message: err.message,
      });
    }
  }

  @Get()
  @AccessControl()
  @ApiSuccessResponse([AttemptDto])
  async getAttempt(@Query() data: AttemptPaginationDto, @User() user: UserDto) {
    try {
      const response: AttemptDto[] = await this.attemptService.getAttempts(user, data);
      return {
        success: true,
        response,
      };
    } catch (err) {
      throw new BadRequestException({
        success: false,
        message: err.message,
      });
    }
  }

  @Post('/notify')
  @ApiExcludeEndpoint()
  async notify(@Body() data: HandleAttemptNotify) {
    try {
      await this.attemptService.handleNotification(data);
      return {
        success: true,
      };
    } catch (err) {
      throw new BadRequestException({
        success: false,
        message: err.message,
      });
    }
  }
}
