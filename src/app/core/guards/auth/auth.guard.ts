import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '@core/services/JWT/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  //Se inyecta los servicios necesarios para el guard
  const tokenService = inject(TokenService);
  const router = inject(Router);

  //Verifica que el token sea autentico para validad el guard
  if(tokenService.isTokenValid()){
    return true;
  }

  //Devuelve a la página de login si no tiene un token valido
  router.navigate(['/auth']);
  return false;
};
