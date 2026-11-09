import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      {/* 1. Imagen de fondo */}
      <Image 
        source={require('../../assets/Pista.png')} 
        style={styles.backgroundImage} 
        resizeMode="cover"
      />
      
      {/* 2. Capa oscura semitransparente (Overlay) */}
      <View style={styles.overlay} />

      {/* 3. Contenido de las pantallas */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // más o menos oscuridad
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});

export default Layout;