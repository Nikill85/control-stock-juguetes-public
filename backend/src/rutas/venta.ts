import express, { Request, Response } from 'express';
import mysql from 'mysql2/promise';

var conexion = mysql.createPool({
    host:'localhost',
    port:3306,
    user: 'root',
    password:'yduz2uro',
    database:'proyecto_final'
});


const router = express.Router();


router.get('/', async (req: Request, res: Response) => {
    try {
        const [rows, fields] = await conexion.execute('SELECT * FROM proyecto_final.ventas');
        res.send(rows);
    } catch (error) {
        console.error('Error al obtener las ventas:', error);
        res.status(500).send({ error: 'Error al obtener las ventas' });
    }
});

router.post('/', async (req: Request, res: Response) => {
    const {fecha_venta,cantidad,total_venta } = req.body;
    try {
        await conexion.execute('INSERT INTO proyecto_final.ventas (fecha_venta,cantidad,total_venta) VALUES (?,?,?)', [fecha_venta,cantidad,total_venta]);
        res.status(201).send({ message: 'Venta creada correctamente' });
    } catch (error) {
        console.error('Error al crear la venta:', error);
        res.status(500).send({ error: 'Error al crear la venta' });
    }

   
});

router.put('/', async (req: Request, res: Response) => {
    const { id, fecha_venta,cantidad,total_venta } = req.body; // Acceder al id desde el cuerpo de la solicitud
    try {
        await conexion.execute('UPDATE proyecto_final.ventas SET fecha_venta = ?, cantidad = ?, total_venta = ? WHERE id_ventas = ?', [fecha_venta,cantidad,total_venta,id]); // Asegúrate de utilizar el nombre correcto de la columna id_producto en tu tabla
        res.send({ message: 'Descripcion actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar la venta:', error);
        res.status(500).send({ error: 'Error al actualizar la venta' });
    }
});


router.delete('/', async (req: Request, res: Response) => {
    const id = req.body.id; // Acceder al id desde el cuerpo de la solicitud
    try {
        await conexion.execute('DELETE FROM proyecto_final.ventas WHERE id_ventas = ?', [id]);
        res.send({ message: 'Venta eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la venta:', error);
        res.status(500).send({ error: 'Error al eliminar la venta' });
    }
});


   

export default router;