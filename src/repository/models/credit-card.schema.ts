import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class CreditCard extends Document {
    @Prop()
    number: string;

    @Prop()
    cvc: string;

    @Prop()
    token: string;

    @Prop()
    exp_month: string;

    @Prop()
    exp_year: string;

    @Prop()
    card_holder: string;

    @Prop()
    customer_email: string;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    user: User;
}

export const CreditCardSchema = SchemaFactory.createForClass(CreditCard);
