import { Controller, Get, UseGuards } from '@nestjs/common';
import { ArcjetGuard, WithArcjetRules, detectBot } from '@arcjet/nest';
import { BotsService } from './bots.service.js';

@Controller('bots')
// Uses the ArcjetGuard to protect the controller with the default rules defined
// in app.module.ts. Using a guard makes it easy to apply Arcjet rules, but you
// don't get access to the decision. See src/bots-advanced/ to see how to access
// the decision in the controller.
@UseGuards(ArcjetGuard)
// Attaches the rule to this controller
@WithArcjetRules([
  detectBot({
    mode: 'LIVE', // will block requests. Use "DRY_RUN" to log only
    // configured with a list of bots to allow from
    // https://arcjet.com/bot-list
    allow: [], // blocks all automated clients
  }),
])
export class BotsController {
  constructor(private readonly botService: BotsService) {}

  @Get()
  index() {
    return this.botService.message();
  }
}
