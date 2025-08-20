import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RestTiendaService {
  constructor(private http: HttpClient) {}

 EncontrarCuentaPorId(id: number): Observable<any> {
  return this.http.get('http://localhost:3000/Tienda/Cuenta', {
    params: { id: id.toString() },
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  });
}

AñadirTransaccion(transaccion: any): Observable<any> {
  return this.http.post('http://localhost:3000/Tienda/Transaccion', transaccion, {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  });
}


}