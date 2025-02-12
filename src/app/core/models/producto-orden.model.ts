export interface ProductoOrden {
    id: number;
    productoNombre: string;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
    ordenDePago: any; // Ajustar si tienes la estructura correcta
    tipo: string;
    id_producto: number;
  }
  