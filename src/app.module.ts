import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ArcjetModule, shield } from '@arcjet/nest';
import { BotsModule } from './bots/bots.module.js';
import { BotsAdvancedModule } from './bots-advanced/bots-advanced.module.js';
import { ArcjetLogger } from './arcjetLogger.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    ArcjetModule.forRoot({
      isGlobal: true,
      key: process.env.ARCJET_KEY!,
      rules: [shield({ mode: 'LIVE' })],
      log: new ArcjetLogger(),
    }),
    BotsModule,
    BotsAdvancedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
