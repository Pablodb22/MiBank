import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-popup-bizum',
  imports: [],
  templateUrl: './popup-bizum.component.html',
  styleUrl: './popup-bizum.component.css'
})
export class PopupBizumComponent {
  @Output()cerrar=new EventEmitter<void>();

  cerrarPopup() {
    this.cerrar.emit();
  }
}
