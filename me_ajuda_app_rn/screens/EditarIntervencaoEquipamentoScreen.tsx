import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditarIntervencaoEquipamento'>;

const EditarIntervencaoEquipamentoScreen = ({ route, navigation }: Props) => {
  const { intervencaoEquipamento } = route.params;

  const [intervencaoId, setIntervencaoId] = useState(String(intervencaoEquipamento.intervencao));
  const [equipamentoId, setEquipamentoId] = useState(String(intervencaoEquipamento.equipamento));
  const [horasUsado, setHorasUsado] = useState(String(intervencaoEquipamento.horas_usado));
  const [custoTotal, setCustoTotal] = useState(String(intervencaoEquipamento.custo_total));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setIntervencaoId(String(intervencaoEquipamento.intervencao));
    setEquipamentoId(String(intervencaoEquipamento.equipamento));
    setHorasUsado(String(intervencaoEquipamento.horas_usado));
    setCustoTotal(String(intervencaoEquipamento.custo_total));
  }, [intervencaoEquipamento]);

  const handleSave = async () => {
    setSaving(true);

    if (!intervencaoId || !equipamentoId || !horasUsado || !custoTotal) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      setSaving(false);
      return;
    }

    const payload = {
      intervencao: parseInt(intervencaoId),
      equipamento: parseInt(equipamentoId),
      horas_usado: parseInt(horasUsado),
      custo_total: parseFloat(custoTotal.replace(',', '.')),
    };

    const res = await fetch(
      `http://localhost:8000/equipamentos_intervencao/api/${intervencaoEquipamento.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    navigation.navigate('IntervencoesEquipamentos');
    setSaving(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>ID da Intervenção</Text>
      <TextInput
        value={intervencaoId}
        onChangeText={setIntervencaoId}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>ID do Equipamento</Text>
      <TextInput
        value={equipamentoId}
        onChangeText={setEquipamentoId}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Horas Usado</Text>
      <TextInput
        value={horasUsado}
        onChangeText={setHorasUsado}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Custo Total (R$)</Text>
      <TextInput
        value={custoTotal}
        onChangeText={setCustoTotal}
        style={styles.input}
        keyboardType="numeric"
      />

      <View style={styles.buttonSpacer}>
        {saving ? (
          <ActivityIndicator size="large" color="#4B7BE5" />
        ) : (
          <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
        )}
      </View>

      <View style={styles.buttonSpacer}>
        <Button title="Voltar" onPress={() => navigation.navigate('IntervencoesEquipamentos')} color="#6c757d" />
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  buttonSpacer: {
    marginTop: 16,
  }
});

export default EditarIntervencaoEquipamentoScreen;