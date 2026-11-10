import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/global';
import Layout from '../components/Layout';

type Props = BottomTabScreenProps<RootStackParamList, 'Calc'>;

const CalculadoraScreen: React.FC<Props> = () => {
  // Estados calculadora
  const [distanciaRitmo, setDistanciaRitmo] = useState<number>(10);
  const [horasRitmo, setHorasRitmo] = useState('');
  const [minutosRitmo, setMinutosRitmo] = useState('');
  const [segundosRitmo, setSegundosRitmo] = useState('');
  const [ritmoCalculado, setRitmoCalculado] = useState<string | null>(null);

  // Estados predictor
  const [horasPred, setHorasPred] = useState('');
  const [minutosPred, setMinutosPred] = useState('');
  const [segundosPred, setSegundosPred] = useState('');
  const [resultadoMedia, setResultadoMedia] = useState<string | null>(null);
  const [resultadoMaraton, setResultadoMaraton] = useState<string | null>(null);

  const distanciasDisponibles = [
    { label: '5K', value: 5 },
    { label: '10K', value: 10 },
    { label: '21K', value: 21.0975 },
    { label: '42K', value: 42.195 },
  ];

  const calcularRitmo = () => {
    const h = parseFloat(horasRitmo) || 0;
    const m = parseFloat(minutosRitmo) || 0;
    const s = parseFloat(segundosRitmo) || 0;

    const totalMinutos = (h * 60) + m + (s / 60);

    if (distanciaRitmo > 0 && totalMinutos > 0) {
      const ritmoTotales = totalMinutos / distanciaRitmo;
      const minRes = Math.floor(ritmoTotales);
      const segRes = Math.round((ritmoTotales - minRes) * 60);
      setRitmoCalculado(`${minRes}:${segRes < 10 ? '0' : ''}${segRes} min/km`);
    } else {
      setRitmoCalculado('Ingresa un tiempo válido');
    }
  };

  const calcularPredicciones = () => {
    const h = parseFloat(horasPred) || 0;
    const m = parseFloat(minutosPred) || 0;
    const s = parseFloat(segundosPred) || 0;

    const totalMinutos10K = (h * 60) + m + (s / 60);

    if (totalMinutos10K <= 0) {
      setResultadoMedia('Ingresa un tiempo válido');
      setResultadoMaraton('Ingresa un tiempo válido');
      return;
    }

    const totalMinutosMedia = totalMinutos10K * 2.2;
    const hrsMedia = Math.floor(totalMinutosMedia / 60);
    const minsMedia = Math.round(totalMinutosMedia % 60);
    const textoMedia = `${hrsMedia > 0 ? hrsMedia + 'h ' : ''}${minsMedia} min`;

    const totalMinutosMaraton = totalMinutosMedia * 2.1;
    const hrsMaraton = Math.floor(totalMinutosMaraton / 60);
    const minsMaraton = Math.round(totalMinutosMaraton % 60);
    const textoMaraton = `${hrsMaraton > 0 ? hrsMaraton + 'h ' : ''}${minsMaraton} min`;

    setResultadoMedia(textoMedia);
    setResultadoMaraton(textoMaraton);
  };

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[globalStyles.container, styles.calcContainer, { backgroundColor: 'transparent' }]}>
          
          {/* CONTENEDOR CALCULADORA */}
          <View style={styles.card}>
            <View style={styles.titleContainer}>
              <Ionicons name="stopwatch-outline" size={22} color={colors.text} style={styles.iconStyle} />
              <Text style={styles.cardTitle}>Calculadora de Ritmo</Text>
            </View>

            <Text style={styles.label}>Selecciona la distancia</Text>
            <View style={styles.selectorContainer}>
              {distanciasDisponibles.map((item) => {
                const isActive = distanciaRitmo === item.value;
                return (
                  <TouchableOpacity
                    key={item.label}
                    style={[styles.selectorButton, isActive && styles.activeButton]}
                    onPress={() => setDistanciaRitmo(item.value)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.selectorText, isActive && styles.activeText]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.label}>Tiempo estimado (Horas : Minutos : Segundos)</Text>
            <View style={styles.timeRow}>
              <TextInput
                style={[styles.input, styles.timeInput]}
                value={horasRitmo}
                onChangeText={setHorasRitmo}
                placeholder="Hrs"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
              />
              <Text style={styles.separator}>:</Text>
              <TextInput
                style={[styles.input, styles.timeInput]}
                value={minutosRitmo}
                onChangeText={setMinutosRitmo}
                placeholder="Min"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
              />
              <Text style={styles.separator}>:</Text>
              <TextInput
                style={[styles.input, styles.timeInput]}
                value={segundosRitmo}
                onChangeText={setSegundosRitmo}
                placeholder="Seg"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
              />
            </View>

            <Button title="Calcular Ritmo" color={colors.primary} onPress={calcularRitmo} />

            {ritmoCalculado && (
              <View style={styles.resultBox}>
                <Text style={styles.resultText}>Ritmo: {ritmoCalculado}</Text>
              </View>
            )}
          </View>

          {/* CONTENEDOR PREDICTOR */}
          <View style={styles.card}>
            <View style={styles.titleContainer}>
              <Ionicons name="trending-up-outline" size={22} color={colors.text} style={styles.iconStyle} />
              <Text style={styles.cardTitle}>Predictor de Carrera (21k y 42k)</Text>
            </View>

            <Text style={styles.label}>Ingresa tu tiempo de referencia en 10K:</Text>
            <View style={styles.timeRow}>
              <TextInput
                style={[styles.input, styles.timeInput]}
                value={horasPred}
                onChangeText={setHorasPred}
                placeholder="Hrs"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
              />
              <Text style={styles.separator}>:</Text>
              <TextInput
                style={[styles.input, styles.timeInput]}
                value={minutosPred}
                onChangeText={setMinutosPred}
                placeholder="Min"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
              />
              <Text style={styles.separator}>:</Text>
              <TextInput
                style={[styles.input, styles.timeInput]}
                value={segundosPred}
                onChangeText={setSegundosPred}
                placeholder="Seg"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
              />
            </View>

            <Button title="Calcular Predicciones" color={colors.primary} onPress={calcularPredicciones} />

            {resultadoMedia && resultadoMaraton && (
              <View style={styles.resultBox}>
                <Text style={styles.resultText}>Tiempo estimado 21K: {resultadoMedia}</Text>
                <Text style={styles.subResultText}>WR - Jomif Kejelcha - 00:56:51 (Bs.As. 23.08.2026)</Text>

                <Text style={[styles.resultText, { marginTop: 10 }]}>Tiempo estimado 42K: {resultadoMaraton}</Text>
                <Text style={styles.subResultText}>WR - Sabastian Sawe - 01:59:30 (Londres 26.04.2026)</Text>
              </View>
            )}
          </View>

        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, paddingVertical: 20 },
  calcContainer: { padding: 15, width: '100%', alignItems: 'stretch' },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.textSecondary,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  iconStyle: {
    marginRight: 8,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: { color: colors.text, marginBottom: 6, fontSize: 13, alignSelf: 'flex-start' },
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
  resultBox: { marginTop: 12, padding: 12, backgroundColor: colors.card, borderRadius: 8, alignItems: 'center', width: '100%' },
  resultText: { color: colors.primary, fontSize: 15, fontWeight: 'bold', textAlign: 'center' },
  subResultText: { color: colors.textSecondary, fontSize: 12, textAlign: 'center', marginTop: 2 },
});

export default CalculadoraScreen;