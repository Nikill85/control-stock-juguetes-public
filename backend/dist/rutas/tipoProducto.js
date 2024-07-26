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
        const [rows, fields] = yield conexion.execute('SELECT * FROM proyecto_final.tipo_producto');
        res.send(rows);
    }
    catch (error) {
        console.error('Error al obtener los tipos de productos:', error);
        res.status(500).send({ error: 'Error al obtener los tipos de productos' });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { descripcion } = req.body;
    try {
        yield conexion.execute('INSERT INTO proyecto_final.tipo_producto (descripcion) VALUES (?)', [descripcion]);
        res.status(201).send({ message: 'Tipo de Producto creado correctamente' });
    }
    catch (error) {
        console.error('Error al crear el Tipo de Producto:', error);
        res.status(500).send({ error: 'Error al crear el Tipo de Producto' });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { descripcion } = req.body;
    try {
        yield conexion.execute('UPDATE proyecto_final.tipo_producto SET descripcion = ? WHERE id_tipo_producto = ?', [descripcion, id]);
        res.send({ message: 'Descripción actualizada correctamente' });
    }
    catch (error) {
        console.error('Error al actualizar el tipo de producto:', error);
        res.status(500).send({ error: 'Error al actualizar el tipo de producto' });
    }
}));
// router.delete('/', async (req: Request, res: Response) => {
//     const id = req.body.id; // Acceder al id desde el cuerpo de la solicitud
//     try {
//         await conexion.execute('DELETE FROM proyecto_final.tipo_producto WHERE id_tipo_producto = ?', [id]);
//         res.send({ message: 'Tipo de producto eliminado correctamente' });
//     } catch (error) {
//         console.error('Error al eliminar el tipo de producto:', error);
//         res.status(500).send({ error: 'Error al eliminar el tipo de producto' });
//     }
// });
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id; // Acceder al id desde los parámetros de la URL
    try {
        yield conexion.execute('DELETE FROM proyecto_final.tipo_producto WHERE id_tipo_producto = ?', [id]);
        res.send({ message: 'Tipo producto eliminado correctamente' });
    }
    catch (error) {
        console.error('Error al eliminar el Tipo de Producto:', error);
        res.status(500).send({ error: 'Error al eliminar el Tipo de Producto' });
    }
}));
exports.default = router;
