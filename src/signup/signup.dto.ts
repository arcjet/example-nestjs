import { IsNotEmpty } from 'class-validator';

// Validation class as described at
// https://docs.nestjs.com/techniques/validation. We're not using the IsEmail
// decorator here because Arcjet handles this for you.
export class SignupDto {
  @IsNotEmpty()
  email: string;
}
