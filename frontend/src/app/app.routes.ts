import { Routes } from '@angular/router';
import { LayoutComponent } from './componentes/ZonaBanco/LayoutComponente/layout/layout.component';
import { LoginComponenteComponent } from './componentes/ZonaPersonal/login-componente/login-componente.component';
import { RegistroComponenteComponent } from './componentes/ZonaPersonal/registro-componente/registro-componente.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponenteComponent },
  { path: 'registro', component: RegistroComponenteComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      // aquí tus rutas protegidas o de la app principal
      // { path: 'dashboard', component: DashboardComponent },
      // { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];