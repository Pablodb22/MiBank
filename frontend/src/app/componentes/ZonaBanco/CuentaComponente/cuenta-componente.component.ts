import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../LayoutComponente/header/header.component";
import { FooterComponent } from "../LayoutComponente/footer/footer.component";
import { PopupCuentaComponent } from './popup-cuenta/popup-cuenta.component';

@Component({
  selector: 'app-cuenta-componente',
  standalone: true, 
  imports: [CommonModule, HeaderComponent, FooterComponent, PopupCuentaComponent],
  templateUrl: './cuenta-componente.component.html',
  styleUrl: './cuenta-componente.component.css'
})
export class CuentaComponenteComponent {
  mostrarPopup = false;
  tipoMovimiento: 'gasto' | 'ingreso' = 'gasto';

  abrirPopup(tipo: 'gasto' | 'ingreso') {
    console.log("abriendo popup de tipo:", tipo);
    this.tipoMovimiento = tipo;
    this.mostrarPopup = true;
  }

  cerrarPopup() {
    this.mostrarPopup = false;
  }
}
