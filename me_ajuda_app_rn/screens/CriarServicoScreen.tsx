import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CriarServico'>;

const CriarServicoScreen = ({ navigation }: Props) => {

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [nivelPrioridade, setNivelPrioridade] = useState('');
  const [secretariaId, setSecretariaId] = useState('');
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setNome('');
      setDescricao('');
      setNivelPrioridade('');
      setSecretariaId('');
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);

    if (!nome || !descricao || !nivelPrioridade || !secretariaId) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      setSaving(false);
      return;
    }

    await fetch('http://localhost:8000/servicos/api/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        nome, 
        descricao,
        nivel_prioridade: parseInt(nivelPrioridade),
        secretaria: parseInt(secretariaId)
      }),
    });
    navigation.navigate('Servicos');  
    setSaving(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Novo Serviço</Text>
      
      <Text style={styles.label}>Nome</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <Text style={styles.label}>Nível de Prioridade</Text>
      <TextInput
        value={nivelPrioridade}
        onChangeText={setNivelPrioridade}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>ID da Secretaria</Text>
      <TextInput
        value={secretariaId}
        onChangeText={setSecretariaId}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Descrição</Text>
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
      <Button title="Voltar" onPress={() => navigation.navigate('Servicos')} color="#6c757d" />
      
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

export default CriarServicoScreen;