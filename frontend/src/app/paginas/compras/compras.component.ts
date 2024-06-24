import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/servicios/message.service';
import { Compra } from 'src/app/clases/compra.model';
import { Producto } from 'src/app/clases/producto.model';
import { CompraRequest } from 'src/app/clases/requests/compra.request';
import { TipoProducto } from 'src/app/clases/tipoProducto.model';
import { ComprasService } from 'src/app/servicios/compras.service';
import { ProductoService } from 'src/app/servicios/producto.service';



@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {
  compras: Compra[];
  productos: Producto[];
  productoSelected: Producto = new Producto();
  existeProducto: boolean = false; // Inicializado en false por defecto
  compraReq: CompraRequest = new CompraRequest();
  compra: Compra = new Compra();
  copiaCompra: Compra = new Compra();
  estoyEditando: boolean;
  editarOnuevaCompra: Compra = new Compra();
  Compra: Compra[] = new Array<Compra>();

  productoSeleccionado: Producto;
  totalCompra: number;


  constructor(private httpClient: HttpClient, private messageService: MessageService,private comprasService: ComprasService, private productoService: ProductoService) {}

  ngOnInit(): void {
    this.getCompras();
    this.getProductos();
  }

  getCompras() {
    this.httpClient.get<Compra[]>('http://localhost:3000/compras').subscribe(
      (compras: Compra[]) => {
        console.log(compras);
        this.compras = compras;
      },
      (error) => {
        console.error('Error al obtener las compras:', error);
      }
    );
  }

  getProductos() {
    this.httpClient.get<Producto[]>('http://localhost:3000/producto').subscribe(
      (productos: Producto[]) => {
        console.log('PRODUCTOS:', productos);
        this.productos = productos;
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }
  

  crearCompra() {
    // Asegurarse de que los campos de compraReq no sean undefined
    if (!this.compraReq.fecha_compra) {
      this.compraReq.fecha_compra = null; // Si fecha_compra es undefined, establecerla como null
    }
  
    this.httpClient.post<any>('http://localhost:3000/compras', this.compraReq).subscribe(
      (response) => {
        console.log(response);
        this.getCompras(); // Actualizar la lista de compras después de crear una nueva compra
        this.resetForm(); // Limpiar el formulario después de la creación exitosa
      },
      (error) => {
        console.error('Error al crear la compra:', error);
      }
    );
  }

  // Método para limpiar el formulario y reiniciar los valores
  resetForm() {
    this.compraReq = new CompraRequest();
    this.productoSelected = new Producto();
    this.existeProducto = false;
  }

  // Método para calcular el total de la compra basado en cantidad y precio unitario
  calcularTotal() {  if (this.productoSeleccionado && this.compraReq.cantidad) {
    this.compraReq.total_costoCompra = this.productoSeleccionado.precio * this.compraReq.cantidad;
    this.totalCompra = this.compraReq.total_costoCompra; // Actualizar totalCompra para mostrar en el formulario
  } else {
    this.compraReq.total_costoCompra = null;
    this.totalCompra = null;
  }
 
  }


  // getProductoDescripcion(idProducto: number): string {
  //   const Producto = this.productos.find(p => p.id_producto === idProducto);
  //   return Producto ? Producto.descripcion : '';
  // }
  getProductoDescripcion(idProducto: number): string {
    if (this.productos && this.productos.length > 0) {
      const producto = this.productos.find(p => p.id_producto === idProducto);
      return producto ? producto.descripcion : 'Descripción no disponible';
    } else {
      return 'Descripción no disponible';
    }
  }
  eliminarCompra(compra: Compra) {
    this.messageService.confirmMessage(``, `Seguro que desea eliminar al tipo de producto: ${compra.id_compras}`, `Eliminar`, `warning`)
      .then(r => {
        if (r.isConfirmed) {
          this.eliminarCo(compra.id_compras); 
        }
      });
  }
  
  eliminarCo(id: number) {
    this.comprasService.eliminarCompra(id)
      .subscribe(respuesta => {
        console.log(respuesta);
        this.getCompras();
      });

      
  }
  editarCompra(com: Compra) {
    
    this.estoyEditando = true;
    this.compraReq.id_compras = com.id_compras;
    this.compraReq.fecha_compra = com.fecha_compra;
    this.compraReq.fk_producto = com.fk_producto;
    this.compraReq.cantidad = com.cantidad;
    this.productoSeleccionado = this.productos.find(p => p.id_producto === com.fk_producto);
    this.calcularTotal();
    
  }
  salvarEdicion() {
    this.comprasService.editarCompra(this.compraReq).subscribe(
      data => {
        console.log('Compra actualizada:', data);
        this.getCompras(); // Actualizar lista de compras después de la edición
        this.resetForm(); // Limpiar formulario después de la edición exitosa
        this.estoyEditando = false; // Salir del modo de edición
      },
      error => {
        console.error('Error al actualizar la compra:', error);
      }
    );
  }
  
 cancelarEdicion() {
    this.compra = new Compra();
    this.estoyEditando = false;
  }


  cal(){
   
    this.compraReq.fk_producto = this.productoSeleccionado.id_producto;
  }
  
  }
  
  

