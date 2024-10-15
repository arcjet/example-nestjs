import { Injectable } from '@nestjs/common';

@Injectable()
export class AttackService {
  message(): { message: string } {
    return {
      message: 'Hello world',
    };
  }
}
