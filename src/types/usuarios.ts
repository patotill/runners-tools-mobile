// Tipado para una carrera individual
export type Carrera = {
  id: string;
  distancia: number; // en km
  tiempoTotal: number; // en minutos
  ritmo: string; // ej: "5:00 min/km"
};

// Tipado para el usuario dinámico
export type Usuario = {
  id: string;
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  dni: string;
  carreras: Carrera[];
};

// Array de usuarios vacio
export const LISTA_USUARIOS: Usuario[] = [];