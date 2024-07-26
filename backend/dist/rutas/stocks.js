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
        const [rows, fields] = yield conexion.execute('SELECT * FROM proyecto_final.stock');
        res.send(rows);
    }
    catch (error) {
        console.error('Error al obtener los stocks:', error);
        res.status(500).send({ error: 'Error al obtener los stocks' });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cantidad } = req.body;
    try {
        yield conexion.execute('INSERT INTO proyecto_final.stock (cantidad) VALUES (?)', [cantidad]);
        res.status(201).send({ message: 'Producto creado correctamente' });
    }
    catch (error) {
        console.error('Error al crear el stock:', error);
        res.status(500).send({ error: 'Error al crear el stock' });
    }
}));
router.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, cantidad } = req.body; // Acceder al id desde el cuerpo de la solicitud
    try {
        yield conexion.execute('UPDATE proyecto_final.stock SET cantidad = ? WHERE id_stock = ?', [cantidad, id]); // Asegúrate de utilizar el nombre correcto de la columna id_producto en tu tabla
        res.send({ message: 'Stock actualizado correctamente' });
    }
    catch (error) {
        console.error('Error al actualizar el stock:', error);
        res.status(500).send({ error: 'Error al actualizar el stock' });
    }
}));
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id; // Acceder al id desde el cuerpo de la solicitud
    try {
        yield conexion.execute('DELETE FROM proyecto_final.stock WHERE id_stock = ?', [id]);
        res.send({ message: 'Stock eliminado correctamente' });
    }
    catch (error) {
        console.error('Error al eliminar el stock:', error);
        res.status(500).send({ error: 'Error al eliminar el stock' });
    }
}));
exports.default = router;
