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
        var query = `SELECT 
                        p.Id, 
                        p.Descripcion, 
                        p.Precio, 
                        p.TipoProducto as TipoProductoID, 
                        tp.descripcion as TipoProducto, 
                        s.Cantidad
                    FROM 
                        Productos p
                    LEFT JOIN 
                        Stocks s ON p.Id = s.ProductoID
                    INNER JOIN 
                        TipoProducto tp ON p.TipoProducto = tp.Id`;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (e) {
        res.send({ error: e })
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const pool: ConnectionPool = await sql.connect(configuracionBD);
        const { Descripcion, Precio, TipoProductoID } = req.body;
        const result = await pool.request()
            .input('descripcion', sql.VarChar, Descripcion)
            .input('precio', sql.Int, Precio)
            .input('tipoProducto', sql.Int, TipoProductoID)
            .query(`INSERT INTO Productos (descripcion, precio, tipoProducto) VALUES (@descripcion,@precio,@tipoProducto) SELECT SCOPE_IDENTITY() AS NuevoID`);
        res.json(result.recordset[0]);
    } catch (e) {
        res.send({ error: e });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const pool: ConnectionPool = await sql.connect(configuracionBD);
        const { Descripcion, Precio, TipoProductoID } = req.body;
        const id = req.params.id;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('descripcion', sql.VarChar, Descripcion)
            .input('precio', sql.Int, Precio)
            .input('tipoProducto', sql.Int, TipoProductoID)
            .query(`UPDATE Productos SET descripcion=@descripcion, precio=@precio, tipoProducto=@tipoProducto WHERE id=@id`);
        res.send(result);
    } catch (e) {
        res.status(500).send({ error: e });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        let id = req.params.id;
        const pool: ConnectionPool = await sql.connect(configuracionBD);
        const result = await pool.request().query(`DELETE Productos WHERE id=${id}`);
        res.json(result);
    } catch (e) {
        res.send({ error: e })
    }
});

export default router;