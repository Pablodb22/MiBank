import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RestClienteService {
  constructor(private http: HttpClient) {}

  RegistroCliente(datos: any): Observable<any> {
    console.log(datos) //--> si llega el objeto con los datos del formulario
    return this.http.post('http://localhost:3000/Cliente', datos, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  LoginCliente(datos:any): Observable<any> {
    console.log(datos) //--> si llega el objeto con los datos del formulario
    return this.http.post('http://localhost:3000/Cliente/Login', datos);
  }

  AñadirIban(datos: any): Observable<any> {
   
    return this.http.post('http://localhost:3000/Cliente/AnadirIban',datos);
  }

}