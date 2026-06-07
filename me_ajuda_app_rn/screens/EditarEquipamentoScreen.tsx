import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditarEquipamento'>;

const EditarEquipamentoScreen = ({ route, navigation }: Props) => {
  const { equipamento } = route.params;

  const [nome, setNome] = useState(equipamento.nome);
  const [descricao, setDescricao] = useState(equipamento.descricao);
  const [preco, setPreco] = useState(String(equipamento.preco));
  const [disponivel, setDisponivel] = useState(equipamento.disponivel);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNome(equipamento.nome);
    setDescricao(equipamento.descricao);
    setPreco(String(equipamento.preco));
    setDisponivel(equipamento.disponivel);
  }, [equipamento]);

  const handleSave = async () => {
    setSaving(true);

    if (!nome || !descricao || !preco) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      setSaving(false);
      return;
    }

    const res = await fetch(
      `http://localhost:8000/equipamentos/api/${equipamento.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          descricao,
          preco: parseFloat(preco),
          disponivel
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      alert('Erro de API: ' + JSON.stringify(errorData));
      setSaving(false);
      return;
    }

    navigation.navigate('Equipamentos');
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        value={descricao}
        onChangeText={setDescricao}
        style={[styles.input, { height: 100 }]}
        multiline
      />

      <Text style={styles.label}>Preço (R$)</Text>
      <TextInput
        value={preco}
        onChangeText={setPreco}
        style={styles.input}
        keyboardType="numeric"
      />

      <View style={styles.switchContainer}>
        <Text style={styles.labelSwitch}>Disponível para uso?</Text>
        <Switch
          value={disponivel}
          onValueChange={setDisponivel}
          trackColor={{ false: "#ccc", true: "#4B7BE5" }}
        />
      </View>

      <View style={styles.buttonSpacer}>
        {saving ? (
          <ActivityIndicator size="large" color="#4B7BE5" />
        ) : (
          <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
        )}
      </View>
      <Button title="Voltar" onPress={() => navigation.navigate('Equipamentos')} color="#6c757d" />
    </View>
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 24,
  },
  labelSwitch: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonSpacer: {
    marginBottom: 12,
  }
});

export default EditarEquipamentoScreen;