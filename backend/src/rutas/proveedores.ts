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
        const result = await pool.request().query(`SELECT * FROM Proveedores`);
        res.json(result.recordset);
    } catch (e) {
        res.send({ error: e })
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const pool: ConnectionPool = await sql.connect(configuracionBD);
        const { nombre, direccion } = req.body;
        const result = await pool.request()
            .input('nom', sql.VarChar, nombre)
        
            .input('dir', sql.VarChar, direccion)
            .query(`INSERT INTO Proveedores (nombre,direccion) VALUES (@nom, @dir) SELECT SCOPE_IDENTITY() AS ProveedoresID`);
        res.send(result.recordset[0]);
    } catch (e) {
        res.send({ error: e });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const pool: ConnectionPool = await sql.connect(configuracionBD);
        const { nombre,direccion } = req.body;
        const id = req.params.id;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('nom', sql.VarChar, nombre)
        
            .input('dir', sql.VarChar, direccion)
            .query(`UPDATE Proveedores SET nombreApellido=@nom, direccion=@dir WHERE id=@id`);
        res.send(result);
    } catch (e) {
        res.send({ error: e });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        let id = req.params.id;
        const pool: ConnectionPool = await sql.connect(configuracionBD);
        const result = await pool.request().query(`DELETE Proveedores WHERE id=${id}`);
        res.json(result);
    } catch (e) {
        res.send({ error: e })
    }
});

export default router;