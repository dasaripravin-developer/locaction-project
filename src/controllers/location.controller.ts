import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { LocationService } from '../services/location.service';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async insertAndUpdateLocation(
    @Body('pincode') pincode: string,
  ): Promise<any> {
    try {
      const locationDetails =
        await this.locationService.insertAndUpdateLocationDetails(pincode);
      console.log(
        `location.controller - fetchAndStoreLocation - response - ${JSON.stringify(locationDetails)}`,
      );
      return locationDetails;
    } catch (err) {
      console.log(
        `location.controller - fetchAndStoreLocation - Exception - ${err.message}`,
      );
      return err;
    }
  }

  @Get(':pincode')
  async getLocationDetails(@Param('pincode') pincode: string): Promise<any> {
    try {
      const locationDetails =
        await this.locationService.getLocationDetails(pincode);
      console.log(
        `location.controller - getLocationDetails - response - ${JSON.stringify(locationDetails)}`,
      );
      return locationDetails;
    } catch (error) {
      console.log(
        `location.controller - getLocationDetails - Exception - ${error.message}`,
      );
      return error;
    }
  }
}
