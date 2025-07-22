import { ArcjetGuard } from '@arcjet/nest';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AttackService } from './attack.service.js';

@Controller('attack')
// Uses the ArcjetGuard to protect the controller with the default rules defined
// in app.module.ts.
@UseGuards(ArcjetGuard)
// Attaches the rule to this controller
export class AttackController {
  constructor(private readonly attackService: AttackService) {}

  @Get()
  index() {
    return this.attackService.message();
  }
}
