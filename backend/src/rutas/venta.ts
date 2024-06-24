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
        const [rows, fields] = await conexion.execute('SELECT * FROM proyecto_final.ventas');
        res.send(rows);
    } catch (error) {
        console.error('Error al obtener las ventas:', error);
        res.status(500).send({ error: 'Error al obtener las ventas' });
    }
});

// router.post('/', async (req: Request, res: Response) => {
//     const {fecha_venta,cantidad,total_venta } = req.body;
//     try {
//         await conexion.execute('INSERT INTO proyecto_final.ventas (fecha_venta,cantidad,total_venta) VALUES (?,?,?)', [fecha_venta,cantidad,total_venta]);
//         res.status(201).send({ message: 'Venta creada correctamente' });
//     } catch (error) {
//         console.error('Error al crear la venta:', error);
//         res.status(500).send({ error: 'Error al crear la venta' });
//     }

   
// });
router.post('/', async (req: Request, res: Response) => {
    const { fecha_venta, fk_producto, cantidad, total_venta } = req.body;
    try {
        await conexion.execute('INSERT INTO proyecto_final.ventas (fecha_venta, fk_producto, cantidad, total_venta) VALUES (?, ?, ?,?)', [fecha_venta, fk_producto, cantidad, total_venta]);
        res.status(201).send({ message: 'Venta creada correctamente' });
    } catch (error) {
        console.error('Error al crear la venta:', error);
        res.status(500).send({ error: 'Error al crear la venta' });
    }

   
});


router.put('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const {  fecha_venta,cantidad,total_venta} = req.body;

    // Asegurarse de que la fecha sea en formato 'YYYY-MM-DD'
    const fechaCompraFormatted = new Date(fecha_venta).toISOString().split('T')[0];

    try {
        await conexion.execute(
            'UPDATE proyecto_final.ventas SET fecha_venta = ?, cantidad = ?,  total_venta = ? WHERE id_ventas = ?',
            [fechaCompraFormatted, cantidad, total_venta, id]
        );
        res.send({ message: 'venta actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar la venta:', error);
        res.status(500).send({ error: 'Error al actualizar la venta' });
    }
});


// router.delete('/', async (req: Request, res: Response) => {
//     const id = req.body.id; // Acceder al id desde el cuerpo de la solicitud
//     try {
//         await conexion.execute('DELETE FROM proyecto_final.ventas WHERE id_ventas = ?', [id]);
//         res.send({ message: 'Venta eliminada correctamente' });
//     } catch (error) {
//         console.error('Error al eliminar la venta:', error);
//         res.status(500).send({ error: 'Error al eliminar la venta' });
//     }
// });
router.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id; 
    try {
        await conexion.execute('DELETE FROM proyecto_final.ventas WHERE id_ventas = ?', [id]);
        res.send({ message: 'Venta eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la venta:', error);
        res.status(500).send({ error: 'Error al eliminar la venta' });
    }

});


   

export default router;