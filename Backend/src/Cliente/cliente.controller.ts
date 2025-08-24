import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import CreateUserDto from './dto/create-user.dto';
import LoginUserDto from './dto/login-user.dto';

@Controller('Cliente')
export class ClienteController {
  constructor(private readonly appService: ClienteService) {}

  @Post()
  crear(@Body() createUsuarioDto: CreateUserDto) {
    return this.appService.crear(createUsuarioDto);
  }

  @Post('/Login')
  obtenerUsuario(@Body()LoginUserDto: LoginUserDto) {
    console.log(LoginUserDto)
    return this.appService.obtenerUsuario(LoginUserDto);

  }

  @Post('/AnadirIban')
  añadirIban(@Body() body: any) {
    
    return this.appService.añadirIban(body.usuarioId, body.iban);   
  }

   @Get('/VerificarCuenta')
  verificarCuenta(@Query('email') email: string) {
    console.log('Verificando cuenta para email de usuario:', email);
    return this.appService.verificarCuenta(email);
  }

}
