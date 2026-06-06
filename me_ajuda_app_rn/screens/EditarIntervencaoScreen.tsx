import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditarIntervencao'>;

const EditarIntervencaoScreen = ({ route, navigation }: Props) => {
  const { intervencao } = route.params;

  const [titulo, setTitulo] = useState(intervencao.titulo);
  const [dataExec, setDataExec] = useState(intervencao.data_exec);
  const [relato, setRelato] = useState(intervencao.relato);
  const [custoTrab, setCustoTrab] = useState(String(intervencao.custo_trab));
  const [ocorrenciaId, setOcorrenciaId] = useState(String(intervencao.ocorrencia));
  const [funcionarioId, setFuncionarioId] = useState(String(intervencao.funcionario));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTitulo(intervencao.titulo);
    setDataExec(intervencao.data_exec.split('-').reverse().join('/'));
    setRelato(intervencao.relato);
    setCustoTrab(String(intervencao.custo_trab));
    setOcorrenciaId(String(intervencao.ocorrencia));
    setFuncionarioId(String(intervencao.funcionario));
  }, [intervencao]);

  const dataFormatada = dataExec.split('/').reverse().join('-');

  const handleSave = async () => {
    setSaving(true);

    if (!titulo || !dataExec || !relato || !custoTrab || !ocorrenciaId || !funcionarioId) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      setSaving(false);
      return;
    }

    const res = await fetch(
      `http://localhost:8000/intervencoes/api/${intervencao.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo,
          data_exec: dataFormatada,
          relato,
          custo_trab: parseFloat(custoTrab),
          ocorrencia: parseInt(ocorrenciaId),
          funcionario: parseInt(funcionarioId)
        }),
      }
    );
    navigation.navigate('Intervencoes');
    setSaving(false);
  };

  return (
    <ScrollView style={styles.container}>
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
        {saving ? (
          <ActivityIndicator size="large" color="#4B7BE5" />
        ) : (
          <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
        )}
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
    marginBottom: 12,
  }
});

export default EditarIntervencaoScreen;