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
  
  // Estados separados para la fecha de nacimiento
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [anio, setAnio] = useState('');

  const [nacionalidad, setNacionalidad] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!nombre || !apellido || !dia || !mes || !anio || !nacionalidad || !email || !password) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const existe = LISTA_USUARIOS.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existe) {
      alert('Ya existe una cuenta registrada con este correo electrónico.');
      return;
    }

    // Unimos los valores en un solo string formateado (DD/MM/AAAA)
    const fechaNacimiento = `${dia.padStart(2, '0')}/${mes.padStart(2, '0')}/${anio}`;

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

        {/* Fila separada para Fecha de Nacimiento (Día / Mes / Año) */}
        <Text style={styles.label}>Fecha de Nacimiento</Text>
        <View style={styles.dateRow}>
          <TextInput
            style={[styles.input, styles.dateInput]}
            placeholder="Día (DD)"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            maxLength={2}
            value={dia}
            onChangeText={setDia}
          />
          <TextInput
            style={[styles.input, styles.dateInput]}
            placeholder="Mes (MM)"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            maxLength={2}
            value={mes}
            onChangeText={setMes}
          />
          <TextInput
            style={[styles.input, styles.dateInputYear]}
            placeholder="Año (AAAA)"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            maxLength={4}
            value={anio}
            onChangeText={setAnio}
          />
        </View>

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
  label: { color: colors.text, marginBottom: 6, fontSize: 13, alignSelf: 'flex-start' },
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
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 4,
  },
  dateInput: {
    flex: 1,
    marginRight: 8,
    textAlign: 'center',
  },
  dateInputYear: {
    flex: 1.5,
    textAlign: 'center',
  },
  buttonSpacing: {
    marginTop: 12,
  },
});

export default RegisterScreen;