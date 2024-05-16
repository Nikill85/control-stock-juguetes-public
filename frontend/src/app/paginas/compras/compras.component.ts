import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Compra } from 'src/app/clases/compra.model';
import { Producto } from 'src/app/clases/producto.model';
import { CompraRequest } from 'src/app/clases/requests/compra.request';
import { TipoProducto } from 'src/app/clases/tipoProducto.model';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {
  compras: Compra[];
  tipoProductos: TipoProducto[];
  compraReq: CompraRequest = new CompraRequest();
  productos: Producto[];
  productoSelected: Producto = new Producto();
  existeProducto: boolean;
  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.buscarCompras();
     this.getProductos();
    this.getCompras();
  }

  getCompras() {
    this.httpClient.get('http://localhost:3000/compras').subscribe((compras:Compra[]) => {
      console.log(compras);
      this.compras = compras;
    });
  }
  getProductos() {
    this.httpClient.get('http://localhost:3000/producto').subscribe((productos: Producto[]) => {
      console.log("PRODUCTOS: ", productos);
      
      this.productos = productos;
    });
  }



  buscarCompras() {
    this.httpClient.get<Compra[]>('http://localhost:3000/compras/detalle').subscribe(compras => {
      console.log(compras);
      this.compras = compras;
    });
  }
  editarCompra(c: Compra) {

  }
  eliminarCompra(c: Compra) {

  }
  selectProduct(){
    console.log(this.productoSelected);
  }
}
