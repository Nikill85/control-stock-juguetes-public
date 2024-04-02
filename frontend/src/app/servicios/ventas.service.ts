import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  url: string = 'http://localhost:3000/ventas';
  constructor(
    private httpClient: HttpClient
  ) { }

  obtenerVentas() {
    return this.httpClient.get(this.url);
  }
}
