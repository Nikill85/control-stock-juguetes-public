import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = 'http://localhost:3000/producto';
  constructor(private httpClient: HttpClient) { }

  crearProducto(producto: any) {
    return this.httpClient.post(this.url, producto);
  }
  getProductos() {
    return this.httpClient.get(this.url);
  }
}
