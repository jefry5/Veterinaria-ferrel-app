import { JsonPipe } from '@angular/common';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '@core/models/cliente.model';
import { Mascota } from '@core/models/mascota.model';
import { TokenService } from '@core/services/JWT/token.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private BASE_URL: string = '';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) {
    this.BASE_URL = environment.url;
  }

  postRegistrarCliente(cliente: Cliente) {
    return this.http.post(`${this.BASE_URL}/cliente/register`, cliente);
  }
  //metodo para borrar cliente por id
  deleteCliente(id: number) {
    return this.http.delete(`${this.BASE_URL}/cliente/${id}`);
  }

  //metodo para obtener cliente por id
  getCliente(id: string) {
    return this.http.get<Cliente>(`${this.BASE_URL}/cliente/${id}`);
  }

  //Metodo para obtener listado de clientes
  getClientes() {
    return this.http.get<Cliente[]>(`${this.BASE_URL}/cliente/details`);
  }

  //metodo para modificar cliente
  updateCliente(cliente: Cliente, id: number) {
    return this.http.put(`${this.BASE_URL}/cliente/edit/${id}`, cliente);
  }

  //metodo para tener las mascotas de un cliente
  getMascotasCliente(dni: number) {
    return this.http.get<Mascota[]>(`${this.BASE_URL}/mascotas/search/${dni}`);
  }
}
