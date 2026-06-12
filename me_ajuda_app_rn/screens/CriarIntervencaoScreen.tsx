import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CriarIntervencao'>;

const CriarIntervencaoScreen = ({ navigation }: Props) => {

  const [titulo, setTitulo] = useState('');
  const [dataExec, setDataExec] = useState('');
  const [relato, setRelato] = useState('');
  const [custoTrab, setCustoTrab] = useState('');
  const [ocorrenciaId, setOcorrenciaId] = useState('');
  const [funcionarioId, setFuncionarioId] = useState('');
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setTitulo('');
      setDataExec('');
      setRelato('');
      setCustoTrab('');
      setOcorrenciaId('');
      setFuncionarioId('');
    }, [])
  );

  const dataFormatada = dataExec.split('/').reverse().join('-');

  const handleDateChange = (text: string) => {
    let formatted = text.replace(/\D/g, '');

    if (formatted.length > 2) {
      formatted = formatted.replace(/^(\d{2})(\d)/, '$1/$2');
    }

    if (formatted.length > 5) {
      formatted = formatted.replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
    }

    setDataExec(formatted.substring(0, 10));
  };

  const handleSave = async () => {
    setSaving(true);

    if (!titulo || !dataExec || !relato || !custoTrab || !ocorrenciaId || !funcionarioId) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      setSaving(false);
      return;
    }

    const res = await fetch('http://localhost:8000/intervencoes/api/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo,
        data_exec: dataFormatada,
        relato,
        custo_trab: parseFloat(custoTrab),
        ocorrencia: ocorrenciaId,
        funcionario: funcionarioId
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      alert('Erro de API: ' + JSON.stringify(errorData));
      setSaving(false);
      return;
    }

    navigation.navigate('Intervencoes');
    setSaving(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nova Intervenção</Text>

      <Text style={styles.label}>Título *</Text>
      <TextInput
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />

      <Text style={styles.label}>Data de Execução (DD/MM/AAAA) *</Text>
      <TextInput
        value={dataExec}
        onChangeText={handleDateChange}
        style={styles.input}
        placeholder="Ex: 31/05/2026"
      />

      <Text style={styles.label}>Custo do Trabalho (R$) *</Text>
      <TextInput
        value={custoTrab}
        onChangeText={setCustoTrab}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>ID da Ocorrência *</Text>
      <TextInput
        value={ocorrenciaId}
        onChangeText={setOcorrenciaId}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>ID do Funcionário *</Text>
      <TextInput
        value={funcionarioId}
        onChangeText={setFuncionarioId}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Relato *</Text>
      <TextInput
        value={relato}
        onChangeText={setRelato}
        style={[styles.input, { height: 100 }]}
        multiline
      />

      <View style={styles.buttonSpacer}>
        {saving
          ? <ActivityIndicator size="large" color="#4B7BE5" />
          : <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
        }
      </View>
      <Button title="Voltar" onPress={() => navigation.navigate('Intervencoes')} color="#6c757d" />

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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    alignSelf: 'center'
  },
  label: {
    fontWeight: '600',
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
    marginBottom: 12,
  }
});

export default CriarIntervencaoScreen;