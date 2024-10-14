import { Module } from '@nestjs/common';
import { BotsController } from './bots.controller.js';
import { BotsService } from './bots.service.js';

@Module({
  imports: [],
  controllers: [BotsController],
  providers: [BotsService],
})
export class BotsModule {}
