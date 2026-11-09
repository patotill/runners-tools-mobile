import React, { createContext, useContext, useState } from 'react';
import { Usuario } from '../types/usuarios';

type AuthContextType = {
  usuarioLogueado: Usuario | null;
  iniciarSesion: (usuario: Usuario) => void;
  cerrarSesion: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuarioLogueado, setUsuarioLogueado] = useState<Usuario | null>(null);

  const iniciarSesion = (usuario: Usuario) => {
    setUsuarioLogueado(usuario);
  };

  const cerrarSesion = () => {
    setUsuarioLogueado(null);
  };

  return (
    <AuthContext.Provider value={{ usuarioLogueado, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para consumir el contexto fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};