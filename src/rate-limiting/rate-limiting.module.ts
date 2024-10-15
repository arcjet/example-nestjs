import { Module } from '@nestjs/common';
import { RateLimitingController } from './rate-limiting.controller.js';
import { RateLimitingService } from './rate-limiting.service.js';

@Module({
  imports: [],
  controllers: [RateLimitingController],
  providers: [RateLimitingService],
})
export class RateLimitingModule {}
