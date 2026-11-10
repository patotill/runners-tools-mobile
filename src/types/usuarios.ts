export type Carrera = {
  id: string;
  distancia: string;
  tiempo: string;
  nombre: string;
  lugar: string;
  imagenUri?: string | null;
};

export type Usuario = {
  id: string;
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  nacionalidad: string;
  carreras: Carrera[];
};

export const LISTA_USUARIOS: Usuario[] = [];