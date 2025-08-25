import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core'; // 👈 Importa AfterViewInit
import { RouterModule, Router } from '@angular/router';
import { Collapse } from 'bootstrap';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements AfterViewInit { // 👈 Implementa AfterViewInit
  usuario: any = window.localStorage.getItem('usuario');

  constructor(private router: Router) {}

  irConfiguracion() {
    this.router.navigate(['/configuracion']);
  }

  // 👇 Aquí está el método que necesitas
  ngAfterViewInit() {
    // Inicializa el componente de colapso de Bootstrap
    const collapseElement = document.getElementById('mainNavbar');
    if (collapseElement) {
      new Collapse(collapseElement, {
        toggle: false, // Opcional: evita que se colapse al inicializar
      });
    }
  }
}