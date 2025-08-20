import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TiendaService } from './tienda.service';

@Controller('Tienda')
export class TiendaController {
  constructor(private readonly appService: TiendaService) {}

  @Get('/Cuenta')
  obtenerCuenta(@Query('id') id: string) {
    console.log('ID recibido:', id);
    return this.appService.obtenerCuenta(id);
  }

  @Post('/Transaccion')
  realizarTransaccion(@Body() body: any) {
    console.log('Realizando transacción...');
    return this.appService.realizarTransaccion(body);

  }
}
