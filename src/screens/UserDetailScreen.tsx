import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
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
  imagenUri?: string | null;
};

type Props = BottomTabScreenProps<RootStackParamList, 'UserDetail'>;

const UserDetailScreen: React.FC<Props> = ({ navigation }) => {
  const { usuarioLogueado } = useAuth();

  // Estados locales para el formulario de nueva carrera
  const [nombre, setNombre] = useState('');
  const [lugar, setLugar] = useState('');
  const [distanciaSeleccionada, setDistanciaSeleccionada] = useState('10K'); // Estado predeterminado
  const [distanciaPersonalizada, setDistanciaPersonalizada] = useState(''); // Para ingresar kms manuales
  
  // Estados para Horas, Minutos y Segundos
  const [horasCarrera, setHorasCarrera] = useState('');
  const [minutosCarrera, setMinutosCarrera] = useState('');
  const [segundosCarrera, setSegundosCarrera] = useState('');

  const [imagenUri, setImagenUri] = useState<string | null>(null);

  // Distancias disponibles para elegir
  const distanciasDisponibles = [
    { label: '5K', value: '5K' },
    { label: '10K', value: '10K' },
    { label: '21K', value: '21K' },
    { label: '42K', value: '42K' },
    { label: 'Otra', value: 'Otra' },
  ];

  // Estado local usando useState con un diccionario indexado por email de usuario
  const [carrerasPorUsuario, setCarrerasPorUsuario] = useState<{ [email: string]: Carrera[] }>({});

  if (!usuarioLogueado) {
    return (
      <Layout>
        <View style={[globalStyles.container, styles.container, { backgroundColor: 'transparent' }]}>
          <Text style={{ color: colors.textSecondary || '#aaa', fontSize: 16, textAlign: 'center', marginBottom: 16 }}>
            No has ingresado a tu cuenta. Por favor inicia sesión con tu correo y contraseña, o regístrate.
          </Text>
          <Button 
            title="Volver al inicio" 
            color={colors.textSecondary || '#6c757d'} 
            onPress={() => navigation.goBack()} 
          />
        </View>
      </Layout>
    );
  }

  // Obtenemos únicamente las carreras correspondientes al usuario logueado actual
  const misCarreras = carrerasPorUsuario[usuarioLogueado.email] || [];

  // Menú para elegir entre Cámara o Galería
  const seleccionarImagen = () => {
    Alert.alert(
      "Seleccionar Foto",
      "Elige una opción",
      [
        { text: "Cámara", onPress: abrirCamara },
        { text: "Galería", onPress: abrirGaleria },
        { text: "Cancelar", style: "cancel" }
      ]
    );
  };

  const abrirCamara = async () => {
    const permisoCamara = await ImagePicker.requestCameraPermissionsAsync();
    if (!permisoCamara.granted) {
      Alert.alert("Permiso denegado", "Se necesitan permisos para usar la cámara.");
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!resultado.canceled && resultado.assets && resultado.assets.length > 0) {
      setImagenUri(resultado.assets[0].uri);
    }
  };

  const abrirGaleria = async () => {
    const permisoGaleria = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permisoGaleria.granted) {
      Alert.alert("Permiso denegado", "Se necesitan permisos para acceder al almacenamiento.");
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!resultado.canceled && resultado.assets && resultado.assets.length > 0) {
      setImagenUri(resultado.assets[0].uri);
    }
  };

  const handleAgregarCarrera = () => {
    if (!nombre || !lugar) {
      alert('Por favor completa el nombre y el lugar de la carrera.');
      return;
    }

    // Determinar valor de distancia a guardar
    let distanciaFinal = distanciaSeleccionada;
    if (distanciaSeleccionada === 'Otra') {
      const numDist = distanciaPersonalizada.trim();
      if (!numDist || isNaN(Number(numDist))) {
        alert('Por favor ingresa una distancia numérica válida en Kms.');
        return;
      }
      distanciaFinal = `${numDist}K`;
    }

    const h = horasCarrera.trim();
    const m = minutosCarrera.trim();
    const s = segundosCarrera.trim();

    if (!h && !m && !s) {
      alert('Por favor ingresa al menos el tiempo de la carrera.');
      return;
    }

    let tiempoFormateado = '';
    if (h) tiempoFormateado += `${h}h `;
    if (m) tiempoFormateado += `${m}m `;
    if (s) tiempoFormateado += `${s}s`;

    const nuevaCarrera: Carrera = {
      id: Date.now().toString(),
      nombre,
      lugar,
      distancia: distanciaFinal,
      tiempo: tiempoFormateado.trim(),
      imagenUri,
    };

    const nuevasDelUsuario = [...misCarreras, nuevaCarrera];

    setCarrerasPorUsuario({
      ...carrerasPorUsuario,
      [usuarioLogueado.email]: nuevasDelUsuario,
    });

    // Limpiar formulario
    setNombre('');
    setLugar('');
    setDistanciaSeleccionada('10K');
    setDistanciaPersonalizada('');
    setHorasCarrera('');
    setMinutosCarrera('');
    setSegundosCarrera('');
    setImagenUri(null);
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
              <Text style={{ fontSize: 34, marginRight: 8 }}>🏃‍♂️</Text>
              <Text style={globalStyles.title}>Mi Cuenta</Text>
            </View>
            <Text style={styles.texto}>Nombre: {usuarioLogueado.nombre} {usuarioLogueado.apellido}</Text>
            <Text style={styles.texto}>Correo: {usuarioLogueado.email}</Text>
            <Text style={styles.texto}>Nacionalidad: {usuarioLogueado.nacionalidad}</Text>
            
            <Text style={[globalStyles.title, { fontSize: 18, marginTop: 14, marginBottom: 2 }]}>
              Mis Carreras Registradas 🏅
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.carreraCard}>
            {item.imagenUri && (
              <Image source={{ uri: item.imagenUri }} style={styles.carreraImage} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.carreraTitle}>{item.nombre}</Text>
              <Text style={styles.carreraText}>📍 Lugar: {item.lugar}</Text>
              <Text style={styles.carreraText}>👣 Distancia: {item.distancia}</Text>
              <Text style={styles.carreraText}>⏱️ Tiempo total: {item.tiempo}</Text>
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
            <Text style={styles.cardTitle}>Registrar Nueva Carrera</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Nombre de la carrera (ej. Maratón de BA)"
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

            <Text style={styles.label}>Selecciona la distancia</Text>
            <View style={styles.selectorContainer}>
              {distanciasDisponibles.map((item) => {
                const isActive = distanciaSeleccionada === item.value;
                return (
                  <TouchableOpacity
                    key={item.label}
                    style={[styles.selectorButton, isActive && styles.activeButton]}
                    onPress={() => setDistanciaSeleccionada(item.value)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.selectorText, isActive && styles.activeText]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Input adicional solo cuando selecciona "Otra" */}
            {distanciaSeleccionada === 'Otra' && (
              <TextInput
                style={styles.input}
                placeholder="Ingresa la distancia en km (ej. 15)"
                placeholderTextColor={colors.textSecondary}
                value={distanciaPersonalizada}
                onChangeText={setDistanciaPersonalizada}
                keyboardType="numeric"
              />
            )}

            <Text style={styles.label}>Tiempo (Horas : Minutos : Segundos)</Text>
            <View style={styles.timeRow}>
              <TextInput
                style={[styles.input, styles.timeInput]}
                value={horasCarrera}
                onChangeText={setHorasCarrera}
                placeholder="Hrs"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
              />
              <Text style={styles.separator}>:</Text>
              <TextInput
                style={[styles.input, styles.timeInput]}
                value={minutosCarrera}
                onChangeText={setMinutosCarrera}
                placeholder="Min"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
              />
              <Text style={styles.separator}>:</Text>
              <TextInput
                style={[styles.input, styles.timeInput]}
                value={segundosCarrera}
                onChangeText={setSegundosCarrera}
                placeholder="Seg"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
              />
            </View>

            {/* Botón para seleccionar foto (Cámara / Galería) */}
            <TouchableOpacity style={styles.imagePickerButton} onPress={seleccionarImagen}>
              <Ionicons name="camera-outline" size={20} color={colors.text} style={{ marginRight: 6 }} />
              <Text style={{ color: colors.text, fontWeight: '600' }}>
                {imagenUri ? 'Foto seleccionada ✓' : 'Adjuntar foto de la carrera'}
              </Text>
            </TouchableOpacity>

            {imagenUri && (
              <Image source={{ uri: imagenUri }} style={styles.previewImage} />
            )}

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
  label: { color: colors.text, marginBottom: 6, fontSize: 13, alignSelf: 'flex-start' },
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
  selectorContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 4,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.textSecondary,
  },
  selectorButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeButton: {
    backgroundColor: colors.primary,
  },
  selectorText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  timeInput: {
    flex: 1,
    textAlign: 'center',
    marginBottom: 0,
  },
  separator: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 6,
  },
  imagePickerButton: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  previewImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
    resizeMode: 'cover',
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
  carreraImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 10,
    resizeMode: 'cover',
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