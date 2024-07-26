"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const tipoProducto_1 = __importDefault(require("./rutas/tipoProducto"));
const stocks_1 = __importDefault(require("./rutas/stocks"));
const compra_1 = __importDefault(require("./rutas/compra"));
const venta_1 = __importDefault(require("./rutas/venta"));
const proveedores_1 = __importDefault(require("./rutas/proveedores"));
const producto_1 = __importDefault(require("./rutas/producto"));
// import allItems from './allItems'
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3000);
app.use('/tipoProducto', tipoProducto_1.default);
app.use('/proveedor', proveedores_1.default);
app.use('/producto', producto_1.default);
app.use('/stocks', stocks_1.default);
app.use('/compras', compra_1.default);
app.use('/ventas', venta_1.default);
console.log("El servidor esta levantado en el puerto: 3000");
// app.use('/',  allItems)
