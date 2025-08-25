import { Component, OnInit } from '@angular/core'; // ← Añadido OnInit
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestClienteService } from '../../../servicios/rest-cliente.service';
import { RouterLink } from '@angular/router'; // ← Corrección aquí

@Component({
  selector: 'app-configuracion-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './configuracion-usuario-component.component.html',
  styleUrl: './configuracion-usuario-component.component.css'
})
export class ConfiguracionUsuarioComponent implements OnInit { // ← Implementar OnInit
  usuario: any = {}; 
  iban: string = '';
  mensaje: string = '';

  constructor(private restClienteService: RestClienteService) {}
  
  ngOnInit() {
    const usuarioStr = localStorage.getItem('usuario');
    if (usuarioStr) {
      this.usuario = JSON.parse(usuarioStr);
      this.iban = this.usuario.iban || '';
    }
  }

  actualizarDatos() {   
    if(this.iban !== '') {
      const datosActualizados = {
        iban: this.iban,
        usuarioId: this.usuario.id
      }
      this.restClienteService.AñadirIban(datosActualizados).subscribe({
        next: (response: any) => {
          this.mensaje = 'IBAN actualizado correctamente';
          console.log('IBAN actualizado', response);
        },
        error: (error: any) => {
          this.mensaje = 'Error al actualizar el IBAN';
          console.error('Error al actualizar IBAN', error);
        }
      });
    }
  }
}