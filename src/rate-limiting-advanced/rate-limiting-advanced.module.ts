import { Module } from '@nestjs/common';
import { RateLimitingAdvancedController } from './rate-limiting-advanced.controller.js';
import { RateLimitingAdvancedService } from './rate-limiting-advanced.service.js';

@Module({
  imports: [],
  controllers: [RateLimitingAdvancedController],
  providers: [RateLimitingAdvancedService],
})
export class RateLimitingAdvancedModule {}
