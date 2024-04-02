import express, { Request, Response } from 'express';
import sql, { ConnectionPool } from 'mssql';

const configuracionBD = {
    user: 'sa',
    password: 'nilda123_123',
    server: 'localhost\\SQLEXPRESS',
    database: 'control_stock_juguete',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const pool: ConnectionPool = await sql.connect(configuracionBD);
        const result = await pool.request().query(`SELECT * FROM Compras`);
        res.json(result.recordset);
    } catch (e) {
        res.send({ error: e })
    }
});
router.get('/detalle', async (req: Request, res: Response) => {
    try {
        const pool: ConnectionPool = await sql.connect(configuracionBD);
        let query = `select c.CompraID as Id,
                            c.FechaCompra, 
                            p.Descripcion,
                            p.TipoProducto as TipoProductoID,
                            tp.descripcion as TipoProducto,
                            c.PrecioU,
                            c.Cantidad,
                            (c.PrecioU * c.Cantidad) as Total,
                            (c.PrecioU * 1.3) as Precio_Sugerido
                    from Compras c, Productos p, TipoProducto tp
                    where c.ProductoID = p.Id
                    and p.TipoProducto = tp.id`;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (e) {
        res.send({ error: e })
    }
});


router.post('/', async (req: Request, res: Response) => {
    try {
        const pool: ConnectionPool = await sql.connect(configuracionBD);
        const { productoID, cantidad, precioU } = req.body;
        const result = await pool.request()
            .input('fecha', sql.Date, new Date())
            .input('productoID', sql.Int, productoID)
            .input('cantidad', sql.Int, cantidad)
            .input('precioU', sql.Int, precioU)
            .query(`INSERT INTO Compras (FechaCompra, ProductoID, Cantidad, PrecioU) VALUES (@fecha, @productoID, @cantidad, @precioU)`);
        res.send(result);
    } catch (e) {
        res.send({ error: e });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const pool: ConnectionPool = await sql.connect(configuracionBD);
        const { productoID, cantidad, precioU } = req.body;
        const id = req.params.id;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('productoID', sql.Int, productoID)
            .input('cantidad', sql.Int, cantidad)
            .input('precioU', sql.Int, precioU)
            .query(`UPDATE Compras SET ProductoID=@productoID, cantidad=@cantidad, precioU=@precioU WHERE compraID=@id`);
        res.send(result);
    } catch (e) {
        res.send({ error: e });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        let id = req.params.id;
        const pool: ConnectionPool = await sql.connect(configuracionBD);
        const result = await pool.request().query(`DELETE Compras WHERE compraID=${id}`);
        res.json(result);
    } catch (e) {
        res.send({ error: e })
    }
});

router.post('/nuevaCompra', async (req: Request, res: Response) => {
    try {
        const { descripcion, precioU, tipoProducto, cantidad } = req.body;
        var precio = precioU * 1.3;
        const pool: ConnectionPool = await sql.connect(configuracionBD);
        const resultProd = await pool.request()
            .input('descripcion', sql.VarChar, descripcion)
            .input('precio', sql.Int, precio)
            .input('tipoProducto', sql.Int, tipoProducto)
            .query(`INSERT INTO Productos (descripcion, precio, tipoProducto) VALUES (@descripcion,@precio,@tipoProducto) SELECT SCOPE_IDENTITY() AS NuevoID`);

        var productoID = resultProd.recordset[0].NuevoID;

        const resultCompra = await pool.request()
            .input('fecha', sql.Date, new Date())
            .input('productoID', sql.Int, productoID)
            .input('cantidad', sql.Int, cantidad)
            .input('precioU', sql.Int, precioU)
            .query(`INSERT INTO Compras (FechaCompra, ProductoID, Cantidad, PrecioU) VALUES (@fecha, @productoID, @cantidad, @precioU)`);

        const resultStock = await pool.request()
            .input('productoID', sql.Int, productoID)
            .input('cantidad', sql.Int, cantidad)
            .query(`INSERT INTO Stocks (productoID, cantidad) VALUES (@productoID,@cantidad)`);

        res.send({ mensaje: 'Alta ok', obj: { prod: resultProd, compra: resultCompra, stock: resultStock } });

    } catch (e) {
        res.status(500).send({ error: e })
    }
});


router.post('/reposicion', async (req: Request, res: Response) => {
    try {
        const { productoID, precioU, cantidad, cantStock } = req.body;
        var nuevoPrecio = precioU * 1.3;
        var nuevaCant = cantidad + cantStock;
        const pool: ConnectionPool = await sql.connect(configuracionBD);
        const resultProd = await pool.request()
            .input('nuevoPrecio', sql.Int, nuevoPrecio)
            .input('productoID', sql.Int, productoID)
            .query(`UPDATE PRODUCTOS SET precio=@nuevoPrecio WHERE id=@productoID`);

        const resultCompra = await pool.request()
            .input('fecha', sql.Date, new Date())
            .input('productoID', sql.Int, productoID)
            .input('cantidad', sql.Int, cantidad)
            .input('precioU', sql.Int, precioU)
            .query(`INSERT INTO Compras (FechaCompra, ProductoID, Cantidad, PrecioU) VALUES (@fecha, @productoID, @cantidad, @precioU)`);

        const resultStock = await pool.request()
            .input('productoID', sql.Int, productoID)
            .input('nuevaCant', sql.Int, nuevaCant)
            .query(`UPDATE Stocks SET Cantidad=@nuevaCant WHERE ProductoID=@productoID`);

        res.send({ mensaje: 'Alta ok', obj: { prod: resultProd, compra: resultCompra, stock: resultStock } });

    } catch (e) {
        res.send({ error: e })
    }
});

export default router;