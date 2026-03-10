import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

export enum SignupRole {
  RIDER = 'RIDER',
  DRIVER = 'DRIVER',
}

export class SignupDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(SignupRole)
  role: SignupRole;
}