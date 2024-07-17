import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { AppModule } from './modules/location.module';
console.log('this is main file');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('module loaded');
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
