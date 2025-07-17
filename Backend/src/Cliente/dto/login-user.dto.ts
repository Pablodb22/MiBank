
import { IsString, IsNotEmpty } from 'class-validator';

export default class LoginUserDto {
   
    @IsString()
    @IsNotEmpty()    
    email: string;

    @IsString()
    @IsNotEmpty()
    contraseña: string;
}