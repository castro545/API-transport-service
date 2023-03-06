import { HttpServer, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';
import { CreditCard } from './models/credit-card.schema';

@Injectable()
export class WompiRepository {
    constructor(
        private readonly httpService: HttpServer,
        private readonly configService: ConfigService,
    ) { }

    async createCreditCard(creditCard: CreditCard): Promise<CreditCard> {
        const publicKey = this.configService.get<string>('pub_test_oFUChKeP4HLuoUHMPzMx6tlKJM82ZlUa');
        const endpoint = `${this.configService.get<string>('https://sandbox.wompi.co/v1')}/payment_sources`;

        const payload = {
            type: 'CARD',
            token: creditCard.token,
            customer_email: creditCard.customer_email,
        };

        const headers = { Authorization: `Bearer ${publicKey}` };

        return this.httpService.post(endpoint, payload, { headers }).toPromise();

    }
    async createCardToken(cardInfo: any): Promise<string> {
        const { number, cvc, exp_month, exp_year, card_holder } = cardInfo;
        const publicKey = this.configService.get<string>('pub_test_oFUChKeP4HLuoUHMPzMx6tlKJM82ZlUa');
        const endpoint = `${this.configService.get<string>('https://sandbox.wompi.co/v1')}/tokens/cards`;

        const payload = { number, cvc, exp_month, exp_year, card_holder };
        const headers = { Authorization: `Bearer ${publicKey}` };

        return this.httpService.post(endpoint, payload, { headers: headers }).toPromise();

    }
}
