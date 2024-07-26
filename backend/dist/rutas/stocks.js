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
// Obtener todos los stocks
router.get('/', async (req, res) => {
    try {
      const [rows] = await conexion.query('SELECT * FROM stock'); // Ajusta el nombre de la tabla si es necesario
      res.send(rows);
    } catch (error) {
      console.error('Error al obtener los stocks:', error);
      res.status(500).send({ error: 'Error al obtener los stocks' });
    }
  });
  
  // Crear un nuevo stock
  router.post('/', async (req, res) => {
    const { cantidad } = req.body;
    try {
      await conexion.query('INSERT INTO stock (cantidad) VALUES (?)', [cantidad]);
      res.status(201).send({ message: 'Stock creado correctamente' });
    } catch (error) {
      console.error('Error al crear el stock:', error);
      res.status(500).send({ error: 'Error al crear el stock' });
    }
  });
  
  // Actualizar un stock
  router.put('/', async (req, res) => {
    const { id, cantidad } = req.body; // Acceder al id desde el cuerpo de la solicitud
    try {
      await conexion.query('UPDATE stock SET cantidad = ? WHERE id_stock = ?', [cantidad, id]);
      res.send({ message: 'Stock actualizado correctamente' });
    } catch (error) {
      console.error('Error al actualizar el stock:', error);
      res.status(500).send({ error: 'Error al actualizar el stock' });
    }
  });
  
  // Eliminar un stock
  router.delete('/', async (req, res) => {
    const { id } = req.body; // Acceder al id desde el cuerpo de la solicitud
    try {
      await conexion.query('DELETE FROM stock WHERE id_stock = ?', [id]);
      res.send({ message: 'Stock eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el stock:', error);
      res.status(500).send({ error: 'Error al eliminar el stock' });
    }
  });
  
exports.default = router;
