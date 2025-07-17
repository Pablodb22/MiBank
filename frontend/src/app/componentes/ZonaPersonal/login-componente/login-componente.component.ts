
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RestClienteService } from '../../../servicios/rest-cliente.service';


@Component({
  selector: 'app-login-componente',
  imports: [RouterModule,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login-componente.component.html',
  styleUrl: './login-componente.component.css'
})
export class LoginComponenteComponent {

  email: string = '';
  contrase: string = '';
  errores: any = {};

  constructor(private restClienteService: RestClienteService) {}

  validarCampos():boolean{

    this.errores = {};

    if(this.email.trim() === ''){
      this.errores.email = 'El correo es obligatorio';
    }

    if(this.contrase.trim() === ''){
      this.errores.contrase = 'La contraseña es obligatoria';
    }

    return Object.keys(this.errores).length === 0;
  }

  login() {
  if (!this.validarCampos()) {
    return;
  }

  const datosLogin = {
    email: this.email,
    contraseña: this.contrase
  };

  this.restClienteService.LoginCliente(datosLogin).subscribe({
    next: (response) => {
      if (response) {
    
        console.log('Login exitoso', response);
        window.location.href = "/";
      } else {       
        this.errores.general = "Email o contraseña incorrectos";
        console.log('Login fallido');
      }
    },
    error: (error) => {
      console.error('Error en el login', error);
      this.errores.general = "Error al conectar con el servidor";
    }
  });
}



}
