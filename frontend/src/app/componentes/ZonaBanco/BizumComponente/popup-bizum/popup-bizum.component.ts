import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RestTiendaService } from '../../../../servicios/rest-tienda.service';
import { RestClienteService } from '../../../../servicios/rest-cliente.service';

@Component({
  selector: 'app-popup-bizum',
  imports: [CommonModule, FormsModule],
  templateUrl: './popup-bizum.component.html',
  styleUrl: './popup-bizum.component.css'
})
export class PopupBizumComponent {
  @Output()cerrar=new EventEmitter<void>();

  usuario=JSON.parse(localStorage.getItem('usuario')||'{}'); //USUARIO EMISOR
  bizum={fecha: new Date().toISOString().split('T')[0],cantidad:0,cuentaEmisor:this.usuario.email,cuentaReceptor:''};
  
  constructor(private restClienteService:RestClienteService, private restTiendaService:RestTiendaService) {}

  cerrarPopup() {
    this.cerrar.emit();
  }

  enviarBizum(){
    console.log("enviar bizum", this.bizum.cuentaReceptor);
    // Verificar que la cuenta receptora existe en la base de datos
    this.restClienteService.VerificarCuentaReceptora(this.bizum.cuentaReceptor).subscribe({
      next: (response: any) => {
        if (response) {          
          console.log('Cuenta receptora verificada:', response.email);
          
          // Ejecutar bizum (lógica de transferencia)
          const transac1 = { fecha: new Date().toISOString().split('T')[0], cantidad: this.bizum.cantidad, descripcion: 'Bizum de '+this.usuario.email, cuenta: response.id };

          const transac2 = { fecha: new Date().toISOString().split('T')[0], cantidad: this.bizum.cantidad * -1, descripcion: 'Bizum enviado a '+response.email, cuenta: this.usuario.id };

          this.restTiendaService.AñadirTransaccion(transac1).subscribe({
            next: (resp1: any) => {
              console.log('Transacción de recepción añadida', resp1);
            }
          });

          this.restTiendaService.AñadirTransaccion(transac2).subscribe({
            next: (resp2: any) => {
              console.log('Transacción de envío añadida', resp2);
            }
          });


          this.cerrarPopup();
        } else {          
          console.error('La cuenta receptora no existe.');
          alert('Error: La cuenta receptora no existe. Por favor, verifica el email e inténtalo de nuevo.');
        }
      },
      error: (error: any) => {
        console.error('Error al verificar la cuenta receptora', error);
        alert('Error al verificar la cuenta receptora. Por favor, inténtalo de nuevo más tarde.');
      }
    });
    
  }

}
