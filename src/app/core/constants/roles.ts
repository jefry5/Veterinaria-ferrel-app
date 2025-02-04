//**Importante: Primera letra del rol en mayúscula y demás en minúscula
//Los roles disponibles en la aplicación
export const ROLES = Object.freeze({
  VETERINARIO: 'Veterinario',
  RECEPCIONISTA: 'Recepcionista',
  FARMACEUTICO: 'Farmaceutico',
});

//Incluye los tipos para verificarse con los ROLES
export type Role = 'Veterinario' | 'Recepcionista' | 'Farmaceutico';