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

  const handleSave = async () => {
    setSaving(true);
    await fetch('http://localhost:8000/intervencoes/api/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo,
        data_exec: dataFormatada,
        relato,
        custo_trab: parseFloat(custoTrab) || 0,
        ocorrencia: ocorrenciaId,
        funcionario: funcionarioId
      }),
    });
    navigation.navigate('Intervencoes');
    setSaving(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nova Intervenção</Text>

      <Text style={styles.label}>Título</Text>
      <TextInput
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />

      <Text style={styles.label}>Data de Execução (DD/MM/AAAA)</Text>
      <TextInput
        value={dataExec}
        onChangeText={setDataExec}
        style={styles.input}
        placeholder="Ex: 31/05/2026"
      />

      <Text style={styles.label}>Custo do Trabalho (R$)</Text>
      <TextInput
        value={custoTrab}
        onChangeText={setCustoTrab}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>ID da Ocorrência</Text>
      <TextInput
        value={ocorrenciaId}
        onChangeText={setOcorrenciaId}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>ID do Funcionário</Text>
      <TextInput
        value={funcionarioId}
        onChangeText={setFuncionarioId}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Relato</Text>
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