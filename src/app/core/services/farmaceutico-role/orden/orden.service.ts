import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  private BASE_URL: string = '';

  constructor(private http: HttpClient) {
    this.BASE_URL = environment.url;
  }

  //metodo para confirmar la orden de pago
  confirmarOrden(orden: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/api/ordenes/confirmar`, orden);
  }

  //metodo para seleccionar productos y enviarlos a la base de datos
  seleccionarProducto(idProducto: number, cantidad: number) {
    return this.http.post(`${this.BASE_URL}/api/ordenes/seleccionar?idProducto=${idProducto}&cantidad=${cantidad}`, {});
  }
}
