import { Component } from '@angular/core';
import { FooterComponent } from "../LayoutComponente/footer/footer.component";
import { HeaderComponent } from "../LayoutComponente/header/header.component";
import { PopupBizumComponent } from "./popup-bizum/popup-bizum.component";
import { CommonModule } from '@angular/common';
import { RestTiendaService } from '../../../servicios/rest-tienda.service';
@Component({
  selector: 'app-bizum-componente',
  standalone: true,
  imports: [FooterComponent, HeaderComponent,PopupBizumComponent,CommonModule],
  templateUrl: './bizum-componente.component.html',
  styleUrl: './bizum-componente.component.css'
})
export class BizumComponenteComponent {

  mostrarPopup: boolean = false;
  usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  presupuestoRestante:number=0

  constructor(private restTiendaService:RestTiendaService) { }

  mostrarPopupBizum() {
    this.restTiendaService.EncontrarCuentaPorId(this.usuario.id).subscribe(
      (response:any) => {
        const cuenta = response;
        this.presupuestoRestante = cuenta.reduce((acc:number, t:any) => acc + t.transaccion, 0);
        console.log("Cuenta encontrada:", cuenta);
        console.log("Presupuesto restante:", this.presupuestoRestante);
      }
    );
    if(this.presupuestoRestante<=0){
      alert("No tienes saldo suficiente para realizar un Bizum.");
      return;
    }
    else{
      console.log("first")
      this.mostrarPopup = true;
    }    
  }

  cerrarPopup() {
    this.mostrarPopup = false;
  }
}
