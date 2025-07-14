import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import CreateUserDto from './dto/create-user.dto';

@Controller('Cliente')
export class ClienteController {
  constructor(private readonly appService: ClienteService) {}

  @Post()
  crear(@Body() createUsuarioDto: CreateUserDto) {
    return this.appService.crear(createUsuarioDto);
  }


}
