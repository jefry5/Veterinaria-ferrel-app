import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RolesService } from '../roles/roles.service';
import { TokenService } from '../JWT/token.service';
import { SideBarService } from '../side-bar/side-bar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL: string = '';

  constructor(
    private http: HttpClient,
    private roleService: RolesService,
    private tokenService: TokenService,
    private sidebarService: SideBarService
  ) {
    this.BASE_URL = environment.url;
  }

  //Método encargado de realizar la petición de Login
  login(username: string, password: string) {
    return this.http.post(`${this.BASE_URL}/login`, {
      username,
      password,
    });
  }

  //Método encargado de limpiar todos los datos relacionados al Login
  logout() {
    this.tokenService.clearToken();
    this.roleService.clearRole();
    this.sidebarService.clearItems();
  }
}
