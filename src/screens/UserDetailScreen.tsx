import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../types';
import { useAuth } from '../context/AuthContext';
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/global';
import Layout from '../components/Layout'; // 1. Importas el componente Layout

type Props = BottomTabScreenProps<RootStackParamList, 'UserDetail'>;

const UserDetailScreen: React.FC<Props> = ({ navigation }) => {
  const { usuarioLogueado, cerrarSesion } = useAuth();

  // Si no hay usuario logueado, envolvemos también este estado con Layout
  if (!usuarioLogueado) {
    return (
      <Layout>
        <View style={[globalStyles.container, styles.container, { backgroundColor: 'transparent' }]}>
          <Text style={{ color: colors.textSecondary || '#aaa', fontSize: 16, textAlign: 'center' }}>
            No has ingresado a tu cuenta. Por favor inicia sesión con tu correo y contraseña, o registrate.
          </Text>
        </View>
      </Layout>
    );
  }

  const handleCerrarSesion = () => {
    cerrarSesion();
    navigation.navigate('Inicio');
  };

  return (
    /* 2. Envolvemos el contenido principal con Layout y hacemos transparente el contenedor global */
    <Layout>
      <View style={[globalStyles.container, styles.container, { backgroundColor: 'transparent' }]}>
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
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, justifyContent: 'center', alignItems: 'center', width: '100%' },
  texto: { color: colors.text, fontSize: 16, marginBottom: 10, textAlign: 'center' },
  botonContainer: { marginTop: 20, width: '100%' }
});

export default UserDetailScreen;