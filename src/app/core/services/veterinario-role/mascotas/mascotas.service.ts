import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormularioMascota } from '@core/models/mascota.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {
  private BASE_URL: string = '';

  constructor(private http: HttpClient) {
    this.BASE_URL = environment.url;
  }

  //Método encargado de obtener la lista de mascotas.
  getDataMascota(){
    return this.http.get(`${this.BASE_URL}/mascotas/list`);
  }

  //Método encargado de obtener los detalles de una mascota mediante su id.
  getDataDetailsMascota(id: number){
    return this.http.get(`${this.BASE_URL}/mascotas/details/${id}`);
  }

  //Método encargado de registrar una mascota
  postRegisterMascota(body: FormularioMascota){
    return this.http.post(`${this.BASE_URL}/mascotas/register`, body);
  }

  //Método encargado de editar una mascota
  putEditMascota(id: number, body: FormularioMascota){
    return this.http.put(`${this.BASE_URL}/mascotas/edit/${id}`, body);
  }

  //Método encargado de eliminar una mascota mediante su id.
  deleteDataMascota(id: number){
    return this.http.delete(`${this.BASE_URL}/mascotas/delete/${id}`);
  }
}
