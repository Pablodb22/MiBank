import { Component } from '@angular/core';
import { FooterComponent } from "../LayoutComponente/footer/footer.component";
import { HeaderComponent } from "../LayoutComponente/header/header.component";

@Component({
  selector: 'app-bizum-componente',
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './bizum-componente.component.html',
  styleUrl: './bizum-componente.component.css'
})
export class BizumComponenteComponent {

}
