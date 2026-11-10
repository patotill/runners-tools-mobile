# 🏃‍♂️ Runner's Tools Mobile

**Runner's Tools Mobile** es una aplicación móvil desarrollada en **React Native** con **Expo** y **TypeScript** diseñada para corredores. Permite gestionar perfiles de usuario personalizados, registrar carreras por distancias estándar o personalizadas, controlar tiempos con formato detallado y utilizar herramientas de cálculo y análisis deportivo.

---

## 🚀 Características Principales

- **👤 Autenticación y Gestión de Usuarios**:
  - **Registro de usuarios (`RegisterScreen.tsx`)**: Captura de datos personales completos (nombre, apellido, fecha de nacimiento, nacionalidad, correo electrónico y contraseña).
  - **Inicio de sesión (`LoginScreen.tsx`)**: Autenticación segura con opción de retorno fluido al inicio (`navigation.goBack()`).
  - **Perfil dinámico (`UserDetailScreen.tsx`)**: Visualización de los datos del usuario logueado e historial de carreras indexado de forma independiente por cada usuario.

- **🛣️ Registro y Gestión Dinámica de Carreras**:
  - **Selector de distancias**: Botones de selección rápida (`5K`, `10K`, `21K`, `42K`) y opción `"Otra"` para ingresar distancias personalizadas en kilómetros.
  - **Tiempo detallado**: Formato de entrada en tres campos independientes (Horas, Minutos y Segundos).
  - **Listado interactivo**: Renderizado mediante `FlatList` con funcionalidades de alta y baja (eliminación) de registros.
  - **📸 Cámara y Galería Nativa**: Integración mediante `expo-image-picker` para adjuntar fotos de evidencia a cada carrera con gestión de permisos en Android e iOS.

- **🧮 Calculadora de Ritmos y Predicciones (`CalculadoraScreen.tsx`)**:
  - **Calculadora de ritmo (Pace Calculator)**: Obtención del ritmo exacto por kilómetro en función de la distancia y el tiempo total.
  - **Predictor de tiempos**: Estimaciones de rendimiento proyectadas para diferentes distancias de carrera.
  - **🏆 Récords Mundiales (WR)**: Sección informativa con las marcas mundiales actuales para referencia de los corredores.

- **🧭 Arquitectura de Navegación (`AppNavigator.tsx`)**:
  - Combinación de navegación por pestañas (`Bottom Tabs`) y pantallas apiladas (`Native Stack`) para una experiencia de usuario ágil y coherente.

---

## 📂 Estructura del Proyecto

```text
runners-tools-mobile/
├── .claude/
│   └── settings.json
├── .expo/
├── assets/
├── node_modules/
├── src/
│   ├── components/
│   │   └── Layout.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   ├── screens/
│   │   ├── CalculadoraScreen.tsx
│   │   ├── InicioScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   └── UserDetailScreen.tsx
│   ├── styles/
│   │   ├── colors.ts
│   │   └── global.ts
│   └── types/
│       ├── index.ts
│       └── usuarios.ts
├── .gitignore
├── AGENTS.md
├── app.json
├── App.tsx
├── index.ts
├── LICENSE
├── package-lock.json
└── package.json

🛠️ Tecnologías Utilizadas
React Native & Expo SDK

TypeScript (Tipado estático)

React Navigation (@react-navigation/native, @react-navigation/bottom-tabs, @react-navigation/native-stack)

Expo Image Picker (expo-image-picker)

Expo Vector Icons (@expo/vector-icons)

💻 Instalación y Configuración Local
Clonar el repositorio:

Bash
git clone [https://github.com/tu-usuario/runners-tools-mobile.git](https://github.com/tu-usuario/runners-tools-mobile.git)
cd runners-tools-mobile
Instalar dependencias:

Bash
npm install
Iniciar el servidor de desarrollo de Expo:

Bash
npx expo start
Escanea el código QR desde la aplicación Expo Go en tu dispositivo móvil (Android/iOS) o presiona a para emulador Android / i para simulador iOS.
