import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../types';
import { LISTA_USUARIOS } from '../types/usuarios';
import { useAuth } from '../context/AuthContext'; // 1. Importamos el hook de autenticación
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/global';

type Props = BottomTabScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { iniciarSesion } = useAuth(); // 2. Extraemos la función iniciarSesion del contexto

  const handleLogin = () => {
    if (!email || !password) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const emailLimpio = email.trim().toLowerCase();
    const passwordLimpio = password.trim();

    // Buscamos ignorando mayúsculas/minúsculas y espacios
    const usuarioEncontrado = LISTA_USUARIOS.find(
      (u) => u.email.trim().toLowerCase() === emailLimpio && u.password.trim() === passwordLimpio
    );

    if (!usuarioEncontrado) {
      alert('Correo o contraseña incorrectos.');
      return;
    }

    // 3. Guardamos el usuario en el estado global antes de navegar
    iniciarSesion(usuarioEncontrado);

    navigation.navigate('UserDetail', { usuario: usuarioEncontrado });
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
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
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, justifyContent: 'center' },
  input: {
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