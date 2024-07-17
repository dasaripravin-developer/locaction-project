
export const config: Config = {
  port: 3000,
  database: {
    host: 'mongo.hycdymo.mongodb.net',
    port: 27017,
    dbName: 'PostOffice',
    username: 'dasaripravin123',
    password: 'YfFuXdGT9mITyzIM',
    appName: 'mongo',
  },
  redis: {
    host: '0.0.0.0',
    port: 6379,
  },
  thirdParty: {
    postalURL: 'https://api.postalpincode.in/pincode/',
  },
};

export type DatabaseConfig = {
  host: string;
  port: number;
  dbName: string;
  username: string;
  password: string;
  appName: string;
};

export type RedisConfig = {
  host: string;
  port: number;
};

export interface Config {
  port: number;
  database: DatabaseConfig;
  redis: RedisConfig;
  thirdParty: any;
}
