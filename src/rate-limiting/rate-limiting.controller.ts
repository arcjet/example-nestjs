import { ArcjetGuard, WithArcjetRules, fixedWindow } from '@arcjet/nest';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { RateLimitingService } from './rate-limiting.service.js';

@Controller('rate-limiting')
// Uses the ArcjetGuard to protect the controller with the default rules defined
// in app.module.ts. Using a guard makes it easy to apply Arcjet rules, but you
// don't get access to the decision. See src/rate-limiting-advanced/ to see how
// to access the decision in the controller.
@UseGuards(ArcjetGuard)
// Attaches the rule to this controller
@WithArcjetRules([
  // Create a fixed window rate limit. Sliding window and token bucket are also
  // available.
  fixedWindow({
    mode: 'LIVE', // will block requests. Use "DRY_RUN" to log only
    max: 2, // max requests per window
    window: '60s', // window duration
  }),
])
export class RateLimitingController {
  constructor(private readonly rateLimitingService: RateLimitingService) {}

  @Get()
  index() {
    return this.rateLimitingService.message();
  }
}
