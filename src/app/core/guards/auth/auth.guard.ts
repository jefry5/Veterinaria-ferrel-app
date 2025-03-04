import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '@core/services/JWT/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  //Se inyecta los servicios necesarios para el guard
  const tokenService = inject(TokenService);
  const router = inject(Router);

  //Verifica que el token sea autentico para validad el guard
  //Devuelve a la página de login si no tiene un token valido
  if(!tokenService.isTokenValid()){
    router.navigate(['/auth']);
    return false;
  }

  const expectedRole = route.data['expectedRole'];
  const userRole = tokenService.getRole();

  //Verifica si el rol coincide con el esperado
  if (expectedRole && userRole !== expectedRole) {
    router.navigate(['/home']);
    return false;
  }
  
  return true;
};
