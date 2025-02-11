import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '@core/services/JWT/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //Obtiene el token guardado en el servicio Token
    const token = this.tokenService.getToken();

    //Si existe token se clona la petición para enviarlo con la autorización del JWT
    if (token) {
      const clonedRequest = req.clone({
        //Envía la autorización BEARER en el header
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(clonedRequest);
    }

    //Envía la solicitud normal cuando no hay token
    return next.handle(req);
  }
}
