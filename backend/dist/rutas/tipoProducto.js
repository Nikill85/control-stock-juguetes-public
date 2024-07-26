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

// Obtener todos los tipos de productos
router.get('/', async (req, res) => {
    try {
      const [rows] = await conexion.query('SELECT * FROM tipo_producto'); // Ajusta el nombre de la tabla si es necesario
      res.send(rows);
    } catch (error) {
      console.error('Error al obtener los tipos de productos:', error);
      res.status(500).send({ error: 'Error al obtener los tipos de productos' });
    }
  });
  
  // Crear un nuevo tipo de producto
  router.post('/', async (req, res) => {
    const { descripcion } = req.body;
    try {
      await conexion.query('INSERT INTO tipo_producto (descripcion) VALUES (?)', [descripcion]);
      res.status(201).send({ message: 'Tipo de Producto creado correctamente' });
    } catch (error) {
      console.error('Error al crear el Tipo de Producto:', error);
      res.status(500).send({ error: 'Error al crear el Tipo de Producto' });
    }
  });
  
  // Actualizar un tipo de producto
  router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { descripcion } = req.body;
    try {
      await conexion.query('UPDATE tipo_producto SET descripcion = ? WHERE id_tipo_producto = ?', [descripcion, id]);
      res.send({ message: 'Descripción actualizada correctamente' });
    } catch (error) {
      console.error('Error al actualizar el tipo de producto:', error);
      res.status(500).send({ error: 'Error al actualizar el tipo de producto' });
    }
  });
  
  // Eliminar un tipo de producto
  router.delete('/:id', async (req, res) => {
    const id = req.params.id; // Acceder al id desde los parámetros de la URL
    try {
      await conexion.query('DELETE FROM tipo_producto WHERE id_tipo_producto = ?', [id]);
      res.send({ message: 'Tipo producto eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el Tipo de Producto:', error);
      res.status(500).send({ error: 'Error al eliminar el Tipo de Producto' });
    }
  });
exports.default = router;
