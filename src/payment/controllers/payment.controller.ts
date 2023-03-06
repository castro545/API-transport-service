import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { CreateCardDto } from '../dtos/card.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Post('/cards')
    async createCreditCard(@Body() createCardDto: CreateCardDto) {
        const createdCard = await this.paymentService.createCreditCard(createCardDto);
        return createdCard;
    }

    @Post('/tokens')
    async createPaymentToken(@Body() createCardDto: CreateCardDto) {
        const token = await this.paymentService.createCardToken(createCardDto);
        return token;
    }
}
