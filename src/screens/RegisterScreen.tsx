import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { LISTA_USUARIOS, Usuario } from '../types/usuarios';
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/global';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // 1. Validaciones básicas directas
    if (!nombre || !apellido || !dni || !email || !password) {
      alert('Por favor completa todos los campos.');
      return;
    }

    // 2. Verificamos si ya existe el correo
    const existe = LISTA_USUARIOS.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existe) {
      alert('Ya existe una cuenta registrada con este correo electrónico.');
      return;
    }

    // 3. Creamos el nuevo usuario
    const nuevoUsuario: Usuario = {
      id: Date.now().toString(),
      nombre,
      apellido,
      dni,
      email,
      password,
      carreras: [],
    };

    // 4. Guardamos en el arreglo global
    LISTA_USUARIOS.push(nuevoUsuario);
    console.log('Usuario registrado con éxito:', nuevoUsuario);
    console.log('Lista actual:', LISTA_USUARIOS);

    // 5. Navegamos directo al Login sin alertas bloqueantes
    navigation.navigate('Login');
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      <Text style={globalStyles.title}>Crear Cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor={colors.textSecondary}
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        placeholderTextColor={colors.textSecondary}
        value={apellido}
        onChangeText={setApellido}
      />
      <TextInput
        style={styles.input}
        placeholder="DNI"
        placeholderTextColor={colors.textSecondary}
        keyboardType="numeric"
        value={dni}
        onChangeText={setDni}
      />
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
        placeholder="Contraseña (mín. 6 caracteres)"
        placeholderTextColor={colors.textSecondary}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Registrarse" color={colors.primary} onPress={handleRegister} />
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

export default RegisterScreen;