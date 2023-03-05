import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateDriverDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the mail of Driver' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5, {
    message: 'password must not be less than 5',
  })
  readonly password: string;
}

export class UpdateDriverDto extends PartialType(CreateDriverDto) { }
