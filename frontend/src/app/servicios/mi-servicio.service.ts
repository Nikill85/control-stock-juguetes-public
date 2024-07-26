

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';  // Asegúrate de que la ruta es correcta

@Injectable({
  providedIn: 'root'
})
export class MiServicioService {

  private apiUrl = environment.apiUrl; // Usa la URL del entorno

  constructor(private http: HttpClient) { }

  // Método para obtener datos desde un endpoint específico
  obtenerDatos(endpoint: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`);
  }

  // Ejemplo de métodos específicos para tus endpoints
  obtenerProductos(): Observable<any> {
    return this.obtenerDatos('productos'); // Reemplaza 'productos' con tu endpoint real
  }

  obtenerVentas(): Observable<any> {
    return this.obtenerDatos('ventas'); // Reemplaza 'ventas' con tu endpoint real
  }

  obtenerProveedores(): Observable<any> {
    return this.obtenerDatos('proveedores'); // Reemplaza 'proveedores' con tu endpoint real
  }
}

