import { Routes } from '@angular/router';
import { LayoutComponent } from './componentes/ZonaBanco/LayoutComponente/layout/layout.component';
import { LoginComponenteComponent } from './componentes/ZonaPersonal/login-componente/login-componente.component';
import { RegistroComponenteComponent } from './componentes/ZonaPersonal/registro-componente/registro-componente.component';
import { ConfiguracionUsuarioComponent } from './componentes/ZonaPersonal/configuracion-usuario-component/configuracion-usuario-component.component';
import { CuentaComponenteComponent } from './componentes/ZonaBanco/CuentaComponente/cuenta-componente.component';
import { BizumComponenteComponent } from './componentes/ZonaBanco/BizumComponente/bizum-componente.component';
import { GrupoComponenteComponent } from './componentes/ZonaBanco/GrupoComponente/grupo-componente.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponenteComponent },
  { path: 'registro', component: RegistroComponenteComponent },
  { path: '',component: LayoutComponent},
  { path: 'configuracion', component: ConfiguracionUsuarioComponent },
  {path:'cuenta',component:CuentaComponenteComponent},
  {path:'bizum',component:BizumComponenteComponent},
  {path:'grupo',component:GrupoComponenteComponent}
 
  

 
   
];