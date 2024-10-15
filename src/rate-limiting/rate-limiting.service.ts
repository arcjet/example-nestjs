import { Injectable } from '@nestjs/common';

@Injectable()
export class RateLimitingService {
  message(): { message: string } {
    return {
      message: 'Hello world',
    };
  }
}
