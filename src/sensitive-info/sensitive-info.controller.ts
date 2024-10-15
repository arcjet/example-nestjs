import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ArcjetGuard, WithArcjetRules, sensitiveInfo } from '@arcjet/nest';
import { SensitiveInfoService } from './sensitive-info.service.js';

@Controller('sensitive-info')
// Uses the ArcjetGuard to protect the controller with the default rules defined
// in app.module.ts. Using a guard makes it easy to apply Arcjet rules, but you
// don't get access to the decision. See src/sensitive-info/ to see how to
// access the decision in the controller.
@UseGuards(ArcjetGuard)
// Attaches the rule to this controller
@WithArcjetRules([
  // Deny requests containing credit card numbers
  sensitiveInfo({
    mode: 'LIVE', // Will block requests, use "DRY_RUN" to log only
    deny: ['CREDIT_CARD_NUMBER'],
  }),
])
export class SensitiveInfoController {
  constructor(private readonly sensitiveInfoService: SensitiveInfoService) {}

  @Post()
  index(@Body() body: string) {
    return this.sensitiveInfoService.message(body);
  }
}
