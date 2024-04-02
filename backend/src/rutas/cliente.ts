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
        const result = await pool.request().query(`SELECT * FROM Clientes`);
        res.json(result.recordset);
    } catch (e) {
        res.send({ error: e })
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const pool: ConnectionPool = await sql.connect(configuracionBD);
        const { nombreApellido, email, provincia, codigoPostal, direccion } = req.body;
        const result = await pool.request()
            .input('nom', sql.VarChar, nombreApellido)
            .input('email', sql.VarChar, email)
            .input('prov', sql.VarChar, provincia)
            .input('cp', sql.VarChar, codigoPostal)
            .input('dir', sql.VarChar, direccion)
            .query(`INSERT INTO Clientes (nombreApellido, email, provincia, codigoPostal, direccion) VALUES (@nom, @email,@prov,@cp,@dir) SELECT SCOPE_IDENTITY() AS ClienteID`);
        res.send(result.recordset[0]);
    } catch (e) {
        res.send({ error: e });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const pool: ConnectionPool = await sql.connect(configuracionBD);
        const { nombre, email, provincia, cp, direccion } = req.body;
        const id = req.params.id;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('nom', sql.VarChar, nombre)
            .input('email', sql.VarChar, email)
            .input('prov', sql.VarChar, provincia)
            .input('cp', sql.VarChar, cp)
            .input('dir', sql.VarChar, direccion)
            .query(`UPDATE Clientes SET nombreApellido=@nom, email=@email, provincia=@prov, codigoPostal=@cp, direccion=@dir WHERE id=@id`);
        res.send(result);
    } catch (e) {
        res.send({ error: e });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        let id = req.params.id;
        const pool: ConnectionPool = await sql.connect(configuracionBD);
        const result = await pool.request().query(`DELETE Clientes WHERE id=${id}`);
        res.json(result);
    } catch (e) {
        res.send({ error: e })
    }
});

export default router;