import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  url = `http://localhost:3000/proveedores`;
  constructor(private httpClient: HttpClient) { }

  getProveedores() {
    return this.httpClient.get(this.url);
  }
}