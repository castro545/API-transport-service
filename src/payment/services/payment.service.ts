import { Injectable } from '@nestjs/common';
import { WompiRepository } from '../../repository/wompi.repository';
import { CreateCardDto } from '../dtos/card.dto';
import { CreditCard } from '../../repository/models/credit-card.schema';

@Injectable()
export class PaymentService {
    constructor(private readonly wompiRepository: WompiRepository) { }

    async createCreditCard(createCardDto: CreateCardDto): Promise<CreditCard> {
        const card = new CreditCard();
        card.number = createCardDto.number;
        card.cvc = createCardDto.cvc;
        card.exp_month = createCardDto.exp_month;
        card.exp_year = createCardDto.exp_year;
        card.card_holder = createCardDto.card_holder;
        const createdCard = await this.wompiRepository.createCreditCard(card);
        return createdCard;
    }

    async createCardToken(createCardDto: CreateCardDto): Promise<string> {
        const token = await this.wompiRepository.createCardToken({
            number: createCardDto.number,
            cvc: createCardDto.cvc,
            exp_month: createCardDto.exp_month,
            exp_year: createCardDto.exp_year,
            card_holder: createCardDto.card_holder,
        });
        return token;
    }
}
