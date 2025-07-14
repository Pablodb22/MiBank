
import { IsString, IsNotEmpty } from 'class-validator';

export default class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    apellido: string;

    @IsString()
    @IsNotEmpty()    
    email: string;

    @IsString()
    @IsNotEmpty()
    contraseña: string;
}