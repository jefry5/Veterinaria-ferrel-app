import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessagesService } from '@core/services/message/messages.service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  //Variable que controla si ocurrió un error.
  static isConnectionError: boolean = false;

  constructor(private messagesService: MessagesService) { }

  //Intercepta las peticiones y muestra maneja los errores que puedan ocurrir.
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //Reestablece la variable como false
    ErrorInterceptor.isConnectionError = false;

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (true) {
          //Maneja el error cuando no se lograr establecer una conexión con el servidor.
          case error.status === 0:
            ErrorInterceptor.isConnectionError = true;
            this.messagesService.errorMessage(
              'Sin conexión',
              'No se pudo establecer conexión con el servidor. Por favor, inténtelo de nuevo más tarde.'
            );
            break;
          //Maneja el error cuando es otro error diferente a la conexión a excepción del 404 (bad request).
          case error.status !== 404 && error.status !== 403:
            ErrorInterceptor.isConnectionError = true;
            this.messagesService.errorMessage(
              'Error inesperado',
              'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.'
            );
            break;
        }

        return throwError(() => error);
      })
    );
  }
}
