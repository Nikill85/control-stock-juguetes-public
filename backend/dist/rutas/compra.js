import express from 'express';
import mysql from 'mysql2/promise';  // Importa mysql2/promise para usar promesas

require('dotenv').config(); // Cargar variables de entorno

// Configura la conexión a la base de datos usando las credenciales proporcionadas
const pool = mysql.createPool({
  host: 'sql10.freesqldatabase.com',
  user: 'sql10722194',
  password: 'En87q3H7Fd',
  database: 'sql10722194',
  port: 3306,
});

const router = express.Router();

// Ruta para obtener todas las compras
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM compras');
    res.send(rows);
  } catch (error) {
    console.error('Error al obtener las compras:', error);
    res.status(500).send({ error: 'Error al obtener las compras' });
  }
});

// Ruta para crear una nueva compra
router.post('/', async (req, res) => {
  const { fecha_compra, fk_producto, cantidad, total_costoCompra } = req.body;
  try {
    await pool.query('INSERT INTO compras (fecha_compra, fk_producto, cantidad, total_costoCompra) VALUES (?, ?, ?, ?)', 
                     [fecha_compra, fk_producto, cantidad, total_costoCompra]);
    res.status(201).send({ message: 'Compra creada correctamente' });
  } catch (error) {
    console.error('Error al crear la compra:', error);
    res.status(500).send({ error: 'Error al crear la compra' });
  }
});

// Ruta para actualizar una compra
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { fecha_compra, cantidad, total_costoCompra } = req.body;
  const fechaCompraFormatted = new Date(fecha_compra).toISOString().split('T')[0];
  try {
    await pool.query('UPDATE compras SET fecha_compra = ?, cantidad = ?, total_costoCompra = ? WHERE id_compras = ?', 
                     [fechaCompraFormatted, cantidad, total_costoCompra, id]);
    res.send({ message: 'Compra actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar la compra:', error);
    res.status(500).send({ error: 'Error al actualizar la compra' });
  }
});

// Ruta para eliminar una compra
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM compras WHERE id_compras = ?', [id]);
    res.send({ message: 'Compra eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la compra:', error);
    res.status(500).send({ error: 'Error al eliminar la compra' });
  }
});

export default router;
