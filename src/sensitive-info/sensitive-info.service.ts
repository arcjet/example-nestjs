import { Injectable } from '@nestjs/common';

@Injectable()
export class SensitiveInfoService {
  message(content: string): { message: string; submittedContent: string } {
    return {
      message: 'Hello world',
      submittedContent: content,
    };
  }
}
