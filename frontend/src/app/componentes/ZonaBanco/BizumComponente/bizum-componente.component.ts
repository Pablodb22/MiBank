import { Component } from '@angular/core';
import { FooterComponent } from "../LayoutComponente/footer/footer.component";
import { HeaderComponent } from "../LayoutComponente/header/header.component";
import { PopupBizumComponent } from "./popup-bizum/popup-bizum.component";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-bizum-componente',
  standalone: true,
  imports: [FooterComponent, HeaderComponent,PopupBizumComponent,CommonModule],
  templateUrl: './bizum-componente.component.html',
  styleUrl: './bizum-componente.component.css'
})
export class BizumComponenteComponent {

  mostrarPopup: boolean = false;

  mostrarPopupBizum() {
    console.log("first")
    this.mostrarPopup = true;
  }

  cerrarPopup() {
    this.mostrarPopup = false;
  }
}
