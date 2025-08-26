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
  imports: [CommonModule, HeaderComponent, FooterComponent, PopupCuentaComponent, FormsModule],
  templateUrl: './cuenta-componente.component.html',
  styleUrl: './cuenta-componente.component.css'
})
export class CuentaComponenteComponent {
  mostrarPopup = false;
  tipoMovimiento: 'gasto' | 'ingreso' = 'gasto';
  usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  cuenta: any;
  presupuestoRestante: number = 0;
  totalGastos: number = 0;
  agrupadoPorMes: any = {};

  constructor(private restTiendaSrvice: RestTiendaService) {}

  abrirPopup(tipo: 'gasto' | 'ingreso') {
    console.log("abriendo popup de tipo:", tipo);
    this.tipoMovimiento = tipo;
    this.mostrarPopup = true;
  }

  cerrarPopup() {
    this.mostrarPopup = false;
  }

  ngOnInit() {
    this.restTiendaSrvice.EncontrarCuentaPorId(this.usuario.id).subscribe(
      (response: any) => {
        this.cuenta = response;

        
        this.totalGastos = this.cuenta
          .filter((t: any) => t.transaccion < 0)
          .reduce((acc: number, t: any) => acc + t.transaccion, 0) * -1;

        this.presupuestoRestante = this.cuenta
          .reduce((acc: number, t: any) => acc + t.transaccion, 0);

       
        this.agrupadoPorMes = this.cuenta.reduce((acc: any, trans: any) => {
          const fecha = new Date(trans.fecha);
          const key = `${fecha.getFullYear()}-${(fecha.getMonth() + 1)
            .toString()
            .padStart(2, '0')}`; 

          if (!acc[key]) {
            acc[key] = { ingresos: 0, gastos: 0, movimientos: [] };
          }

          if (trans.transaccion > 0) {
            acc[key].ingresos += trans.transaccion;
          } else {
            acc[key].gastos += trans.transaccion;
          }

          acc[key].movimientos.push(trans);

          return acc;
        }, {});

        console.log("Agrupado por mes:", this.agrupadoPorMes);
      },
      (error: any) => {
        console.error("Error al encontrar la cuenta:", error);
      }
    );
  }

  
  sortByKey = (a: any, b: any) => {
    return b.key.localeCompare(a.key);
  };

  
  formatearMes(key: string): string {
    const [year, month] = key.split('-');
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return `${meses[+month - 1]} ${year}`;
  }
}
