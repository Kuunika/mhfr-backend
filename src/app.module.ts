import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesModule } from './addresses/addresses.module';
import { FacilitiesModule } from './facilities/facilities.module';
import { CustomLoggerModule } from './custom-logger/custom-logger.module';
require( 'dotenv' ).config();

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.HOST,
    port: parseInt(process.env.PORT, 10),
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
}), FacilitiesModule, CustomLoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
