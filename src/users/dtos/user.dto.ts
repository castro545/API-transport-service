import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the mail of user' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5, {
    message: 'password must not be less than 5',
  })
  readonly password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
