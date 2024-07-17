import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from '../model/location.model';
import { getPostalData } from '../services/third-party/postal.service';
import { RedisService } from './redis.service';
import { config } from '../config/app.config';
const { redis } = config;

@Injectable()
export class LocationService {
  private readonly redisService: RedisService;
  constructor(
    @InjectModel('Location') private readonly locationModel: Model<Location>,
  ) {
    this.redisService = new RedisService({
      host: redis.host,
      port: redis.port
    });
  }

  async insertAndUpdateLocationDetails(pincode: string): Promise<any> {
    try {
      const locationData = await getPostalData(pincode);
      console.log(
        `locatonController - insertAndUpdateLocationDetails - location data - ${JSON.stringify(locationData)} for pincode - ${pincode}`,
      );
      if (locationData[0].Status !== 'Success')
        throw new Error(locationData[0].Message);

      const updatedLocation = await this.locationModel.findOneAndUpdate(
        { pincode },
        { location: locationData[0].PostOffice },
        { new: true, upsert: true },
      ).exec();
      // updatedLocation.save()
      await this.redisService.set(pincode, updatedLocation.location);
      console.log(
        `locatonController - insertAndUpdateLocationDetails - ${pincode} - location details saved in DB - ${JSON.stringify(updatedLocation)}`,
      );
      return updatedLocation.location;
    } catch (error) {
      console.log(
        `locatonController - insertAndUpdateLocationDetails - Exception - ${error.message}`,
      );
      return { message: error.message };
    }
  }

  async getLocationDetails(pincode: string): Promise<any> {
    try {
      let locationData = await this.redisService.get(pincode);
      if (!locationData) {
        locationData = await this.locationModel.findOne({ pincode }, [
          'location',
        ]).exec();
        if (!locationData)
          throw new Error(
            'Data not found in DB, Please insert location details',
          );
        locationData = locationData.location
        await this.redisService.set(pincode, locationData);
        console.log(
          `location.service - getLocationDetails - fetch location from DB`,
        );
      }
      console.log(
        `location.service - getLocationDetails - locationDetail - ${JSON.stringify(locationData)}`,
      );
      return locationData;
    } catch (err) {
      console.log(
        `location.service - getLocationDetails - Exception - ${err.message}`,
      );
      return { message: err.message };
    }
  }
}
