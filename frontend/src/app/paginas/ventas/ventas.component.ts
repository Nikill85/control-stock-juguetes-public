import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/clases/proveedor.model';
import { Producto } from 'src/app/clases/producto.model';
import { VentaRequest } from 'src/app/clases/requests/venta.request';
import { Venta } from 'src/app/clases/venta.model';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { VentasService } from 'src/app/servicios/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
  ventaRequest: VentaRequest = new VentaRequest();
  productoSelected: Producto;
  ventas: Venta[];
  ven:  Venta = new Venta()
  productos: Producto[];

  constructor(
    private ventasService: VentasService,
    private proveedoresService: ProveedoresService,
    private productoService: ProductoService) { }

  ngOnInit(): void {
    this.getVentas();
   
    this.getProductos();
  }
  getVentas() {
    this.ventasService.obtenerVentas().subscribe((ventas: Venta[]) => {
      console.log("VENTAS", ventas);
      this.ventas = ventas;
    });
  }
  getProductos() {
    this.productoService.getProductos().subscribe((productos: Producto[]) => {
      this.productos = productos;
      console.log("PRODUCTOS", productos);
    });
  }



  nuevaVenta(){
    console.log(this.ventaRequest);
  }

  calcularTotal(){
    console.log(this.productoSelected);
    this.ventaRequest.ProductoID = this.productoSelected.id_producto;
  }
  metodoEjemplo(evt){
    console.log(evt);
  }
}