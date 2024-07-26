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
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'yduz2urogsgovg',
    database: 'proyecto_final'
});
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows, fields] = yield conexion.execute('SELECT * FROM proyecto_final.ventas');
        res.send(rows);
    }
    catch (error) {
        console.error('Error al obtener las ventas:', error);
        res.status(500).send({ error: 'Error al obtener las ventas' });
    }
}));
// router.post('/', async (req: Request, res: Response) => {
//     const {fecha_venta,cantidad,total_venta } = req.body;
//     try {
//         await conexion.execute('INSERT INTO proyecto_final.ventas (fecha_venta,cantidad,total_venta) VALUES (?,?,?)', [fecha_venta,cantidad,total_venta]);
//         res.status(201).send({ message: 'Venta creada correctamente' });
//     } catch (error) {
//         console.error('Error al crear la venta:', error);
//         res.status(500).send({ error: 'Error al crear la venta' });
//     }
// });
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fecha_venta, fk_producto, cantidad, total_venta } = req.body;
    try {
        yield conexion.execute('INSERT INTO proyecto_final.ventas (fecha_venta, fk_producto, cantidad, total_venta) VALUES (?, ?, ?,?)', [fecha_venta, fk_producto, cantidad, total_venta]);
        res.status(201).send({ message: 'Venta creada correctamente' });
    }
    catch (error) {
        console.error('Error al crear la venta:', error);
        res.status(500).send({ error: 'Error al crear la venta' });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { fecha_venta, cantidad, total_venta } = req.body;
    // Asegurarse de que la fecha sea en formato 'YYYY-MM-DD'
    const fechaCompraFormatted = new Date(fecha_venta).toISOString().split('T')[0];
    try {
        yield conexion.execute('UPDATE proyecto_final.ventas SET fecha_venta = ?, cantidad = ?,  total_venta = ? WHERE id_ventas = ?', [fechaCompraFormatted, cantidad, total_venta, id]);
        res.send({ message: 'venta actualizada correctamente' });
    }
    catch (error) {
        console.error('Error al actualizar la venta:', error);
        res.status(500).send({ error: 'Error al actualizar la venta' });
    }
}));
// router.delete('/', async (req: Request, res: Response) => {
//     const id = req.body.id; // Acceder al id desde el cuerpo de la solicitud
//     try {
//         await conexion.execute('DELETE FROM proyecto_final.ventas WHERE id_ventas = ?', [id]);
//         res.send({ message: 'Venta eliminada correctamente' });
//     } catch (error) {
//         console.error('Error al eliminar la venta:', error);
//         res.status(500).send({ error: 'Error al eliminar la venta' });
//     }
// });
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield conexion.execute('DELETE FROM proyecto_final.ventas WHERE id_ventas = ?', [id]);
        res.send({ message: 'Venta eliminada correctamente' });
    }
    catch (error) {
        console.error('Error al eliminar la venta:', error);
        res.status(500).send({ error: 'Error al eliminar la venta' });
    }
}));
exports.default = router;
