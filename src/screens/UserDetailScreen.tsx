import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../types';
import { useAuth } from '../context/AuthContext'; // Importamos el contexto
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/global';

type Props = BottomTabScreenProps<RootStackParamList, 'UserDetail'>;

const UserDetailScreen: React.FC<Props> = ({ navigation }) => {
  const { usuarioLogueado, cerrarSesion } = useAuth(); // Leemos el usuario activo del contexto global

  // Si no hay usuario logueado en el contexto, mostramos el estado desconectado
  if (!usuarioLogueado) {
    return (
      <View style={[globalStyles.container, styles.container]}>
        <Text style={{ color: colors.textSecondary || '#aaa', fontSize: 16 }}>
          No has ingresado a tu cuenta. Por favor inicia sesión con tu correo y contraseña, o registrate.
        </Text>
      </View>
    );
  }

  const handleCerrarSesion = () => {
    cerrarSesion(); // Limpiamos el estado global
    navigation.navigate('Inicio'); // Redirigimos al inicio
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      <Text style={globalStyles.title}>Perfil de Usuario</Text>
      <Text style={styles.texto}>Nombre: {usuarioLogueado.nombre} {usuarioLogueado.apellido}</Text>
      <Text style={styles.texto}>Correo: {usuarioLogueado.email}</Text>
      <Text style={styles.texto}>DNI: {usuarioLogueado.dni}</Text>

      <View style={styles.botonContainer}>
        <Button 
          title="Cerrar Sesión" 
          color={colors.primary} 
          onPress={handleCerrarSesion} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, justifyContent: 'center', alignItems: 'center' },
  texto: { color: colors.text, fontSize: 16, marginBottom: 10 },
  botonContainer: { marginTop: 20, width: '100%' }
});

export default UserDetailScreen;