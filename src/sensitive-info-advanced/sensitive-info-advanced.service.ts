import { Injectable } from '@nestjs/common';

@Injectable()
export class SensitiveInfoAdvancedService {
  message(content: string): { message: string; submittedContent: string } {
    return {
      message: 'Hello world',
      submittedContent: content,
    };
  }
}
