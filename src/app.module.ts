import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RepositoryModule } from './repository/repository.module';
import { config, validationSchema } from './config';
import { DatabaseModule } from './database/database.module';
import { environments } from './enviroments';
import { DriversModule } from './drivers/drivers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema,
    }),
    DatabaseModule,
    RepositoryModule,
    UsersModule,
    DriversModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
