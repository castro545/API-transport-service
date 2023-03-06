import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreditCard } from './credit-card.schema';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'CreditCard' }] })
  creditCards: CreditCard[];


}

export const UserSchema = SchemaFactory.createForClass(User);
