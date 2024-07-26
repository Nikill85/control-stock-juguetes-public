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
// Obtener todos los proveedores
router.get('/', async (req, res) => {
    try {
      const [rows] = await conexion.query('SELECT * FROM proveedores'); // Ajusta el nombre de la tabla si es necesario
      res.send(rows);
    } catch (error) {
      console.error('Error al obtener los proveedores:', error);
      res.status(500).send({ error: 'Error al obtener los proveedores' });
    }
  });
  
  // Crear un nuevo proveedor
  router.post('/', async (req, res) => {
    const { nombre, email, direccion, telefono } = req.body;
    try {
      await conexion.query('INSERT INTO proveedores (nombre, email, direccion, telefono) VALUES (?, ?, ?, ?)', [nombre, email, direccion, telefono]);
      res.status(201).send({ message: 'Proveedor creado correctamente' });
    } catch (error) {
      console.error('Error al crear el proveedor:', error);
      res.status(500).send({ error: 'Error al crear el proveedor' });
    }
  });
  
  // Actualizar un proveedor
  router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { nombre, email, direccion, telefono } = req.body;
    try {
      await conexion.query('UPDATE proveedores SET nombre = ?, email = ?, direccion = ?, telefono = ? WHERE id_proveedores = ?', [nombre, email, direccion, telefono, id]);
      res.send({ message: 'Proveedor actualizado correctamente' });
    } catch (error) {
      console.error('Error al actualizar el proveedor:', error);
      res.status(500).send({ error: 'Error al actualizar el proveedor' });
    }
  });
  
  // Eliminar un proveedor usando el ID en los parámetros de la URL
  router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
      await conexion.query('DELETE FROM proveedores WHERE id_proveedores = ?', [id]);
      res.send({ message: 'Proveedor eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el proveedor:', error);
      res.status(500).send({ error: 'Error al eliminar el proveedor' });
    }
  });
  
exports.default = router;
