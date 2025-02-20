import { ProductoOrden } from './producto-orden.model';

export interface OrdenPago {
    idOrden?: number;
    estado: string;
    productos: ProductoOrden[];
    total: number;
}