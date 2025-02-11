import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.http.get(`${this.BASE_URL}/mascota/details`);
  }

  //Método encargado de obtener los detalles de una mascota mediante su id.
  getDataDetailsMascota(id: string){
    return this.http.get(`${this.BASE_URL}/mascota/${id}`);
  }

  //Método encargado de eliminar una mascota mediante su id.
  deleteDataMascota(id: number){
    return this.http.delete(`${this.BASE_URL}/mascota/${id}`);
  }
}
