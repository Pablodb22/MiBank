import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../LayoutComponente/header/header.component";
import { FooterComponent } from "../LayoutComponente/footer/footer.component";

interface Participante {
  id: number;
  nombre: string;
}

interface Gasto {
  id: number;
  descripcion: string;
  cantidad: number;
  pagadoPor: string;
  participantes: string[];
}

interface Balance {
  nombre: string;
  balance: number;
}

@Component({
  selector: 'app-grupo-componente',
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './grupo-componente.component.html',
  styleUrl: './grupo-componente.component.css'
})
export class GrupoComponenteComponent {
  
  nombreEvento: string = '';
  descripcionEvento: string = '';
  
  
  participantes: Participante[] = [];
  gastos: Gasto[] = [];
  balances: Balance[] = [];
  
 
  nuevoParticipante: string = '';
  nuevoGasto = {
    descripcion: '',
    cantidad: 0,
    pagadoPor: '',
    participantes: [] as string[]
  };
  
  
  mostrarFormulario: boolean = false;
  eventoCreado: boolean = false;
  vistaActual: 'participantes' | 'gastos' | 'balances' = 'participantes';

  crearEvento() {
    if (this.nombreEvento.trim()) {
      this.eventoCreado = true;
      this.mostrarFormulario = false;
    }
  }

 
  agregarParticipante() {
    if (this.nuevoParticipante.trim()) {
      const participante: Participante = {
        id: Date.now(),
        nombre: this.nuevoParticipante.trim()
      };
      this.participantes.push(participante);
      this.nuevoParticipante = '';
    }
  }

  eliminarParticipante(id: number) {
    this.participantes = this.participantes.filter(p => p.id !== id);
    this.calcularBalances();
  }

  
  agregarGasto() {
    if (this.nuevoGasto.descripcion.trim() && this.nuevoGasto.cantidad > 0 && 
        this.nuevoGasto.pagadoPor && this.nuevoGasto.participantes.length > 0) {
      
      const gasto: Gasto = {
        id: Date.now(),
        descripcion: this.nuevoGasto.descripcion.trim(),
        cantidad: this.nuevoGasto.cantidad,
        pagadoPor: this.nuevoGasto.pagadoPor,
        participantes: [...this.nuevoGasto.participantes]
      };
      
      this.gastos.push(gasto);
      this.limpiarFormularioGasto();
      this.calcularBalances();
    }
  }

  eliminarGasto(id: number) {
    this.gastos = this.gastos.filter(g => g.id !== id);
    this.calcularBalances();
  }

  limpiarFormularioGasto() {
    this.nuevoGasto = {
      descripcion: '',
      cantidad: 0,
      pagadoPor: '',
      participantes: []
    };
  }


  onParticipanteChange(nombre: string, event: any) {
    if (event.target.checked) {
      this.nuevoGasto.participantes.push(nombre);
    } else {
      this.nuevoGasto.participantes = this.nuevoGasto.participantes.filter(p => p !== nombre);
    }
  }

  isParticipanteSelected(nombre: string): boolean {
    return this.nuevoGasto.participantes.includes(nombre);
  }

 
  calcularBalances() {
    const balancesMap: { [nombre: string]: number } = {};
    
    this.participantes.forEach(p => {
      balancesMap[p.nombre] = 0;
    });
    
    this.gastos.forEach(gasto => {
      const cantidadPorPersona = gasto.cantidad / gasto.participantes.length;
            
      balancesMap[gasto.pagadoPor] += gasto.cantidad;
            
      gasto.participantes.forEach(participante => {
        balancesMap[participante] -= cantidadPorPersona;
      });
    });
   
    this.balances = Object.keys(balancesMap).map(nombre => ({
      nombre,
      balance: balancesMap[nombre]
    }));
  }

  getTotalGastos(): number {
    return this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
  }

  getGastoPorPersona(gasto: Gasto): number {
    return gasto.cantidad / gasto.participantes.length;
  }

  Math = Math;

  reiniciarEvento() {
    this.nombreEvento = '';
    this.descripcionEvento = '';
    this.participantes = [];
    this.gastos = [];
    this.balances = [];
    this.eventoCreado = false;
    this.vistaActual = 'participantes';
  }
}