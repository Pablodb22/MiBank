import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Usuario} from './entidad/cliente.entity'


@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
