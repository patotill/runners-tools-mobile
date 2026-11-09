import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../types';
import { LISTA_USUARIOS } from '../types/usuarios';
import { useAuth } from '../context/AuthContext';
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/global';
import Layout from '../components/Layout'; // 1. Importas el componente Layout

type Props = BottomTabScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { iniciarSesion } = useAuth();

  const handleLogin = () => {
    if (!email || !password) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const emailLimpio = email.trim().toLowerCase();
    const passwordLimpio = password.trim();

    const usuarioEncontrado = LISTA_USUARIOS.find(
      (u) => u.email.trim().toLowerCase() === emailLimpio && u.password.trim() === passwordLimpio
    );

    if (!usuarioEncontrado) {
      alert('Correo o contraseña incorrectos.');
      return;
    }

    iniciarSesion(usuarioEncontrado);

    navigation.navigate('UserDetail', { usuario: usuarioEncontrado });
  };

  return (
    /* 2. Envolvemos el contenido con Layout y hacemos transparente el contenedor global */
    <Layout>
      <View style={[globalStyles.container, styles.container, { backgroundColor: 'transparent' }]}>
        <Text style={globalStyles.title}>Iniciar Sesión</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Button title="Ingresar" color={colors.primary} onPress={handleLogin} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, justifyContent: 'center', width: '100%' },
  input: {
    width: '100%',
    backgroundColor: colors.card,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});

export default LoginScreen;