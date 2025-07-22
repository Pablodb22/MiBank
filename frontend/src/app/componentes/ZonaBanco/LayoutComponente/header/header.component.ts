import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  usuario: any = window.localStorage.getItem('usuario');

  constructor(private router: Router) {}
  
  irConfiguracion() {
    this.router.navigate(['/configuracion']);
  }
}