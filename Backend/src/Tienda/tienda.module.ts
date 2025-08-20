import { Module } from '@nestjs/common';
import { TiendaController } from './tienda.controller';
import { TiendaService } from './tienda.service';
import { Cuenta } from './entidad/cuenta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cuenta])],
  controllers: [TiendaController],
  providers: [TiendaService]
})
export class TiendaModule {}
