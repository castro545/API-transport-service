import { faker } from '@faker-js/faker';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDriverDto, UpdateDriverDto } from '../drivers/dtos/drivers.dto';
import { Driver } from './models/drivers.schema';

@Injectable()
export class DriverRepository {
    constructor(
        @InjectModel('Driver')
        private readonly driverModel: Model<Driver>,
    ) { }

    async findAll() {
        return await this.driverModel.find().exec();
    }

    async findById(idHost: string): Promise<Driver> {
        return await this.driverModel.findOne({ _id: idHost });
    }

    async create(): Promise<Driver> {
        const newDriver = new this.driverModel({
            email: faker.internet.email(),
            password: faker.internet.password(),
            role: 'driver',
            currentLocation: {
                type: 'Point',
                coordinates: [
                    parseFloat(faker.address.longitude()),
                    parseFloat(faker.address.latitude()),
                ],
            },
        });

        return await newDriver.save();
    }


    async update(id: string, updateDriver: UpdateDriverDto): Promise<Driver> {
        return await this.driverModel
            .findByIdAndUpdate(id, { $set: updateDriver }, { new: true })
            .exec();
    }

    async remove(id: string): Promise<Driver> {
        return await this.driverModel.findByIdAndRemove(id);
    }
}
