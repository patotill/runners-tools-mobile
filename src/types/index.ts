import { Usuario } from "./usuarios";
export type RootStackParamList = {
  Inicio: undefined;
  Login: undefined;
  Register:undefined;
  Calc: undefined;
  UserDetail: { usuario: Usuario;};
  };