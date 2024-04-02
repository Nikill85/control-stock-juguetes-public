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
        const result = await pool.request().query(`SELECT * FROM TipoProducto`);
        res.json(result.recordset);
    } catch (e) {
        res.send({ error: e })
    }
});
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        let id = req.params.id;
        const pool: ConnectionPool = await sql.connect(configuracionBD);
        const result = await pool.request().query(`DELETE TipoProducto WHERE id=${id}`);
        res.json(result);
    } catch (e) {
        res.send({ error: e })
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const pool: ConnectionPool = await sql.connect(configuracionBD);
        var descripcion = req.body.Descripcion;
        const result = await pool.request()
            .input('desc', sql.VarChar, descripcion)
            .query(`INSERT INTO TipoProducto (descripcion) VALUES (@desc)`);
        res.send(result);
    } catch (e) {
        res.send({ error: e });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const pool: ConnectionPool = await sql.connect(configuracionBD);
        let id = req.params.id;
        var descripcion = req.body.Descripcion;
        const result = await pool.request()
            .input('desc', sql.VarChar, descripcion)
            .input('id', sql.Int, id)
            .query(`UPDATE TipoProducto SET descripcion=@desc WHERE id=@id`);
        res.send(result);
    } catch (e) {
        res.send({ error: e });
    }
});

export default router;