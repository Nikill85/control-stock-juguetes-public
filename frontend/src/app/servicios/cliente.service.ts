import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url = `http://localhost:3000/clientes`;
  constructor(private httpClient: HttpClient) { }

  getClientes() {
    return this.httpClient.get(this.url);
  }
}