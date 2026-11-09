import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../types';
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/global';
import Layout from '../components/Layout'; // 1. Importas el componente Layout

type Props = BottomTabScreenProps<RootStackParamList, 'Calc'>;

const CalculadoraScreen: React.FC<Props> = () => {
  const [distancia, setDistancia] = useState('');
  const [tiempo, setTiempo] = useState('');
  const [ritmoCalculado, setRitmoCalculado] = useState<string | null>(null);

  const calcularRitmo = () => {
    const dist = parseFloat(distancia);
    const min = parseFloat(tiempo);
    if (!isNaN(dist) && !isNaN(min) && dist > 0 && min > 0) {
      const ritmoMinutosTotales = min / dist;
      const minutos = Math.floor(ritmoMinutosTotales);
      const segundos = Math.round((ritmoMinutosTotales - minutos) * 60);
      setRitmoCalculado(`${minutos}:${segundos < 10 ? '0' : ''}${segundos} min/km`);
    } else {
      setRitmoCalculado('Por favor ingresa valores válidos');
    }
  };

  return (
    /* 2. Envolvemos todo dentro de Layout y usamos backgroundColor transparente */
    <Layout>
      <View style={[globalStyles.container, styles.calcContainer, { backgroundColor: 'transparent' }]}>
        <Text style={globalStyles.title}>Calculadora de Ritmo</Text>

        <Text style={styles.label}>Distancia (km)</Text>
        <TextInput
          style={styles.input}
          value={distancia}
          onChangeText={setDistancia}
          placeholder="Ej: 10"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Tiempo total (minutos)</Text>
        <TextInput
          style={styles.input}
          value={tiempo}
          onChangeText={setTiempo}
          placeholder="Ej: 50"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
        />

        <Button title="Calcular Ritmo" color={colors.primary} onPress={calcularRitmo} />

        {ritmoCalculado && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>Ritmo: {ritmoCalculado}</Text>
          </View>
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  calcContainer: { padding: 20, justifyContent: 'center', width: '100%' },
  label: { color: colors.text, marginBottom: 6, fontSize: 14, alignSelf: 'flex-start' },
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
  resultBox: { marginTop: 20, padding: 15, backgroundColor: colors.card, borderRadius: 8, alignItems: 'center', width: '100%' },
  resultText: { color: colors.primary, fontSize: 18, fontWeight: 'bold' },
});

export default CalculadoraScreen;