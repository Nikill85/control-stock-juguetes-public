import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/clases/producto.model';
import { TipoProducto } from 'src/app/clases/tipoProducto.model';
import { TipoProductoService } from 'src/app/servicios/tipo-producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  productos: Producto[];
  tipoProductos: TipoProducto[];
  producto: Producto = new Producto();
  esEdit: boolean; 
  constructor(
    private httpClient: HttpClient,
    private tipoProductoService: TipoProductoService
  ) { }

  ngOnInit(): void {
    this.getProducto();
    this.getTiposDeProducto();
  }

  getProducto() {
    this.httpClient.get('http://localhost:3000/producto').subscribe((productos: Producto[]) => {
      console.log(productos);
      this.productos = productos;
    });
  }

  getTiposDeProducto() {
    this.tipoProductoService.obtenerTiposDeProducto()
      .subscribe(respuesta_backend => {
        this.tipoProductos = respuesta_backend;
        console.log(this.tipoProductos);
      });
  }

  editarProducto(producto: Producto): void {
    this.producto.Cantidad = producto.Cantidad;
    this.producto.Id = producto.Id;
    this.producto.Descripcion = producto.Descripcion;
    this.producto.Precio = producto.Precio;
    this.producto.TipoProductoID = producto.TipoProductoID.toString();
    this.esEdit = true;
  }

  eliminarProducto(producto: Producto): void {

  }


  crearProducto() {
    this.httpClient.post('http://localhost:3000/producto', this.producto).subscribe(data => {
      console.log("insert prod", data);
    });
  }
  actualizarProducto() {
    this.httpClient.put(`http://localhost:3000/producto/${this.producto.Id}`, this.producto).subscribe(data => {
      console.log("insert prod", data);
    });
  }
  cancelarActualizar() {
    this.producto = new Producto();
    this.esEdit = false;
  }
}
