import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router'; // Si estás usando enrutamiento
import { provideHttpClient } from '@angular/common/http'; // <-- ¡Importa esto!

import { AppComponent } from './app/app.component'; // Tu componente raíz
import { routes } from './app/app.routes'; // Tu configuración de rutas (si aplica)

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Tus proveedores de enrutamiento (si aplica)
    provideHttpClient() // <-- ¡Añade esto! Esto proporciona HttpClient a nivel raíz
  ]
}).catch(err => console.error(err));