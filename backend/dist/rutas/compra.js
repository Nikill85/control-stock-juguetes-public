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
router.get('/', async (req, res) => {
    try {
      const [rows] = await conexion.query('SELECT * FROM compras');
      res.send(rows);
    } catch (error) {
      console.error('Error al obtener las compras:', error);
      res.status(500).send({ error: 'Error al obtener las compras' });
    }
  });
// Crear una nueva compra
router.post('/', async (req, res) => {
    const { fecha_compra, fk_producto, cantidad, total_costoCompra } = req.body;
    try {
      await conexion.query('INSERT INTO compras (fecha_compra, fk_producto, cantidad, total_costoCompra) VALUES (?, ?, ?, ?)', [fecha_compra, fk_producto, cantidad, total_costoCompra]);
      res.status(201).send({ message: 'Compra creada correctamente' });
    } catch (error) {
      console.error('Error al crear la compra:', error);
      res.status(500).send({ error: 'Error al crear la compra' });
    }
  });
  
  // Actualizar una compra
  router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { fecha_compra, cantidad, total_costoCompra } = req.body;
    const fechaCompraFormatted = new Date(fecha_compra).toISOString().split('T')[0]; // Asegurarse de que la fecha sea en formato 'YYYY-MM-DD'
    try {
      await conexion.query('UPDATE compras SET fecha_compra = ?, cantidad = ?, total_costoCompra = ? WHERE id_compras = ?', [fechaCompraFormatted, cantidad, total_costoCompra, id]);
      res.send({ message: 'Compra actualizada correctamente' });
    } catch (error) {
      console.error('Error al actualizar la compra:', error);
      res.status(500).send({ error: 'Error al actualizar la compra' });
    }
  });
  
  // Eliminar una compra
  router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
      await conexion.query('DELETE FROM compras WHERE id_compras = ?', [id]);
      res.send({ message: 'Compra eliminada correctamente' });
    } catch (error) {
      console.error('Error al eliminar la compra:', error);
      res.status(500).send({ error: 'Error al eliminar la compra' });
    }
  });
  
  export default router;