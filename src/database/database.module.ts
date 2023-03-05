import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { IDatabase } from './database.interface';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      // 👈 Implement Module
      useFactory: (configService: ConfigService) => {
        const { connection, user, password, host, port, dbName } =
          configService.get<IDatabase>('config.mongo');
        return {
          uri: `${connection}://${host}:${port}`,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          user,
          pass: password,
          dbName,
          authSource: dbName,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
