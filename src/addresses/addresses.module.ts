import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Addresses } from '../common/entities/addresses.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Addresses])],
  providers: [AddressesService],
})
export class AddressesModule {}
