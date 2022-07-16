import { IsEmail, IsString } from 'class-validator'

export class FindOneUserDto {

  @IsString()
  username: string;

  @IsEmail()
  @IsString()
  email: string;
} 