import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverDto, UpdateDriverDto } from '../dtos/drivers.dto';
import { DriverRepository } from '@/repository/drivers.repository';

@Injectable()
export class DriversService {
  constructor(private readonly driverRepository: DriverRepository) { }

  findAll() {
    return this.driverRepository.findAll();
  }

  async findOne(id: string) {
    const driver = await this.driverRepository.findById(id);
    if (!driver) {
      throw new NotFoundException(`Driver #${id} not found`);
    }
    return driver;
  }

  create(driver: CreateDriverDto) {
    return this.driverRepository.create();
  }

  update(id: string, changes: UpdateDriverDto) {
    return this.driverRepository.update(id, changes);
  }

  remove(id: string) {
    return this.driverRepository.remove(id);
  }
}
