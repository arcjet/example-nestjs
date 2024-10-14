import { ArcjetGuard } from '@arcjet/nest';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
@UseGuards(ArcjetGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  index() {
    return this.appService.message();
  }
}