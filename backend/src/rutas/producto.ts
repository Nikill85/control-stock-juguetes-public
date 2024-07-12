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
        const [rows, fields] = await conexion.execute('SELECT * FROM proyecto_final.productos');
        res.send(rows);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).send({ error: 'Error al obtener los productos' });
    }
});


router.post('/', async (req: Request, res: Response) => {
    const { descripcion, precio, fk_tipoProducto } = req.body;
    try {
        await conexion.execute('INSERT INTO proyecto_final.productos (descripcion, precio, fk_tipoProducto) VALUES (?, ?, ?)', [descripcion, precio, fk_tipoProducto]);
        res.status(201).send({ message: 'Producto creado correctamente' });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).send({ error: 'Error al crear el producto' });
    }

   
});

router.put('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const { descripcion, precio } = req.body;

    try {
        await conexion.execute('UPDATE proyecto_final.productos SET descripcion = ?, precio = ? WHERE id_producto = ?', [descripcion, precio, id]);
        res.send({ message: 'Descripción actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).send({ error: 'Error al actualizar el producto' });
    }
});


router.delete('/', async (req: Request, res: Response) => {
    const id = req.body.id; // Acceder al id desde el cuerpo de la solicitud
    try {
        await conexion.execute('DELETE FROM proyecto_final.productos WHERE id_producto = ?', [id]);
        res.send({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).send({ error: 'Error al eliminar el producto' });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id; // Acceder al id desde los parámetros de la URL
    try {
        await conexion.execute('DELETE FROM proyecto_final.productos WHERE id_producto = ?', [id]);
        res.send({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el producto', error);
        res.status(500).send({ error: 'Error al eliminar el producto' });
    }
});


   

export default router;