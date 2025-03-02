import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoriasService {
  private BASE_URL: string = '';

  constructor(private http: HttpClient) {
    this.BASE_URL = environment.url;
  }

  //Método que obtiene todas las historias médicas de la mascota
  getDataHistoriasMedicasMascota(idMascota: number) {
    return this.http.get(`${this.BASE_URL}/historial/mascota/${idMascota}`);
  }

  //Método que obtiene los detalles de la historia médica por su id
  getDataHistoriaMedicaById(id: string) {
    return this.http.get(`${this.BASE_URL}/historial/search/${id}`);
  }

  //Méotod que actualiza los datos de la historia médica por su id
  putDataHistoriaMedicaById(id: number, data: any) {
    return this.http.put(`${this.BASE_URL}/historial/edit/${id}`, data);
  }

  //Método que registra una historia médica a la mascota
  registerDataHistoriaMedica(idMascota: number, data: any) {
    return this.http.post(`${this.BASE_URL}/historial/register/${idMascota}`, data);
  }

  //Método que eliminar una historia médica por su id
  eliminarDataHistoriaMedicaById(id: string) {
    return this.http.delete(`${this.BASE_URL}/historial/delete/${id}`);
  }

  //Método que obtiene las mascotas vinculadas al cliente mediante DNI
  getDataMascotasByCliente(DNI: number) {
    return this.http.get(`${this.BASE_URL}/mascotas/search/${DNI}`);
  }
}
