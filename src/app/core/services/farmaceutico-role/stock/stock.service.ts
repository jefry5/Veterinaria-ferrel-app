import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  getStockProductos() {
    return this.http.get(`${this.BASE_URL}/api/productos/listar`);
  }
}