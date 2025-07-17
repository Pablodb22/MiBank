import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entidad/cliente.entity';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/create-user.dto';
import LoginUserDto from './dto/login-user.dto';
import { createHash } from 'crypto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
  }

  async crear(createUsuarioDto: CreateUserDto): Promise<Usuario> {
  const hashedPassword = this.hashPassword(createUsuarioDto.contraseña);
  createUsuarioDto.contraseña = hashedPassword;

  const usuario = this.usuariosRepository.create(createUsuarioDto);
  return this.usuariosRepository.save(usuario);
}

async obtenerUsuario(LoginUserDto: LoginUserDto): Promise<Usuario | null> {
  const usuario = await this.usuariosRepository.findOne({
    where: { email: LoginUserDto.email },
  });

  if (!usuario) {
    console.log('No se encontró usuario con email:', LoginUserDto.email);
    return null;
  }

  const hashedInput = this.hashPassword(LoginUserDto.contraseña);
  
  if (usuario.contraseña !== hashedInput) {
    console.log('Contraseña incorrecta');
    return null;
  }

  console.log('Login exitoso');
  return usuario;
}


  
}
