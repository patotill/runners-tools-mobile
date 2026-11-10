import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { LISTA_USUARIOS, Usuario } from '../types/usuarios';
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/global';
import Layout from '../components/Layout';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [nacionalidad, setNacionalidad] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!nombre || !apellido || !fechaNacimiento || !nacionalidad || !email || !password) {
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
      fechaNacimiento,
      nacionalidad,
      email,
      password,
      carreras: [],
    };

    LISTA_USUARIOS.push(nuevoUsuario);
    alert('Usuario registrado con éxito.');

    navigation.navigate('Login');
  };

  return (
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
          placeholder="Fecha de Nacimiento (ej. DD/MM/AAAA)"
          placeholderTextColor={colors.textSecondary}
          value={fechaNacimiento}
          onChangeText={setFechaNacimiento}
        />
        <TextInput
          style={styles.input}
          placeholder="Nacionalidad (ej. Argentina)"
          placeholderTextColor={colors.textSecondary}
          value={nacionalidad}
          onChangeText={setNacionalidad}
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

        <View style={styles.buttonSpacing}>
          <Button 
            title="Volver al inicio" 
            color={colors.textSecondary || '#6c757d'} 
            onPress={() => navigation.goBack()} 
          />
        </View>
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
  buttonSpacing: {
    marginTop: 12,
  },
});

export default RegisterScreen;