import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { MessageService } from 'src/app/servicios/message.service';
import * as _ from 'lodash';
import { Proveedor } from 'src/app/clases/proveedor.model';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {
  proveedores: Proveedor[];
  nuevoProveedor: Proveedor = new Proveedor();
  esEdit: boolean;
  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getProveedores();
  }

  getProveedores() {
    this.httpClient.get(`http://localhost:3000/proveedores`).subscribe((proveedores: Proveedor[]) => {
      console.log("PROVEEDORES: ", proveedores);
      this.proveedores = proveedores;
    });
  }
  crearProveedor() {
    this.httpClient.post(`http://localhost:3000/proveedores`, this.nuevoProveedor).subscribe((data: any) => {
      console.log(data);
      if (data.ProveedorID) {
        this.nuevoProveedor.id = data.ClienteID;
        this.proveedores.push(this.nuevoProveedor);
        this.nuevoProveedor = new Proveedor();
        this.messageService.automaticMessageOk(`Cliente agregado correctamente`);
      }
    });
  }
  actualizarProveedor() {

  }
  cancelarUpdate() {
    this.esEdit = false;
    this.nuevoProveedor = new Proveedor();
  }

  editarProveedor(proveedor) {
    this.nuevoProveedor.id =proveedor.id;
    this.nuevoProveedor.descripcion = proveedor.descripcion;
    this.nuevoProveedor.direccion = proveedor.direccion;
    this.esEdit = true;
  }
  eliminarProveedor(proveedor: Proveedor) {
    this.messageService.confirmMessage(``, `Seguro que desea eliminar el usuario ${proveedor.descripcion}`, `Eliminar`, `warning`)
      .then(r => {
        if (r.isConfirmed) {
          this.httpClient.delete(`http://localhost:3000/proveedores/${proveedor.id}`).subscribe((data: any) => {
            _.remove(this.proveedores, function (o) { return o.id == proveedor.id });
            console.log("DATA", data);
          });
        }
      })
  }
}
