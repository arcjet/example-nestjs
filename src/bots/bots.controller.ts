import { Controller, Get, UseGuards } from '@nestjs/common';
import { ArcjetGuard, WithArcjetRules, detectBot } from '@arcjet/nest';
import { BotsService } from './bots.service.js';

@Controller('bots')
@UseGuards(ArcjetGuard)
@WithArcjetRules([
  detectBot({
    mode: 'LIVE',
    allow: [],
  }),
])
export class BotsController {
  constructor(private readonly botService: BotsService) {}

  @Get()
  bots() {
    return this.botService.message();
  }
}