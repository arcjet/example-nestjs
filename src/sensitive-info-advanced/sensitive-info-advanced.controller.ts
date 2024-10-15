import { ARCJET, ArcjetNest, sensitiveInfo } from '@arcjet/nest';
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { SensitiveInfoAdvancedService } from './sensitive-info-advanced.service.js';

@Controller('sensitive-info-advanced')
// Sets up the Arcjet protection without using a guard so we can access the
// decision and use it in the controller. See src/sensitive-info-advanced/ to
// see an example that uses a guard to apply the rules.
export class SensitiveInfoAdvancedController {
  private readonly logger = new Logger(SensitiveInfoAdvancedController.name);

  constructor(
    private readonly sensitiveInfoAdvancedService: SensitiveInfoAdvancedService,
    @Inject(ARCJET) private readonly arcjet: ArcjetNest,
  ) {}

  @Post()
  async index(@Req() req: Request, @Body() body: string) {
    const decision = await this.arcjet
      .withRule(
        // Deny requests containing credit card numbers
        sensitiveInfo({
          mode: 'LIVE', // Will block requests, use "DRY_RUN" to log only
          deny: ['CREDIT_CARD_NUMBER'],
        }),
      )
      .protect(req);

    this.logger.log(`Arcjet: id = ${decision.id}`);
    this.logger.log(`Arcjet: decision = ${decision.conclusion}`);

    if (decision.isDenied()) {
      if (decision.reason.isSensitiveInfo()) {
        throw new HttpException(
          'Please remove any credit card numbers from your message',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
    } else if (decision.isErrored()) {
      // Fail open to prevent an Arcjet error from blocking all requests. You
      // may want to fail closed if this controller is very sensitive
      this.logger.error(`Arcjet error: ${decision.reason.message}`);
    }

    return this.sensitiveInfoAdvancedService.message(body);
  }
}
