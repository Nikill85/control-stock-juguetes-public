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
        const result = await pool.request().query(`SELECT * FROM Stocks`);
        res.json(result.recordset);
    } catch (e) {
        res.send({ error: e })
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const pool: ConnectionPool = await sql.connect(configuracionBD);
        const { productoID, cantidad } = req.body;
        const result = await pool.request()
            .input('productoID', sql.Int, productoID)
            .input('cantidad', sql.Int, cantidad)
            .query(`INSERT INTO Stocks (productoID, cantidad) VALUES (@productoID,@cantidad)`);
        res.send(result);
    } catch (e) {
        res.send({ error: e });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const pool: ConnectionPool = await sql.connect(configuracionBD);
        const { productoID, cantidad } = req.body;
        const id = req.params.id;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('productoID', sql.Int, productoID)
            .input('cantidad', sql.Int, cantidad)
            .query(`UPDATE Stocks SET productoID=@productoID, cantidad=@cantidad WHERE stockID=@id`);
        res.send(result);
    } catch (e) {
        res.send({ error: e });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        let id = req.params.id;
        const pool: ConnectionPool = await sql.connect(configuracionBD);
        const result = await pool.request().query(`DELETE Stocks WHERE stockID=${id}`);
        res.json(result);
    } catch (e) {
        res.send({ error: e })
    }
});

export default router;