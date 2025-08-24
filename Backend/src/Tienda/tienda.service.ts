import { Injectable } from '@nestjs/common';
import { Cuenta } from './entidad/cuenta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/Cliente/entidad/cliente.entity';

@Injectable()
export class TiendaService {
    nuevoTotal: number;

    constructor(
        @InjectRepository(Cuenta)
        private cuentaRepository: Repository<Cuenta>,
      
      ) {}

    async obtenerCuenta(id: string): Promise<Cuenta[]> {
        const cuentas = await this.cuentaRepository.find({
            where: { id_usuario: parseInt(id) },
        });

        if (!cuentas || cuentas.length === 0) {
            console.log('No se encontraron cuentas con ID de usuario:', id);
            return [];
        }

        console.log('Cuentas encontradas:', cuentas);
        return cuentas;
    }

    async realizarTransaccion(body: any): Promise<any> {

        const {fecha,cantidad,descripcion,cuenta } = body;

        if (!cuenta || !cantidad || !descripcion) {
            console.error('Datos de transacción incompletos:', body);
            throw new Error('Datos de transacción incompletos');
        }

        // Aquí podrías agregar la lógica para realizar la transacción
        console.log(`Realizando transacción: Usuario ID ${cuenta}, Cantidad ${cantidad}, Descripcion ${descripcion}`);

        //Tienes que buscar el ultimo total de la cuenta y sumarle o restarle la transacción
        const cuentas = await this.obtenerCuenta(cuenta);
    
        if (cuentas.length === 0) {
            const nuevaCuenta = this.cuentaRepository.create({
                id_usuario: cuenta,
                fecha: new Date(fecha),
                descripcion,
                transaccion: parseFloat(cantidad), 
                total: parseFloat(cantidad)
                });
        await this.cuentaRepository.save(nuevaCuenta);
            
        }else{
const ultimaCuenta = cuentas[cuentas.length - 1];
        const ultimoTotal = ultimaCuenta.total;
        
        if (cantidad < 0) {
             this.nuevoTotal = ultimoTotal - parseFloat(cantidad);
        } else {
             this.nuevoTotal = ultimoTotal + parseFloat(cantidad);
        }
        
        //Añadir Transacción a la base de datos
        const nuevaCuenta = this.cuentaRepository.create({
                id_usuario: cuenta,
                fecha: new Date(fecha),
                descripcion,
                transaccion: parseFloat(cantidad), 
                total: this.nuevoTotal
                });

        await this.cuentaRepository.save(nuevaCuenta);

        console.log('Transacción realizada con éxito:', nuevaCuenta);

        return {
            message: 'Transacción realizada con éxito',
            cuenta: nuevaCuenta
        };

        }        
        
    }   

    

}