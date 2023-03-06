import { CreditCardSchema, CreditCard } from '@/repository/models/credit-card.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentController } from './controllers/payment.controller';
import { PaymentService } from './services/payment.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: CreditCard.name,
                schema: CreditCardSchema,
            },
        ]),
    ],
    controllers: [PaymentController],
    providers: [PaymentService],
})
export class PaymentModule { }
