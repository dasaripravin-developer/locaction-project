import axios from 'axios';
import { config } from '../../config/app.config';
const { thirdParty } = config;

export async function getPostalData(pincode: string): Promise<any> {
  try {
    const url = `${thirdParty.postalURL}${pincode}`;
    const response = await axios.get(url);
    if (response.status === 200) return response.data;
    else return new Error(response.data[0].Message);
  } catch (error) {
    console.log(
      `third-party.service - postalService - Exception - ${error.message}`,
    );
    throw error;
  }
}
