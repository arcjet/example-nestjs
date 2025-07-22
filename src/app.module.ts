import { ArcjetModule, shield } from '@arcjet/nest';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ArcjetLogger } from './arcjet-logger.js';
import { AttackModule } from './attack/attack.module.js';
import { BotsModule } from './bots/bots.module.js';
import { BotsAdvancedModule } from './bots-advanced/bots-advanced.module.js';
import { RateLimitingModule } from './rate-limiting/rate-limiting.module.js';
import { RateLimitingAdvancedModule } from './rate-limiting-advanced/rate-limiting-advanced.module.js';
import { SensitiveInfoModule } from './sensitive-info/sensitive-info.module.js';
import { SensitiveInfoAdvancedModule } from './sensitive-info-advanced/sensitive-info-advanced.module.js';
import { SignupModule } from './signup/signup.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
      validate(config) {
        if (typeof config.ARCJET_KEY !== 'string') {
          throw new Error(
            'ARCJET_KEY must be set in the environment variables. Get your key at https://app.arcjet.com',
          );
        }
        return config;
      },
    }),
    ArcjetModule.forRootAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        key: configService.get('ARCJET_KEY'),
        // Configures Arcjet Shield as a default rule everywhere. Shield protects
        // against common attacks e.g. SQL injection, XSS, etc.
        rules: [shield({ mode: 'LIVE' })],
        // Configures Arcjet to use a Nest compatible logger
        log: new ArcjetLogger(),
      }),
    }),
    BotsModule,
    BotsAdvancedModule,
    RateLimitingModule,
    RateLimitingAdvancedModule,
    SensitiveInfoModule,
    SensitiveInfoAdvancedModule,
    AttackModule,
    SignupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
