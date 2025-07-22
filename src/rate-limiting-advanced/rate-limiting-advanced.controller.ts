import { ARCJET, ArcjetNest, tokenBucket } from '@arcjet/nest';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Req,
  Res,
} from '@nestjs/common';
import { Request } from 'express';
import { RateLimitingAdvancedService } from './rate-limiting-advanced.service.js';
import { setRateLimitHeaders } from '@arcjet/decorate';

@Controller('rate-limiting-advanced')
// Sets up the Arcjet protection without using a guard so we can access the
// decision and use it in the controller. See src/rate-limiting/ to see an
// example that uses a guard to apply the rules.
export class RateLimitingAdvancedController {
  private readonly logger = new Logger(RateLimitingAdvancedController.name);

  constructor(
    private readonly rateLimitingAdvancedController: RateLimitingAdvancedService,
    @Inject(ARCJET) private readonly arcjet: ArcjetNest,
  ) {}

  @Get()
  // The passthrough option allows us to access the response object so we can
  // set the rate limit headers. See
  // https://docs.nestjs.com/controllers#library-specific-approach
  async index(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const decision = await this.arcjet
      .withRule(
        tokenBucket({
          mode: 'LIVE', // will block requests. Use "DRY_RUN" to log only
          refillRate: 5, // refill 5 tokens per interval
          interval: 10, // refill every 10 seconds
          capacity: 10, // bucket maximum capacity of 10 tokens
        }),
      )
      .protect(req, { requested: 5 }); // request 5 tokens

    setRateLimitHeaders(res, decision);

    this.logger.log(`Arcjet: id = ${decision.id}`);
    this.logger.log(`Arcjet: decision = ${decision.conclusion}`);

    // Use the IP analysis to customize the response based on the country
    if (decision.ip.hasCountry() && decision.ip.country === 'JP') {
      return this.rateLimitingAdvancedController.messageJP();
    }

    // Always deny requests from VPNs
    if (decision.ip.isVpn()) {
      throw new HttpException('VPNs are forbidden', HttpStatus.FORBIDDEN);
    }

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        throw new HttpException(
          'Too many requests',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      } else {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
    } else if (decision.isErrored()) {
      // Fail open to prevent an Arcjet error from blocking all requests. You
      // may want to fail closed if this controller is very sensitive
      this.logger.error(`Arcjet error: ${decision.reason.message}`);
    }

    return this.rateLimitingAdvancedController.message();
  }
}
