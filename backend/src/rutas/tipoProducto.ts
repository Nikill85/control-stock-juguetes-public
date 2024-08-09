import express, { Request, Response } from 'express';
import mysql from 'mysql2/promise';

var conexion = mysql.createPool({
 
});


const router = express.Router();


router.get('/', async (req: Request, res: Response) => {
    try {
        const [rows, fields] = await conexion.execute('SELECT * FROM proyecto_final.tipo_producto');
        res.send(rows);
    } catch (error) {
        console.error('Error al obtener los tipos de productos:', error);
        res.status(500).send({ error: 'Error al obtener los tipos de productos' });
    }
});

router.post('/', async (req: Request, res: Response) => {
    const {descripcion } = req.body;
    try {
        await conexion.execute('INSERT INTO proyecto_final.tipo_producto (descripcion) VALUES (?)', [descripcion]);
        res.status(201).send({ message: 'Tipo de Producto creado correctamente' });
    } catch (error) {
        console.error('Error al crear el Tipo de Producto:', error);
        res.status(500).send({ error: 'Error al crear el Tipo de Producto' });
    }

   
});

router.put('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const { descripcion } = req.body;

    try {
        await conexion.execute('UPDATE proyecto_final.tipo_producto SET descripcion = ? WHERE id_tipo_producto = ?', [descripcion, id]);
        res.send({ message: 'Descripción actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar el tipo de producto:', error);
        res.status(500).send({ error: 'Error al actualizar el tipo de producto' });
    }
});


// router.delete('/', async (req: Request, res: Response) => {
//     const id = req.body.id; // Acceder al id desde el cuerpo de la solicitud
//     try {
//         await conexion.execute('DELETE FROM proyecto_final.tipo_producto WHERE id_tipo_producto = ?', [id]);
//         res.send({ message: 'Tipo de producto eliminado correctamente' });
//     } catch (error) {
//         console.error('Error al eliminar el tipo de producto:', error);
//         res.status(500).send({ error: 'Error al eliminar el tipo de producto' });
//     }
// });
router.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id; // Acceder al id desde los parámetros de la URL
    try {
        await conexion.execute('DELETE FROM proyecto_final.tipo_producto WHERE id_tipo_producto = ?', [id]);
        res.send({ message: 'Tipo producto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el Tipo de Producto:', error);
        res.status(500).send({ error: 'Error al eliminar el Tipo de Producto' });
    }
});





   

export default router;