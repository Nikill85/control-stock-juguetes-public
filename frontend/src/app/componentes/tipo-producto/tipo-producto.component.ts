import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { TipoProducto } from 'src/app/clases/tipoProducto.model';
import { TipoProductoService } from 'src/app/servicios/tipo-producto.service';

@Component({
  selector: 'app-tipo-producto',
  templateUrl: './tipo-producto.component.html',
  styleUrls: ['./tipo-producto.component.scss']
})
export class TipoProductoComponent implements OnInit {

  constructor(private tipoProductoService: TipoProductoService) { }
  tipoProductos: TipoProducto[] = new Array<TipoProducto>();

  editarOnuevoTipoProducto: TipoProducto = new TipoProducto();

  estoyEditando: boolean;

  ngOnInit(): void {
    this.obtenerTiposDeProducto();
  }

  obtenerTiposDeProducto() {
    this.tipoProductoService.obtenerTiposDeProducto()
      .subscribe(respuesta_backend => {
        this.tipoProductos = respuesta_backend;
        console.log(this.tipoProductos);
      });
  }

  agregarTipo() {
    this.tipoProductoService.agregarTipo(this.editarOnuevoTipoProducto)
      .subscribe(respuesta => {
        console.log(respuesta);
        this.obtenerTiposDeProducto();
      });
  }

  eliminarTipo(tipoProd: TipoProducto) {
    this.tipoProductoService.eliminarTipo(tipoProd)
      .subscribe(respuesta => {
        console.log(respuesta);
        this.obtenerTiposDeProducto();
      });
  }

  editarTipo(tipoProd: TipoProducto) {
    console.log(tipoProd);
    this.estoyEditando = true;
    this.editarOnuevoTipoProducto = tipoProd;
  }
  salvarEdicion() {
    this.estoyEditando = false;
    this.tipoProductoService.editarTipoProducto(this.editarOnuevoTipoProducto)
      .subscribe(respuesta => {
        console.log(respuesta);
      });
  }
  cancelarEdicion() {
    this.estoyEditando = false;
    this.editarOnuevoTipoProducto = new TipoProducto();
  }
}