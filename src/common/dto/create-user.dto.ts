import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'name should not be empty' })
  name: string;

  @IsEmail({}, { message: 'email must be a valid email address' })
  email: string;
}
