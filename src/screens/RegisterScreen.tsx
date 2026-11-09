import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { LISTA_USUARIOS, Usuario } from '../types/usuarios';
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/global';
import Layout from '../components/Layout'; // 1. Importas el componente Layout

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!nombre || !apellido || !dni || !email || !password) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const existe = LISTA_USUARIOS.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existe) {
      alert('Ya existe una cuenta registrada con este correo electrónico.');
      return;
    }

    const nuevoUsuario: Usuario = {
      id: Date.now().toString(),
      nombre,
      apellido,
      dni,
      email,
      password,
      carreras: [],
    };

    LISTA_USUARIOS.push(nuevoUsuario);
    alert('Usuario registrado con éxito.');
    console.log('Lista actual:', LISTA_USUARIOS);

    navigation.navigate('Login');
  };

  return (
    /* 2. Envolvemos el contenido con Layout y usamos backgroundColor transparente */
    <Layout>
      <View style={[globalStyles.container, styles.container, { backgroundColor: 'transparent' }]}>
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

export default RegisterScreen;