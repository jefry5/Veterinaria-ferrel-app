import { Cliente } from "./cliente.model";

export interface Mascota {
    id?: number;
    nombre?: string;
    raza?: string;
    edad?: number;
    sexo?: string;
    peso?: number;
    talla?: number;
    cliente?: Cliente;
}

export interface FormularioMascota {
    nombre: string;
    raza: string;
    edad: number;
    sexo: string;
    peso: number;
    talla: number;
    clienteId: number;
}