import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditarSecretaria'>;

const EditarSecretariaScreen = ({ route, navigation }: Props) => {
  const { secretaria } = route.params;

  const [nome, setNome] = useState(secretaria.nome);
  const [sigla, setSigla] = useState(secretaria.sigla);
  const [descricao, setDescricao] = useState(secretaria.descricao);
  const [site, setSite] = useState(secretaria.site);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNome(secretaria.nome);
    setSigla(secretaria.sigla);
    setDescricao(secretaria.descricao);
    setSite(secretaria.site);
  }, [secretaria]);

  const handleSave = async () => {
    setSaving(true);

    if (!nome || !sigla || !descricao || !site) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      setSaving(false);
      return;
    }

    const res = await fetch(
      `http://localhost:8000/secretarias/api/${secretaria.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, sigla, descricao, site }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      alert('Erro de API: ' + JSON.stringify(errorData));
      setSaving(false);
      return;
    }

    navigation.navigate('Secretarias');
    setSaving(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <Text style={styles.label}>Sigla</Text>
      <TextInput
        value={sigla}
        onChangeText={setSigla}
        style={styles.input}
        autoCapitalize="characters"
      />

      <Text style={styles.label}>Site</Text>
      <TextInput
        value={site}
        onChangeText={setSite}
        style={styles.input}
        keyboardType="url"
        autoCapitalize="none"
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
      <Button title="Cancelar" onPress={() => navigation.navigate('Secretarias')} color="#6c757d" />

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

export default EditarSecretariaScreen;