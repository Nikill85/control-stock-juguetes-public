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

// Obtener todas las ventas
router.get('/', async (req, res) => {
    try {
      const [rows] = await conexion.query('SELECT * FROM ventas'); // Ajusta el nombre de la tabla si es necesario
      res.send(rows);
    } catch (error) {
      console.error('Error al obtener las ventas:', error);
      res.status(500).send({ error: 'Error al obtener las ventas' });
    }
  });
  
  // Crear una nueva venta
  router.post('/', async (req, res) => {
    const { fecha_venta, fk_producto, cantidad, total_venta } = req.body;
    try {
      await conexion.query('INSERT INTO ventas (fecha_venta, fk_producto, cantidad, total_venta) VALUES (?, ?, ?, ?)', [fecha_venta, fk_producto, cantidad, total_venta]);
      res.status(201).send({ message: 'Venta creada correctamente' });
    } catch (error) {
      console.error('Error al crear la venta:', error);
      res.status(500).send({ error: 'Error al crear la venta' });
    }
  });
  
  // Actualizar una venta existente
  router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { fecha_venta, cantidad, total_venta } = req.body;
    // Asegurarse de que la fecha sea en formato 'YYYY-MM-DD'
    const fechaVentaFormatted = new Date(fecha_venta).toISOString().split('T')[0];
    try {
      await conexion.query('UPDATE ventas SET fecha_venta = ?, cantidad = ?, total_venta = ? WHERE id_ventas = ?', [fechaVentaFormatted, cantidad, total_venta, id]);
      res.send({ message: 'Venta actualizada correctamente' });
    } catch (error) {
      console.error('Error al actualizar la venta:', error);
      res.status(500).send({ error: 'Error al actualizar la venta' });
    }
  });
  
  // Eliminar una venta existente
  router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
      await conexion.query('DELETE FROM ventas WHERE id_ventas = ?', [id]);
      res.send({ message: 'Venta eliminada correctamente' });
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
      res.status(500).send({ error: 'Error al eliminar la venta' });
    }
  });
exports.default = router;
