import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAuth } from '../context/AuthContext'; // 1. Importas el hook del contexto
import { globalStyles } from '../styles/global';
import { colors } from '../styles/colors';

type InicioScreenNavProp = NativeStackNavigationProp<RootStackParamList, 'Inicio'>;

type Props = {
  navigation: InicioScreenNavProp;
};

const InicioScreen: React.FC<Props> = ({ navigation }) => {
  const { usuarioLogueado } = useAuth(); // 2. Obtienes el estado de la sesión global

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Runner's Tools 🏃‍♂️</Text>
      
      <Text style={globalStyles.text}>
        Calcula ritmos de carrera y predice tus tiempos finales para media maratón, maratón o cualquier distancia objetivo.
      </Text>

      {/* 3. Condicionamos la vista: si hay un usuario logueado, ocultamos los botones de acceso */}
      {usuarioLogueado ? (
        <View style={{ marginTop: 20, alignItems: 'center', width: '100%' }}>
          <Text style={{ color: colors.text, fontSize: 16, fontWeight: 'bold', marginBottom: 6 }}>
            Sesión activa:
          </Text>
          <Text style={{ color: colors.textSecondary || '#aaa', fontSize: 14, textAlign: 'center' }}>
            {usuarioLogueado.nombre} {usuarioLogueado.apellido} ({usuarioLogueado.email})
          </Text>
        </View>
      ) : (
        /* Si NO hay sesión, mostramos los botones normalmente */
        <View style={{ width: '100%', marginTop: 10 }}>
          {/* Botón de Iniciar Sesión */}
          <View style={{ marginBottom: 12, width: '100%' }}>
            <Button 
              title="Iniciar Sesión" 
              color={colors.primary}
              onPress={() => navigation.navigate('Login')} 
            />
          </View>

          {/* Botón de Registrarse */}
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
  );
};

export default InicioScreen;