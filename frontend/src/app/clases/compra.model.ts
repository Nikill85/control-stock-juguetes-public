export class Compra {
    id_compras: number | undefined;
    fecha_compra: Date | undefined;
    fk_producto: number;
    cantidad: number | undefined;
    precio_costoUnitario: number | undefined;
    total_costoCompra: number | undefined;
     fk_proveedor: number | undefined;

    constructor() {

    }
}