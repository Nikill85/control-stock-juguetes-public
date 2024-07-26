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
// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
      const [rows] = await conexion.query('SELECT * FROM productos'); // Ajusta el nombre de la tabla si es necesario
      res.send(rows);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      res.status(500).send({ error: 'Error al obtener los productos' });
    }
  });
  
  // Crear un nuevo producto
  router.post('/', async (req, res) => {
    const { descripcion, precio, fk_tipoProducto } = req.body;
    try {
      await conexion.query('INSERT INTO productos (descripcion, precio, fk_tipoProducto) VALUES (?, ?, ?)', [descripcion, precio, fk_tipoProducto]);
      res.status(201).send({ message: 'Producto creado correctamente' });
    } catch (error) {
      console.error('Error al crear el producto:', error);
      res.status(500).send({ error: 'Error al crear el producto' });
    }
  });
  
  // Actualizar un producto
  router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { descripcion, precio } = req.body;
    try {
      await conexion.query('UPDATE productos SET descripcion = ?, precio = ? WHERE id_producto = ?', [descripcion, precio, id]);
      res.send({ message: 'Producto actualizado correctamente' });
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      res.status(500).send({ error: 'Error al actualizar el producto' });
    }
  });
  
  // Eliminar un producto usando el ID en el cuerpo de la solicitud
  router.delete('/', async (req, res) => {
    const id = req.body.id; // Acceder al id desde el cuerpo de la solicitud
    try {
      await conexion.query('DELETE FROM productos WHERE id_producto = ?', [id]);
      res.send({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      res.status(500).send({ error: 'Error al eliminar el producto' });
    }
  });
  
  // Eliminar un producto usando el ID en los parámetros de la URL
  router.delete('/:id', async (req, res) => {
    const id = req.params.id; // Acceder al id desde los parámetros de la URL
    try {
      await conexion.query('DELETE FROM productos WHERE id_producto = ?', [id]);
      res.send({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      res.status(500).send({ error: 'Error al eliminar el producto' });
    }
  });
  
  export default router;