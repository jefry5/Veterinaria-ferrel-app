import { JsonPipe } from '@angular/common';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '@core/models/cliente.model';
import { TokenService } from '@core/services/JWT/token.service';
import { catchError, Observable, throwError } from 'rxjs';
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
   //Método para registrar cliente
   postRegistrarCliente(cliente: Cliente): Observable<any> {
    if (!this.tokenService.isTokenValid()) {
      return throwError(() => new Error('Token inválido o expirado'));
    }

    return this.http.post(`${this.BASE_URL}/cliente/register`, cliente).pipe(
      catchError((error) => {
        if (error.status === 403) {
          return throwError(() => new Error('No tiene permisos para realizar esta acción'));
        }
        return throwError(() => new Error('Error al registrar cliente'));
      })
    );
  }

  //metodo para borrar cliente por id
  deleteCliente(id: string) {
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
  updateCliente(cliente: Cliente) {
    return this.http.put(`${this.BASE_URL}/cliente/edit`, cliente);
  }
}
