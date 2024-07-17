import { Module } from '@nestjs/common';
import { LocationController } from '../controllers/location.controller';
import { LocationService } from '../services/location.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationSchema } from '../model/location.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Location', schema: LocationSchema }])],
  controllers: [LocationController],
  providers: [LocationService],
  exports: []
})
export class LocationModule {}
