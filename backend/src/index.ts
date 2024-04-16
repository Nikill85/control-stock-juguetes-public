import express from 'express';
import * as _ from 'lodash';
import cors from 'cors';

import tipoProd from './rutas/tipoProducto';

import productos from './rutas/producto';
import stock from './rutas/stocks';
import compras from './rutas/compra';
import ventas from './rutas/venta';
import proveedores from './rutas/proveedores';

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3000);
app.use('/tipoProducto', tipoProd);
app.use('/proveedores', proveedores);
app.use('/productos', productos);
app.use('/stock', stock);
app.use('/compras', compras);
app.use('/ventas', ventas);


console.log("El servidor esta levantado en el puerto: 3000");