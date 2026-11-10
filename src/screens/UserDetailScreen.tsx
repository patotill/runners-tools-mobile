import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { useAuth } from '../context/AuthContext';
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/global';
import Layout from '../components/Layout';

type Carrera = {
  id: string;
  nombre: string;
  lugar: string;
  distancia: string;
  tiempo: string;
};

type Props = BottomTabScreenProps<RootStackParamList, 'UserDetail'>;

const UserDetailScreen: React.FC<Props> = () => {
  const { usuarioLogueado } = useAuth();

  // Estados locales para el formulario de nueva carrera
  const [nombre, setNombre] = useState('');
  const [lugar, setLugar] = useState('');
  const [distancia, setDistancia] = useState('');
  const [tiempo, setTiempo] = useState('');

  // Estado local usando useState con un diccionario indexado por email de usuario
  const [carrerasPorUsuario, setCarrerasPorUsuario] = useState<{ [email: string]: Carrera[] }>({});

  if (!usuarioLogueado) {
    return (
      <Layout>
        <View style={[globalStyles.container, styles.container, { backgroundColor: 'transparent' }]}>
          <Text style={{ color: colors.textSecondary || '#aaa', fontSize: 16, textAlign: 'center' }}>
            No has ingresado a tu cuenta. Por favor inicia sesión con tu correo y contraseña, o regístrate.
          </Text>
        </View>
      </Layout>
    );
  }

  // Obtenemos únicamente las carreras correspondientes al usuario logueado actual
  const misCarreras = carrerasPorUsuario[usuarioLogueado.email] || [];

  const handleAgregarCarrera = () => {
    if (!nombre || !lugar || !distancia || !tiempo) {
      alert('Por favor completa todos los campos de la carrera.');
      return;
    }

    const nuevaCarrera: Carrera = {
      id: Date.now().toString(),
      nombre,
      lugar,
      distancia,
      tiempo,
    };

    const nuevasDelUsuario = [...misCarreras, nuevaCarrera];

    setCarrerasPorUsuario({
      ...carrerasPorUsuario,
      [usuarioLogueado.email]: nuevasDelUsuario,
    });

    setNombre('');
    setLugar('');
    setDistancia('');
    setTiempo('');
  };

  const handleEliminarCarrera = (id: string) => {
    const filtradas = misCarreras.filter((c) => c.id !== id);
    setCarrerasPorUsuario({
      ...carrerasPorUsuario,
      [usuarioLogueado.email]: filtradas,
    });
  };

  return (
    <Layout>
      <FlatList
        data={misCarreras}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.scrollContainer}
        ListHeaderComponent={
          <View style={[globalStyles.container, styles.container, { backgroundColor: 'transparent' }]}>
            <View style={styles.titleContainer}>
              <Ionicons name="id-card-outline" size={24} color={colors.text} style={{ marginRight: 8 }} />
              <Text style={globalStyles.title}>Perfil de Usuario</Text>
            </View>
            <Text style={styles.texto}>Nombre: {usuarioLogueado.nombre} {usuarioLogueado.apellido}</Text>
            <Text style={styles.texto}>Correo: {usuarioLogueado.email}</Text>
            <Text style={styles.texto}>DNI: {usuarioLogueado.dni}</Text>

            <Text style={[globalStyles.title, { fontSize: 16, marginTop: 20, marginBottom: 10 }]}>
              Mis Carreras Registradas 🏅
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.carreraCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.carreraTitle}>{item.nombre}</Text>
              <Text style={styles.carreraText}>📍 Lugar: {item.lugar}</Text>
              <Text style={styles.carreraText}>📏 Distancia: {item.distancia}</Text>
              <Text style={styles.carreraText}>⏱️ Tiempo: {item.tiempo}</Text>
            </View>
            <TouchableOpacity onPress={() => handleEliminarCarrera(item.id)} style={styles.deleteButton}>
              <Ionicons name="trash-outline" size={20} color="#ff5252" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: colors.textSecondary, textAlign: 'center', marginBottom: 15 }}>
            Aún no has registrado ninguna carrera.
          </Text>
        }
        ListFooterComponent={
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Registrar una nueva carrera</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Nombre de la competencia (ej. Maratón de BA)"
              placeholderTextColor={colors.textSecondary}
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Lugar (ej. Palermo, CABA)"
              placeholderTextColor={colors.textSecondary}
              value={lugar}
              onChangeText={setLugar}
            />
            <TextInput
              style={styles.input}
              placeholder="Distancia (ej. 21K)"
              placeholderTextColor={colors.textSecondary}
              value={distancia}
              onChangeText={setDistancia}
            />
            <TextInput
              style={styles.input}
              placeholder="Tiempo (ej. 1h 45m)"
              placeholderTextColor={colors.textSecondary}
              value={tiempo}
              onChangeText={setTiempo}
            />

            <Button title="Agregar Carrera" color={colors.primary} onPress={handleAgregarCarrera} />
          </View>
        }
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { padding: 15, paddingBottom: 40 },
  container: { width: '100%', alignItems: 'center' },
  titleContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  texto: { color: colors.text, fontSize: 16, marginBottom: 6, textAlign: 'center' },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.textSecondary,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: colors.card,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  carreraCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.textSecondary,
    width: '100%',
  },
  carreraTitle: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  carreraText: {
    color: colors.text,
    fontSize: 14,
    marginBottom: 2,
  },
  deleteButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserDetailScreen;