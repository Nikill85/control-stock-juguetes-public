import express from 'express';
import * as _ from 'lodash';
import cors from 'cors';

import tipoProd from './rutas/tipoProducto';
import stock from './rutas/stocks';
import compras from './rutas/compra';
import ventas from './rutas/venta';
import proveedores from './rutas/proveedores';
import producto from './rutas/producto';
// import allItems from './allItems'



const app = express();
app.use(express.json());
app.use(cors());

app.listen(3000);
app.use('/tipoProducto', tipoProd);
app.use('/proveedor', proveedores);
app.use('/producto', producto);
app.use('/stocks', stock);
app.use('/compras', compras);
app.use('/ventas', ventas);



console.log("El servidor esta levantado en el puerto: 3000");

// app.use('/',  allItems)

