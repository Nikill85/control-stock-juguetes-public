import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venta } from '../clases/venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  url: string = 'http://localhost:3000/ventas';
  constructor(
    private httpClient: HttpClient
  ) { }

  obtenerVentas() {
    return this.httpClient.get<Venta[]>(this.url);
  }
  crearVenta(venta: Venta) {
    return this.httpClient.post<any>(this.url, venta);
  }
  
  editarVenta(editarOnuevaVenta: Venta){
    console.log('Enviando solicitud PUT para editar:',editarOnuevaVenta);
    return this.httpClient.put(`${this.url}/${editarOnuevaVenta.id_ventas}`, editarOnuevaVenta)
  }
  eliminarVenta(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

}
