import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator'

type Props = DrawerScreenProps<DrawerParamList, 'EditarOcorrencia'>;

const EditarOcorrenciaScreen = ({ route, navigation }: Props) => {
  const { ocorrencia } = route.params;

  const [titulo, setTitulo] = useState(ocorrencia.titulo);
  const [endereco, setEndereco] = useState(ocorrencia.endereco);
  const [numero, setNumero] = useState(ocorrencia.numero);
  const [complemento, setComplemento] = useState(ocorrencia.complemento || '');
  const [descricao, setDescricao] = useState(ocorrencia.descricao);
  const [status, setStatus] = useState<string>(ocorrencia.status);
  const [cidadaoId, setCidadaoId] = useState(String(ocorrencia.cidadao));
  const [servicoId, setServicoId] = useState(String(ocorrencia.servico));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTitulo(ocorrencia.titulo);
    setEndereco(ocorrencia.endereco);
    setNumero(ocorrencia.numero);
    setComplemento(ocorrencia.complemento || '');
    setDescricao(ocorrencia.descricao);
    setStatus(ocorrencia.status);
    setCidadaoId(String(ocorrencia.cidadao));
    setServicoId(String(ocorrencia.servico));
  }, [ocorrencia]);

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(
      `http://localhost:8000/ocorrencias/api/${ocorrencia.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo,
          endereco,
          numero,
          complemento,
          descricao,
          status,
          cidadao: parseInt(cidadaoId),
          servico: parseInt(servicoId)
        }),
      }
    );
    navigation.navigate('Ocorrencias');
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

      <Text style={styles.label}>Endereço</Text>
      <TextInput
        value={endereco}
        onChangeText={setEndereco}
        style={styles.input}
      />

      <Text style={styles.label}>Número</Text>
      <TextInput
        value={numero}
        onChangeText={setNumero}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Complemento</Text>
      <TextInput
        value={complemento}
        onChangeText={setComplemento}
        style={styles.input}
      />

      <Text style={styles.label}>Status (ABE, AND, FEC)</Text>
      <TextInput
        value={status}
        onChangeText={setStatus}
        style={styles.input}
        maxLength={3}
        autoCapitalize="characters"
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        value={descricao}
        onChangeText={setDescricao}
        style={[styles.input, { height: 100 }]}
        multiline
      />

      <Text style={styles.label}>ID do Cidadão</Text>
      <TextInput
        value={cidadaoId}
        onChangeText={setCidadaoId}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>ID do Serviço</Text>
      <TextInput
        value={servicoId}
        onChangeText={setServicoId}
        style={styles.input}
        keyboardType="numeric"
      />

      <View style={styles.buttonContainer}>
        {saving ? (
          <ActivityIndicator size="large" color="#4B7BE5" />
        ) : (
          <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Voltar" onPress={() => navigation.navigate('Ocorrencias')} color="#6c757d" />
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
  buttonContainer: {
    marginTop: 16,
  }
});

export default EditarOcorrenciaScreen;