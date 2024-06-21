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
        const [rows, fields] = await conexion.execute('SELECT * FROM proyecto_final.compras');
        res.send(rows);
    } catch (error) {
        console.error('Error al obtener las compras:', error);
        res.status(500).send({ error: 'Error al obtener las compras' });
    }
});
router.post('/', async (req: Request, res: Response) => {
    const { fecha_compra, fk_producto, cantidad, precio_costoUnitario, total_costoCompra } = req.body;
  
    // Verifica que todos los campos requeridos estén presentes y definidos
    if (!fecha_compra || !fk_producto || !cantidad || !precio_costoUnitario || !total_costoCompra) {
      return res.status(400).send({ error: 'Faltan campos requeridos para crear la compra' });
    }
  
    try {
      await conexion.execute(
        'INSERT INTO proyecto_final.compras (fecha_compra, cantidad, fk_producto, precio_costoUnitario, total_costoCompra) VALUES ( ?, ?, ?, ?, ?)',
        [fecha_compra, cantidad, fk_producto, precio_costoUnitario, total_costoCompra]
      );
      res.status(201).send({ message: 'Compra creada correctamente' });
    } catch (error) {
      console.error('Error al crear la compra:', error);
      res.status(500).send({ error: 'Error al crear la compra' });
    }
  });

  

// router.put('/:id', async (req: Request, res: Response) => {
//     const id = req.params.id;
//     const {  fecha_compra, cantidad,precio_costoUnitario, total_costoCompra } = req.body; // Acceder al id desde el cuerpo de la solicitud
//     try {
//         await conexion.execute('UPDATE proyecto_final.compras SET fecha_compra = ?, cantidad = ?, precio_costoUnitario = ?, total_costoCompra = ? WHERE id_compras = ?', [fecha_compra, cantidad,precio_costoUnitario, total_costoCompra,id]); // Asegúrate de utilizar el nombre correcto de la columna id_producto en tu tabla
//         res.send({ message: 'Compra actualizada correctamente' });
//     } catch (error) {
//         console.error('Error al actualizar la compra:', error);
//         res.status(500).send({ error: 'Error al actualizar la compra' });
//     }
// });
router.put('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const { fecha_compra, cantidad, precio_costoUnitario, total_costoCompra } = req.body;

    // Asegurarse de que la fecha sea en formato 'YYYY-MM-DD'
    const fechaCompraFormatted = new Date(fecha_compra).toISOString().split('T')[0];

    try {
        await conexion.execute(
            'UPDATE proyecto_final.compras SET fecha_compra = ?, cantidad = ?, precio_costoUnitario = ?, total_costoCompra = ? WHERE id_compras = ?',
            [fechaCompraFormatted, cantidad, precio_costoUnitario, total_costoCompra, id]
        );
        res.send({ message: 'Compra actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar la compra:', error);
        res.status(500).send({ error: 'Error al actualizar la compra' });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id; 
    try {
        await conexion.execute('DELETE FROM proyecto_final.compras WHERE id_compras = ?', [id]);
        res.send({ message: 'Compra eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la compra:', error);
        res.status(500).send({ error: 'Error al eliminar el producto' });
    }

});


   

export default router;