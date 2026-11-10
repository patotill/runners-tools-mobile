import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { useAuth } from '../context/AuthContext';
import { globalStyles } from '../styles/global';
import { colors } from '../styles/colors';
import Layout from '../components/Layout';

type InicioScreenNavProp = NativeStackNavigationProp<RootStackParamList, 'Inicio'>;

type Props = {
  navigation: InicioScreenNavProp;
};

const InicioScreen: React.FC<Props> = ({ navigation }) => {
  const { usuarioLogueado, cerrarSesion } = useAuth();

  return (
    <Layout>
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Runner's Tools 🏃‍♂️</Text>
        
        <Text style={globalStyles.text}>
          Calcula ritmos de carrera y predice tus tiempos finales para media maratón, maratón o cualquier distancia objetivo.
        </Text>

      {/* Condición si hay un usuario logueado */}
      {usuarioLogueado ? (
        <View style={{ marginTop: 20, alignItems: 'center', width: '100%' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <Ionicons name="person-outline" size={20} color={colors.primary} style={{ marginRight: 6 }} />
            <Text style={{ color: colors.text, fontSize: 16, fontWeight: 'bold' }}>
              Sesión activa:
            </Text>
          </View>
          <Text style={{ color: colors.textSecondary || '#aaa', fontSize: 14, textAlign: 'center', marginBottom: 16 }}>
            {usuarioLogueado.nombre} {usuarioLogueado.apellido} ({usuarioLogueado.email})
          </Text>

          {/* Botón de Cerrar Sesión en la pantalla de inicio */}
          <View style={{ width: '100%' }}>
            <Button 
              title="Cerrar Sesión" 
              color={colors.primary} 
              onPress={() => cerrarSesion()} 
            />
          </View>
        </View>
      ) : (
        /* Si no hay sesión, muestra los botones de login y registro */
        <View style={{ width: '100%', marginTop: 10 }}>
          <View style={{ marginBottom: 12, width: '100%' }}>
            <Button 
              title="Ingresar a tu cuenta" 
              color={colors.primary}
              onPress={() => navigation.navigate('Login')} 
            />
          </View>

          <View style={{ width: '100%' }}>
            <Button 
              title="Registrarse" 
              color={colors.secondary || '#6c757d'} 
              onPress={() => navigation.navigate('Register')} 
            />
          </View>
        </View>
      )}
      </View>
    </Layout>
  );
};

export default InicioScreen;