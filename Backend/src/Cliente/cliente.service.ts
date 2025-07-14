import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entidad/cliente.entity';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/create-user.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  async crear(createUsuarioDto:CreateUserDto):Promise<Usuario> {
    const usuario = this.usuariosRepository.create(createUsuarioDto);
    return this.usuariosRepository.save(usuario);
  }
}
