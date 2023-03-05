import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.schema';
import { UserRepository } from './users.repository';
import { DriverSchema } from './models/drivers.schema';
import { DriverRepository } from './drivers.repository';

const importsAndExports = [UserRepository, DriverRepository];
const mongoSchemas = [{ name: 'User', schema: UserSchema }, { name: 'Driver', schema: DriverSchema }];

@Global()
@Module({
  imports: [MongooseModule.forFeature(mongoSchemas)],
  exports: [...importsAndExports],
  providers: [...importsAndExports],
})
export class RepositoryModule { }
