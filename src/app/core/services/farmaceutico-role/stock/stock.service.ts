import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '@core/models/producto.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private BASE_URL: string = '';

  constructor(private http: HttpClient) {
    this.BASE_URL = environment.url;
  }

  //metodo para obtener la lista de productos disponibles en stock
  listarProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.BASE_URL}/api/productos/listar`);
  }
}