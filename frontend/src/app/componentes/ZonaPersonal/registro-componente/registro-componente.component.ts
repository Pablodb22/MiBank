import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RestClienteService } from '../../../servicios/rest-cliente.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-registro-componente',
  standalone: true,
  imports: [RouterModule, FormsModule, HttpClientModule,ReactiveFormsModule,CommonModule],
  templateUrl: './registro-componente.component.html',
  styleUrl: './registro-componente.component.css'
})
export class RegistroComponenteComponent {
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  contrase: string = '';  
  errores: any = {};
  

  constructor(private restClienteService: RestClienteService) {}

  validarCampos(): boolean {
    this.errores = {};

    if (!this.nombre.trim()) {
      this.errores.nombre = 'El nombre es obligatorio';
    }
    if (!this.apellido.trim()) {
      this.errores.apellido = 'El apellido es obligatorio';
    }
    if (!this.email.trim()) {
      this.errores.email = 'El correo es obligatorio';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email)) {
      this.errores.email = 'El correo no es válido';
    }
    if (!this.contrase.trim()) {
      this.errores.contrase = 'La contraseña es obligatoria';
    } else if (this.contrase.length < 6) {
      this.errores.contrase = 'La contraseña debe tener al menos 6 caracteres';
    }

    return Object.keys(this.errores).length === 0;
  }

  enviarRegistro() {
    if (!this.validarCampos()) {
      return;
    }

    

    const datosRegistro = {
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      contraseña: this.contrase
    };

    this.restClienteService.RegistroCliente(datosRegistro).subscribe(
      response => {
        console.log('Registro exitoso frontend:', response);    
        window.location.href = "/login";

      },
      error => {
        console.error('Error en el registro frontend:', error);        
      }
    );
  }
}