import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { colors } from '../styles/colors';

import InicioScreen from '../screens/InicioScreen';
import LoginScreen from '../screens/LoginScreen';
import registerScreen from '../screens/RegisterScreen';
import UsuarioDetailScreen from '../screens/UserDetailScreen';
import CalculadoraScreen from '../screens/CalculadoraScreen';

const Tab = createBottomTabNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Inicio"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: {
            backgroundColor: colors.card,
            borderTopWidth: 0,
          },
          tabBarIcon: ({ color, size, focused }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            switch (route.name) {
              case 'Inicio':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Login':
                iconName = focused ? 'log-in' : 'log-in-outline';
                break;
              case 'Calc':
                iconName = focused ? 'calculator' : 'calculator-outline';
                break;
              case 'UserDetail':
                iconName = focused ? 'person' : 'person-outline';
                break;
              default:
                iconName = 'help-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Inicio"
         component={InicioScreen} />

         <Tab.Screen name="Login"
         component={LoginScreen} 
         options={{ tabBarButton: () => null }} />


        <Tab.Screen name="Calc"
          options={{ tabBarLabel: 'Calculadora' }} >
          {(props) => <CalculadoraScreen {...props} />}
        </Tab.Screen>
        
        
        <Tab.Screen name="Register"
         component={registerScreen}
         options={{ tabBarButton: () => null }} />
         
        <Tab.Screen
          name="UserDetail"
          component={UsuarioDetailScreen}
          options={{ tabBarLabel: 'Mi cuenta' }}
        />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;