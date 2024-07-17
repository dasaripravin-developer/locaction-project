import { Module } from '@nestjs/common';
import { LocationModule } from './modules/location.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config/app.config';
const { database } = config;

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${database.username}:${database.password}@${database.host}/${database.dbName}?retryWrites=true&w=majority&appName=${database.appName}`,
      // `mongodb://${database.host}:${database.port}/${database.dbName}`,
    ),
    LocationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
