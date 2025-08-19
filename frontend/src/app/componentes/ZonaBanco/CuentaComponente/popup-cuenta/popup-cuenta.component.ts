import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup-cuenta',
  templateUrl: './popup-cuenta.component.html',
  styleUrl: './popup-cuenta.component.css'
})
export class PopupCuentaComponent {
  @Input() tipo: 'gasto' | 'ingreso' = 'gasto';
  @Output() cerrar = new EventEmitter<void>();

  cerrarPopup() {
    this.cerrar.emit();
  }
}
