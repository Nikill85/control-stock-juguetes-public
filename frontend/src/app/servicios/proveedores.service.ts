import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProveedoresComponent } from '../paginas/proveedores/proveedores.component';
import { Proveedor } from '../clases/proveedor.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  // url = `http://localhost:3000/proveedor`;
  private url = `${environment.apiUrl}/proveedor`; // Usa la URL del entorno
  
  constructor(private httpClient: HttpClient) { }

  getProveedores() {
    return this.httpClient.get(this.url);
  }

  editProveedor(proveedor){
    return this.httpClient.put(`${this.url}/${proveedor.id_proveedores}`, proveedor)
  }
  eliminarProveedor(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  // Método para crear un nuevo proveedor
  crearProveedor(proveedor: Proveedor): Observable<any> {
    return this.httpClient.post(this.url, proveedor);
  }
}