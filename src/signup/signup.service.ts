import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SignupService {
  private readonly logger = new Logger(SignupService.name);

  signup(email: string): { message: string } {
    this.logger.log(`Signup attempt for ${email}`);

    return {
      message: 'Hello world',
    };
  }
}
