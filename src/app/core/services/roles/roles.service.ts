import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Role, ROLES } from '@core/constants/roles';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private readonly roleKey = 'userRole';
  private role: string | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.role = localStorage.getItem(this.roleKey);
    }
  }

  // Método para verificar si el rol es válido
  isValidRole(role: string): boolean {
    const roleFirstLetterCapitalize = this.firstLetterCapitalize(role);
    return Object.values(ROLES).includes(roleFirstLetterCapitalize as Role);
  }

  // Establece el rol del usuario como variable global
  setRole(role: string): void {
    if (isPlatformBrowser(this.platformId) && this.isValidRole(role)) {
      const roleFirstLetterCapitalize = this.firstLetterCapitalize(role);
      localStorage.setItem(this.roleKey, roleFirstLetterCapitalize);
      this.role = roleFirstLetterCapitalize;
    }
  }

  // Obtiene el rol del usuario
  getRole(): string | null {
    return this.role;
  }

  // Limpia el rol del usuario
  clearRole(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.roleKey);
      this.role = null;
    }
  }

  //Convierte la palabra para que tenga la primera letra en mayuscula y demás minúscula
  firstLetterCapitalize(letter : string): string{
    return letter.charAt(0).toUpperCase() + letter.slice(1).toLowerCase();
  }
}
