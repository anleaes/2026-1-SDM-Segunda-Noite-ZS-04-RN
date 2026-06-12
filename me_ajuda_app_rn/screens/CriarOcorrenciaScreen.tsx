import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CriarOcorrencia'>;

const CriarOcorrenciaScreen = ({ navigation }: Props) => {

  const [titulo, setTitulo] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [descricao, setDescricao] = useState('');
  const [cidadaoId, setCidadaoId] = useState('');
  const [servicoId, setServicoId] = useState('');
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setTitulo('');
      setEndereco('');
      setNumero('');
      setComplemento('');
      setDescricao('');
      setCidadaoId('');
      setServicoId('');
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);

    if (!titulo || !endereco || !descricao || !cidadaoId || !servicoId) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      setSaving(false);
      return;
    }

    const resOcorrencia = await fetch('http://localhost:8000/ocorrencias/api/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo,
        endereco,
        numero: numero || null,
        complemento: complemento || null,
        descricao,
        cidadao: parseInt(cidadaoId),
        servico: parseInt(servicoId),
        status: 'ABE'
      }),
    });

    if (!resOcorrencia.ok) {
      const errorData = await resOcorrencia.json();
      alert('Erro de API ao criar ocorrência: ' + JSON.stringify(errorData));
      setSaving(false);
      return;
    }

    const ocorrenciaCriada = await resOcorrencia.json();
    const ocorrenciaId = ocorrenciaCriada.id;

    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const dia = String(agora.getDate()).padStart(2, '0');

    const numeroProtocolo = `${ano}${mes}${dia}-${String(ocorrenciaId).padStart(6, '0')}`;

    const prazo = new Date(agora);
    prazo.setDate(prazo.getDate() + 15);
    const prazoFormatado = prazo.toISOString().split('T')[0];

    const resProtocolo = await fetch('http://localhost:8000/protocolos/api/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ocorrencia: ocorrenciaId,
        protocolo_numero: numeroProtocolo,
        gerado_em: agora.toISOString(),
        prazo: prazoFormatado
      }),
    });

    if (!resProtocolo.ok) {
      const errorData = await resProtocolo.json();
      alert('Erro de API ao gerar protocolo: ' + JSON.stringify(errorData));
      setSaving(false);
      return;
    }

    navigation.navigate('Ocorrencias');
    setSaving(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nova Ocorrência</Text>

      <Text style={styles.label}>Título *</Text>
      <TextInput value={titulo} onChangeText={setTitulo} style={styles.input} />

      <Text style={styles.label}>Endereço *</Text>
      <TextInput value={endereco} onChangeText={setEndereco} style={styles.input} />

      <Text style={styles.label}>Número</Text>
      <TextInput value={numero} onChangeText={setNumero} style={styles.input} keyboardType="numeric" />

      <Text style={styles.label}>Complemento</Text>
      <TextInput value={complemento} onChangeText={setComplemento} style={styles.input} />

      <Text style={styles.label}>ID do Cidadão *</Text>
      <TextInput value={cidadaoId} onChangeText={setCidadaoId} style={styles.input} keyboardType="numeric" />

      <Text style={styles.label}>ID do Serviço *</Text>
      <TextInput value={servicoId} onChangeText={setServicoId} style={styles.input} keyboardType="numeric" />

      <Text style={styles.label}>Descrição *</Text>
      <TextInput
        value={descricao}
        onChangeText={setDescricao}
        style={[styles.input, { height: 100 }]}
        multiline
      />

      <View style={styles.buttonSpacer}>
        {saving
          ? <ActivityIndicator size="large" color="#4B7BE5" />
          : <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
        }
      </View>
      <Button title="Cancelar" onPress={() => navigation.navigate('Ocorrencias')} color="#6c757d" />

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

export default CriarOcorrenciaScreen;
