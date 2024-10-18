import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  message(): string {
    return `Hello world. See the README for instructions.`;
  }
}
