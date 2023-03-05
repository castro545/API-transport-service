import { DriverSchema, Driver } from '@/repository/models/drivers.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DriversController } from './controllers/drivers.controller';

import { DriversService } from './services/drivers.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Driver.name,
        schema: DriverSchema,
      },
    ]),
  ],
  controllers: [DriversController],
  providers: [DriversService],
})
export class DriversModule { }
