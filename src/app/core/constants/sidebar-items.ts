export interface SidebarItem {
  name: string;
  description: string;
  tooltip: string;
  icon: string;
  route: string;
}

//Opciones en común para los roles
const COMMON_ITEMS: SidebarItem[] = [
  {
    name: 'Inicio',
    description: 'Dirige a la sección de inicio',
    tooltip: 'Inicio',
    icon: 'fas fa-home',
    route: '/home',
  },
];

//Opciones especificas por el rol (veterinario, recepcionista, farmaceutico)
export const SIDEBAR_ITEMS: { [role: string]: SidebarItem[] } = {
    veterinario: [
      ...COMMON_ITEMS,
      {
        name: 'Mantener Mascotas',
        description: 'Dirige a la sección de Mantener mascotas',
        tooltip: 'Mascotas',
        icon: 'fas fa-paw',
        route: '/mascotas',
      },
      {
        name: 'Mantener Historias',
        description: 'Dirige a la sección de Mantener historias',
        tooltip: 'Historias',
        icon: 'fas fa-file-alt',
        route: '/historias',
      },
    ],
    recepcionista: [
      ...COMMON_ITEMS,
      {
        name: 'Mantener Clientes',
        description: 'Sección para gestionar los datos de los clientes',
        tooltip: 'Clientes',
        icon: 'fa fa-user',
        route: '/clientes',
      },
      {
        name: 'Registrar Pagos',
        description: 'Sección para gestionar los pagos',
        tooltip: 'Pagos',
        icon: 'fa fa-credit-card-alt',
        route: '/pagos',
      }
    ],
    farmaceutico: [
      ...COMMON_ITEMS,
      {
        name: 'Consultar Stock',
        description: 'Sección para consultar los productos en farmacia',
        tooltip: 'Stock',
        icon: 'fa fa-medkit',
        route: '/stock',
      },
    ],
  };