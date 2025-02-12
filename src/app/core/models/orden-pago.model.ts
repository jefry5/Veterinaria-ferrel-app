import { ProductoOrden } from "./producto-orden.model";


export interface OrdenDePago {
  idOrden: number;
  total: number;
  productos: ProductoOrden[];
}
