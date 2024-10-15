import { Injectable } from '@nestjs/common';

@Injectable()
export class BotsAdvancedService {
  message(): { message: string } {
    return {
      message: 'Hello world',
    };
  }
}
