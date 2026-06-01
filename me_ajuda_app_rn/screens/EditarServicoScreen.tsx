import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator'

type Props = DrawerScreenProps<DrawerParamList, 'EditarServico'>;

const EditarServicoScreen = ({ route, navigation }: Props) => {
  const { servico } = route.params;
  
  const [nome, setNome] = useState(servico.nome);
  const [descricao, setDescricao] = useState(servico.descricao);
  const [nivelPrioridade, setNivelPrioridade] = useState(String(servico.nivel_prioridade));
  const [secretariaId, setSecretariaId] = useState(String(servico.secretaria));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNome(servico.nome);
    setDescricao(servico.descricao);
    setNivelPrioridade(String(servico.nivel_prioridade));
    setSecretariaId(String(servico.secretaria));
  }, [servico]);  

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(
      `http://localhost:8000/servicos/api/${servico.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nome, 
          descricao, 
          nivel_prioridade: parseInt(nivelPrioridade) || 0,
          secretaria: parseInt(secretariaId) || null
        }),
      }
    );
    navigation.navigate('Servicos');        
    setSaving(false);  
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nome do Serviço</Text>
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
        {saving ? (
          <ActivityIndicator size="large" color="#4B7BE5" />
        ) : (
          <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
        )}
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

export default EditarServicoScreen;