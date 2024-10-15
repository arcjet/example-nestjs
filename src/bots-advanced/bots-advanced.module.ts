import { Module } from '@nestjs/common';
import { BotsAdvancedController } from './bots-advanced.controller.js';
import { BotsAdvancedService } from './bots-advanced.service.js';

@Module({
  imports: [],
  controllers: [BotsAdvancedController],
  providers: [BotsAdvancedService],
})
export class BotsAdvancedModule {}
