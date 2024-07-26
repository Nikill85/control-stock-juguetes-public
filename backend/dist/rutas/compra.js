"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promise_1 = __importDefault(require("mysql2/promise"));
var conexion = promise_1.default.createPool({
    host: 'sql10.freesqldatabase.com',
  user: 'sql10722194',
  password: 'En87q3H7Fd',
  database: 'sql10722194',
  port: 3306,
});
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows, fields] = yield conexion.execute('SELECT * FROM proyecto_final.compras');
        res.send(rows);
    }
    catch (error) {
        console.error('Error al obtener las compras:', error);
        res.status(500).send({ error: 'Error al obtener las compras' });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fecha_compra, fk_producto, cantidad, total_costoCompra } = req.body;
    try {
        yield conexion.execute('INSERT INTO proyecto_final.compras (fecha_compra, fk_producto, cantidad, total_costoCompra) VALUES (?, ?, ?,?)', [fecha_compra, fk_producto, cantidad, total_costoCompra]);
        res.status(201).send({ message: 'compra creada correctamente' });
    }
    catch (error) {
        console.error('Error al crear la compra:', error);
        res.status(500).send({ error: 'Error al crear la compra' });
    }
}));
// router.put('/:id', async (req: Request, res: Response) => {
//     const id = req.params.id;
//     const {  fecha_compra, cantidad,precio_costoUnitario, total_costoCompra } = req.body; // Acceder al id desde el cuerpo de la solicitud
//     try {
//         await conexion.execute('UPDATE proyecto_final.compras SET fecha_compra = ?, cantidad = ?, precio_costoUnitario = ?, total_costoCompra = ? WHERE id_compras = ?', [fecha_compra, cantidad,precio_costoUnitario, total_costoCompra,id]); // Asegúrate de utilizar el nombre correcto de la columna id_producto en tu tabla
//         res.send({ message: 'Compra actualizada correctamente' });
//     } catch (error) {
//         console.error('Error al actualizar la compra:', error);
//         res.status(500).send({ error: 'Error al actualizar la compra' });
//     }
// });
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { fecha_compra, cantidad, total_costoCompra } = req.body;
    // Asegurarse de que la fecha sea en formato 'YYYY-MM-DD'
    const fechaCompraFormatted = new Date(fecha_compra).toISOString().split('T')[0];
    try {
        yield conexion.execute('UPDATE proyecto_final.compras SET fecha_compra = ?, cantidad = ?,  total_costoCompra = ? WHERE id_compras = ?', [fechaCompraFormatted, cantidad, total_costoCompra, id]);
        res.send({ message: 'Compra actualizada correctamente' });
    }
    catch (error) {
        console.error('Error al actualizar la compra:', error);
        res.status(500).send({ error: 'Error al actualizar la compra' });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield conexion.execute('DELETE FROM proyecto_final.compras WHERE id_compras = ?', [id]);
        res.send({ message: 'Compra eliminada correctamente' });
    }
    catch (error) {
        console.error('Error al eliminar la compra:', error);
        res.status(500).send({ error: 'Error al eliminar el producto' });
    }
}));
exports.default = router;
