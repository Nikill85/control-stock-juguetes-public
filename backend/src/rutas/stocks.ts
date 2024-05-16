import express, { Request, Response } from 'express';
import mysql from 'mysql2/promise';

var conexion = mysql.createPool({
    host:'localhost',
    port:3306,
    user: 'root',
    password:'yduz2urogsgovg',
    database:'proyecto_final'
});


const router = express.Router();


router.get('/', async (req: Request, res: Response) => {
    try {
        const [rows, fields] = await conexion.execute('SELECT * FROM proyecto_final.stock');
        res.send(rows);
    } catch (error) {
        console.error('Error al obtener los stocks:', error);
        res.status(500).send({ error: 'Error al obtener los stocks' });
    }
});

router.post('/', async (req: Request, res: Response) => {
    const { cantidad } = req.body;
    try {
        await conexion.execute('INSERT INTO proyecto_final.stock (cantidad) VALUES (?)', [cantidad]);
        res.status(201).send({ message: 'Producto creado correctamente' });
    } catch (error) {
        console.error('Error al crear el stock:', error);
        res.status(500).send({ error: 'Error al crear el stock' });
    }

   
});

router.put('/', async (req: Request, res: Response) => {
    const { id, cantidad } = req.body; // Acceder al id desde el cuerpo de la solicitud
    try {
        await conexion.execute('UPDATE proyecto_final.stock SET cantidad = ? WHERE id_stock = ?', [cantidad,id]); // Asegúrate de utilizar el nombre correcto de la columna id_producto en tu tabla
        res.send({ message: 'Stock actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el stock:', error);
        res.status(500).send({ error: 'Error al actualizar el stock' });
    }
});


router.delete('/', async (req: Request, res: Response) => {
    const id = req.body.id; // Acceder al id desde el cuerpo de la solicitud
    try {
        await conexion.execute('DELETE FROM proyecto_final.stock WHERE id_stock = ?', [id]);
        res.send({ message: 'Stock eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el stock:', error);
        res.status(500).send({ error: 'Error al eliminar el stock' });
    }
});


   

export default router;