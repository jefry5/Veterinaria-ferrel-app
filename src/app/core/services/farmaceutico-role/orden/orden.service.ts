import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductoOrden } from '@core/models/producto-orden.model';
import { OrdenPago } from '@core/models/orden-pago.model';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  private BASE_URL: string = '';

  constructor(private http: HttpClient) {
    this.BASE_URL = environment.url;
  }

  seleccionarProducto(idProducto: number, cantidad: number): Observable<string> {
    return this.http.post(`${this.BASE_URL}/api/ordenes/seleccionar?idProducto=${idProducto}&cantidad=${cantidad}`, {}, { responseType: 'text' });
  }

  listarProductosSeleccionados(): Observable<ProductoOrden[]> {
    return this.http.get<ProductoOrden[]>(`${this.BASE_URL}/api/ordenes/productos-seleccionados`);
  }

  confirmarOrden(orden: OrdenPago): Observable<OrdenPago> {
    return this.http.post<OrdenPago>(`${this.BASE_URL}/api/ordenes/confirmar`, orden);
  }

  listarOrdenes(): Observable<OrdenPago[]> {
    return this.http.get<OrdenPago[]>(`${this.BASE_URL}/api/ordenes`);
  }

  cancelarOrden(): Observable<string> {
    return this.http.post(`${this.BASE_URL}/api/ordenes/cancelar`, {}, { responseType: 'text' });
  }
}
