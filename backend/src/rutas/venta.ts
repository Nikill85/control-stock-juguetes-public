import express, { Request, Response } from 'express';
import sql, { ConnectionPool } from 'mssql';

const configuracionBD = {
    user: 'sa',
    password: 'nilda123_123',
    server: 'localhost\\SQLEXPRESS',
    database: 'control_stock_juguetes',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const pool: ConnectionPool = await sql.connect(configuracionBD);
        const result = await pool.request().query(`
        select Ventas.Fecha,
                Ventas.Id as VentaID,
                Ventas.ClienteID as ClienteID,
                Clientes.nombreApellido,
                Ventas.ProductoID,
                Productos.Descripcion,
                Ventas.Cantidad,
                Ventas.Total
        from Ventas
        inner join Clientes on clientes.id = Ventas.ClienteID
        inner join Productos on Productos.Id = Ventas.ProductoID`);
        res.json(result.recordset);
    } catch (e) {
        res.status(500).send({ error: e });
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const pool: ConnectionPool = await sql.connect(configuracionBD);
        //const { ClienteID, ProductoID, Cantidad, Total } = req.body;
        var ClienteID = req.body.ClienteID;
        var ProductoID = req.body.ProductoID;
        var Cantidad = req.body.Cantidad;
        var Total = req.body.Total;
        const result = await pool.request()
            .input('ClienteID', sql.Int, ClienteID)
            .input('ProductoID', sql.Int, ProductoID)
            .input('Cantidad', sql.Int, Cantidad)
            .input('Total', sql.Int, Total)
            .input('Fecha', sql.Date, new Date())
            .query(`INSERT INTO Ventas (ClienteID, ProductoID,Cantidad,Total,Fecha) 
                                VALUES (@ClienteID, @ProductoID, @Cantidad, @Total, @Fecha)`);
        res.send(result);
    } catch (e) {
        res.status(500).send({ error: e });
    }
});

router.put('/:id', async (req: Request, res: Response) => {

});

router.delete('/:id', async (req: Request, res: Response) => {

});

export default router;