import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
    @IsString()
    @ApiProperty({ description: 'Número de la tarjeta' })
    readonly number: string;

    @IsString()
    @ApiProperty({ description: 'CVC de la tarjeta' })
    readonly cvc: string;

    @IsNumber()
    @Min(1)
    @ApiProperty({ description: 'Mes de vencimiento de la tarjeta' })
    readonly exp_month: number;

    @IsNumber()
    @Min(2022)
    @ApiProperty({ description: 'Año de vencimiento de la tarjeta' })
    readonly exp_year: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Nombre del titular de la tarjeta' })
    readonly card_holder: string;
}
