import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '@core/models/cliente.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private BASE_URL: string = '';
  constructor(private http: HttpClient) {
    this.BASE_URL = environment.url;
   }

   //Metoddo pára registrar cliente
   postRegistrarCliente(cliente: Cliente){
      return this.http.post(`${this.BASE_URL}/cliente/register`,cliente);
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
