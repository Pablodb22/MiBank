import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RestTiendaService } from '../../../../servicios/rest-tienda.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup-cuenta',
  imports: [CommonModule, FormsModule],
  templateUrl: './popup-cuenta.component.html',
  styleUrl: './popup-cuenta.component.css'
})
export class PopupCuentaComponent {
  @Input() tipo: 'gasto' | 'ingreso' = 'gasto';
  @Output() cerrar = new EventEmitter<void>();
  usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  transac = { fecha: '', cantidad: 0, descripcion: '', cuenta: this.usuario.id };

  constructor(private restTiendaService: RestTiendaService) { }

  cerrarPopup() {
    this.cerrar.emit();
  }

  anadirTransaccion() {
    console.log(this.transac.fecha);
    if (this.transac.fecha && this.transac.cantidad && this.transac.descripcion) {
      this.restTiendaService.AñadirTransaccion(this.transac).subscribe({
        next: (response: any) => {
          console.log('Transacción añadida', response);
          this.cerrarPopup();
        },
        error: (error: any) => {
          console.error('Error al añadir transacción', error);
        }
      })

    }else{
      console.error('Todos los campos son obligatorios');
      alert('Por favor, completa todos los campos antes de guardar.');
    }

  }

}
