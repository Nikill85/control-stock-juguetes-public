import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './paginas/error404/error404.component';
import { ClientesComponent } from './paginas/clientes/clientes.component';
import { ProductoComponent } from './paginas/producto/producto.component';
import { TipoProductoComponent } from './componentes/tipo-producto/tipo-producto.component';
import { ConfiguracionComponent } from './paginas/configuracion/configuracion.component';
import { ComprasComponent } from './paginas/compras/compras.component';
import { StockComponent } from './paginas/stock/stock.component';
import { VentasComponent } from './paginas/ventas/ventas.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'jugueteria',
    pathMatch: 'full'
  },
  
  {
    path: 'clientes',
    component: ClientesComponent
  },
  {
    path: 'productos',
    component: ProductoComponent
  },
  {
    path: 'configuracion',
    component: ConfiguracionComponent
  },
  {
    path: 'compras',
    component: ComprasComponent
  },
  {
    path: 'ventas',
    component: VentasComponent
  },
  {
    path: 'stock',
    component: StockComponent
  },
  {
    path: "**",
    component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
