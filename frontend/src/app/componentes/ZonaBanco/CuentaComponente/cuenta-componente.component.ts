import { Component } from '@angular/core';
import { HeaderComponent } from "../LayoutComponente/header/header.component";
import { FooterComponent } from "../LayoutComponente/footer/footer.component";

@Component({
  selector: 'app-cuenta-componente',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './cuenta-componente.component.html',
  styleUrl: './cuenta-componente.component.css'
})
export class CuentaComponenteComponent {

}
