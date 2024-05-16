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
        const [rows, fields] = await conexion.execute('SELECT * FROM proyecto_final.proveedores');
        res.send(rows);
    } catch (error) {
        console.error('Error al obtener los proveedores:', error);
        res.status(500).send({ error: 'Error al obtener los proveedores' });
    }
});

router.post('/', async (req: Request, res: Response) => {
    const { nombre,email,direccion,telefono } = req.body;
    try {
        await conexion.execute('INSERT INTO proyecto_final.proveedores (nombre,email, direccion,telefono) VALUES (?, ?, ?,?)', [nombre,email,direccion,telefono]);
        res.status(201).send({ message: 'Proveedor creado correctamente' });
    } catch (error) {
        console.error('Error al crear el proveedor:', error);
        res.status(500).send({ error: 'Error al crear el pproveedor' });
    }

   
});

router.put('/', async (req: Request, res: Response) => {
    const { id,nombre,email,direccion,telefono } = req.body; // Acceder al id desde el cuerpo de la solicitud
    try {
        await conexion.execute('UPDATE proyecto_final.proveedores SET nombre = ?, email= ?,direccion =?,telefono = ? WHERE id_proveedores = ?', [nombre,email,direccion,telefono ,id]); // Asegúrate de utilizar el nombre correcto de la columna id_producto en tu tabla
        res.send({ message: 'Proveedor actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el proveedor:', error);
        res.status(500).send({ error: 'Error al actualizar el proveedor' });
    }
});


// router.delete('/', async (req: Request, res: Response) => {
//     const id = req.body.id; // Acceder al id desde el cuerpo de la solicitud
//     try {
//         await conexion.execute('DELETE FROM proyecto_final.proveedor WHERE id_proveedor = ?', [id]);
//         res.send({ message: 'Proveedor eliminado correctamente' });
//     } catch (error) {
//         console.error('Error al eliminar el proveedor:', error);
//         res.status(500).send({ error: 'Error al eliminar el proveedor' });
//     }
// });

router.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id; // Acceder al id desde los parámetros de la URL
    try {
        await conexion.execute('DELETE FROM proyecto_final.proveedores WHERE id_proveedores = ?', [id]);
        res.send({ message: 'Proveedor eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el proveedor:', error);
        res.status(500).send({ error: 'Error al eliminar el proveedor' });
    }
});

   

export default router;