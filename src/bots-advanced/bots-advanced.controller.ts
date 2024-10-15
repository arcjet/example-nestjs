import { ARCJET, ArcjetNest, detectBot } from '@arcjet/nest';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Req,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { BotsAdvancedService } from './bots-advanced.service.js';

@Controller('bots-advanced')
// Sets up the Arcjet protection without using a guard so we can access the
// decision and use it in the controller. See src/bots/ to see an example that
// uses a guard to apply the rules.
export class BotsAdvancedController {
  private readonly logger = new Logger(BotsAdvancedController.name);

  constructor(
    private readonly botService: BotsAdvancedService,
    @Inject(ARCJET) private readonly arcjet: ArcjetNest,
  ) {}

  @Get()
  async botsAdvanced(@Req() req: Request) {
    const decision = await this.arcjet
      .withRule(
        detectBot({
          mode: 'LIVE', // will block requests. Use "DRY_RUN" to log only
          // configured with a list of bots to allow from
          // https://arcjet.com/bot-list
          allow: [], // blocks all automated clients
        }),
      )
      .protect(req);

    this.logger.log(`Arcjet: id = ${decision.id}`);
    this.logger.log(`Arcjet: decision = ${decision.conclusion}`);

    if (decision.isDenied()) {
      if (decision.reason.isBot()) {
        throw new HttpException('No bots allowed', HttpStatus.FORBIDDEN);
      } else {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
    } else if (decision.isErrored()) {
      if (decision.reason.message.includes('missing User-Agent header')) {
        // Requests without User-Agent headers can not be identified as any
        // particular bot and will be marked as an errored decision. Most
        // legitimate clients always send this header, so we recommend blocking
        // requests without it.
        this.logger.warn('User-Agent header is missing');
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      } else {
        // Fail open to prevent an Arcjet error from blocking all requests. You
        // may want to fail closed if this controller is very sensitive
        this.logger.error(`Arcjet error: ${decision.reason.message}`);
      }
    }

    return this.botService.message();
  }
}
