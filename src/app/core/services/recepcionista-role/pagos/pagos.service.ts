import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrdenPago } from '@core/models/orden-pago.model';
import { TokenService } from '@core/services/JWT/token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private BASE_URL: string = '';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) {
    this.BASE_URL = environment.url;
  }

  getListaPagosPendientes(){
    return this.http.get<OrdenPago>(`${this.BASE_URL}/api/ordenes/pendientes`);
  }

  postConfirmar(idCliente: number){
    return this.http.post(`${this.BASE_URL}/carrito/confirmar/${idCliente}`, {});
  }

  postSeleccionar(idOrden: number){
    return this.http.post(`${this.BASE_URL}/carrito/agregar/${idOrden}`, {});
  }
  postAgregarConsulta(precioConsulta: number){
    return this.http.post(`${this.BASE_URL}/carrito/agregar-consulta`, precioConsulta);
  }
  getListaCarrito(){
    return this.http.get<any>(`${this.BASE_URL}/carrito/listar`);
  }
  deleteOrdenPago(idOrden: number){
    return this.http.delete(`${this.BASE_URL}/carrito/quitar/${idOrden}`);
  }
  deleteConsulta(){
    return this.http.delete(`${this.BASE_URL}/carrito/quitar-consulta`);
  }
}
