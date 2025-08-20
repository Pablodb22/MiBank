import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../LayoutComponente/header/header.component";
import { FooterComponent } from "../LayoutComponente/footer/footer.component";
import { PopupCuentaComponent } from './popup-cuenta/popup-cuenta.component';
import { RestTiendaService } from '../../../servicios/rest-tienda.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cuenta-componente',
  standalone: true, 
  imports: [CommonModule, HeaderComponent, FooterComponent, PopupCuentaComponent,FormsModule],
  templateUrl: './cuenta-componente.component.html',
  styleUrl: './cuenta-componente.component.css'
})
export class CuentaComponenteComponent {  
  mostrarPopup = false;
  tipoMovimiento: 'gasto' | 'ingreso' = 'gasto';
  usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  cuenta:any
  presupuestoRestante:number=0
  totalGastos:number = 0;
  constructor(private restTiendaSrvice: RestTiendaService) {}

  abrirPopup(tipo: 'gasto' | 'ingreso') {
    console.log("abriendo popup de tipo:", tipo);
    this.tipoMovimiento = tipo;
    this.mostrarPopup = true;
  }

  cerrarPopup() {
    this.mostrarPopup = false;
  }

 ngOnInit(){
  this.restTiendaSrvice.EncontrarCuentaPorId(this.usuario.id).subscribe(
    (response:any) => {
      this.cuenta = response;
      
      this.totalGastos = this.cuenta
        .filter((t:any) => t.transaccion < 0)
        .reduce((acc:number, t:any) => acc + t.transaccion, 0) * -1;
      
      this.presupuestoRestante = this.cuenta
        .reduce((acc:number, t:any) => acc + t.transaccion, 0);

      console.log("Cuenta encontrada:", this.cuenta);
      console.log("Total gastos:", this.totalGastos);
      console.log("Presupuesto restante:", this.presupuestoRestante);
    },
    (error:any) => {
      console.error("Error al encontrar la cuenta:", error);
    }
  );
}



  
}
