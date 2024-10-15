import { Module } from '@nestjs/common';
import { SensitiveInfoAdvancedController } from './sensitive-info-advanced.controller.js';
import { SensitiveInfoAdvancedService } from './sensitive-info-advanced.service.js';

@Module({
  imports: [],
  controllers: [SensitiveInfoAdvancedController],
  providers: [SensitiveInfoAdvancedService],
})
export class SensitiveInfoAdvancedModule {}
