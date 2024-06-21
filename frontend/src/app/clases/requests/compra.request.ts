
  export class CompraRequest {
    id_compras: number;
    fecha_compra: string; 
    cantidad: number;
    precio_costoUnitario: number;
    total_costoCompra: number;
    fk_producto: number;
    fk_proveedor: number | null;
  
    constructor() {
      this.fecha_compra = ''; 
      this.cantidad = 0; 
      this.precio_costoUnitario = 0; 
      this.total_costoCompra = 0; 
      this.fk_producto = 0; 
      this.fk_proveedor = null; 
    }
  }
  