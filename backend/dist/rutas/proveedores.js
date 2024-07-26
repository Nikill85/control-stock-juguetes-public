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
        const [rows, fields] = yield conexion.execute('SELECT * FROM proyecto_final.proveedores');
        res.send(rows);
    }
    catch (error) {
        console.error('Error al obtener los proveedores:', error);
        res.status(500).send({ error: 'Error al obtener los proveedores' });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email, direccion, telefono } = req.body;
    try {
        yield conexion.execute('INSERT INTO proyecto_final.proveedores (nombre,email, direccion,telefono) VALUES (?, ?, ?,?)', [nombre, email, direccion, telefono]);
        res.status(201).send({ message: 'Proveedor creado correctamente' });
    }
    catch (error) {
        console.error('Error al crear el proveedor:', error);
        res.status(500).send({ error: 'Error al crear el pproveedor' });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { nombre, email, direccion, telefono } = req.body; // Acceder al id desde el cuerpo de la solicitud
    try {
        yield conexion.execute('UPDATE proyecto_final.proveedores SET nombre = ?, email= ?,direccion =?,telefono = ? WHERE id_proveedores = ?', [nombre, email, direccion, telefono, id]); // Asegúrate de utilizar el nombre correcto de la columna id_producto en tu tabla
        res.send({ message: 'Proveedor actualizado correctamente' });
    }
    catch (error) {
        console.error('Error al actualizar el proveedor:', error);
        res.status(500).send({ error: 'Error al actualizar el proveedor' });
    }
}));
// router.delete('/', async (req: Request, res: Response) => {
//     const id = req.body.id; // Acceder al id desde el cuerpo de la solicitud
//     try {
//         await conexion.execute('DELETE FROM proyecto_final.proveedor WHERE id_proveedor = ?', [id]);
//         res.send({ message: 'Proveedor eliminado correctamente' });
//     } catch (error) {
//         console.error('Error al eliminar el proveedor:', error);
//         res.status(500).send({ error: 'Error al eliminar el proveedor' });
//     }
// });
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id; // Acceder al id desde los parámetros de la URL
    try {
        yield conexion.execute('DELETE FROM proyecto_final.proveedores WHERE id_proveedores = ?', [id]);
        res.send({ message: 'Proveedor eliminado correctamente' });
    }
    catch (error) {
        console.error('Error al eliminar el proveedor:', error);
        res.status(500).send({ error: 'Error al eliminar el proveedor' });
    }
}));
exports.default = router;
