import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Driver extends Document {
    @Prop()
    id: number;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: [Number],
    })
    currentLocation: {
        type: string;
        coordinates: [number, number];
    };
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
