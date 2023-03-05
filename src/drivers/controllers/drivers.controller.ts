import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { DriversService } from '../services/drivers.service';
import { CreateDriverDto, UpdateDriverDto } from '../dtos/drivers.dto';
import { MongoIdPipe } from '@/common/mongo-id.pipe';

@ApiTags('drivers')
@Controller('drivers')
export class DriversController {
  constructor(private driversService: DriversService) { }

  @Get()
  @ApiOperation({ summary: 'Get all drivers' })
  findAll() {
    return this.driversService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get driver by BD id' })
  get(@Param('id', MongoIdPipe) id: string) {
    return this.driversService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create driver' })
  create(createDriverDto: CreateDriverDto) {
    return this.driversService.create(createDriverDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update driver by Id' })
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateDriverDto) {
    return this.driversService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete driver by Id' })
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.driversService.remove(id);
  }
}
