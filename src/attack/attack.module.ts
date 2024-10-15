import { Module } from '@nestjs/common';
import { AttackController } from './attack.controller.js';
import { AttackService } from './attack.service.js';

@Module({
  imports: [],
  controllers: [AttackController],
  providers: [AttackService],
})
export class AttackModule {}
