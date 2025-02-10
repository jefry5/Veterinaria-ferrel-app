import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

//Representa el modelo del contenido del JWT
interface DecodedToken {
  sub: string;
  iss: string;
  id: number;
  exp: number;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  //Variable que contiene la key del localstorage
  private tokenKey = 'authToken';

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  //Método encargado de guardar el token
  saveToken(token: string): void {
    if(isPlatformBrowser(this.platformId)){
      localStorage.setItem(this.tokenKey, token);
    }
  }

  //Método encargado de devolver el token
  getToken(): string | null {
    if(isPlatformBrowser(this.platformId)){
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  //Método encargado de devolver el rol colocado en la firma del JWT
  getRole(): string | null {
    return this.decodeToken()?.rol || null;
  }

  //Método encargado de remover el token del localstorage
  clearToken(): void {
    if(isPlatformBrowser(this.platformId)){
      localStorage.removeItem(this.tokenKey);
    }
  }

  //Método encargado de validar la autenticidad del JWT
  isTokenValid(): boolean {
    //Verifica que el token sea capaz de decodificarse
    const decoded = this.decodeToken();
    if (!decoded) return false;

    //Verifica que no haya vencido el tiempo de expiración
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp > currentTime;
  }

  //Método encargado de decodificar el token para otorgar los datos del JWT
  private decodeToken(): DecodedToken | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }
}
