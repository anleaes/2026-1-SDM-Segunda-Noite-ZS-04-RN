import { DrawerScreenProps } from '@react-navigation/drawer';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditarCidadao'>;

const EditarCidadaoScreen = ({ route, navigation }: Props) => {
  const { cidadao } = route.params;

  const [nome, setNome] = useState(cidadao.nome || '');
  const [sobrenome, setSobrenome] = useState(cidadao.sobrenome || '');
  const [cpf, setCpf] = useState(cidadao.cpf || '');
  const [email, setEmail] = useState(cidadao.email || '');

  const [fone, setFone] = useState(cidadao.fone || '');
  const [endereco, setEndereco] = useState(cidadao.endereco || '');
  const [cep, setCep] = useState(cidadao.cep || '');
  const [bairro, setBairro] = useState(cidadao.bairro || '');

  const [userId, setUserId] = useState(String(cidadao.user));

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNome(cidadao.nome || '');
    setSobrenome(cidadao.sobrenome || '');
    setCpf(cidadao.cpf || '');
    handleCpfChange(cidadao.cpf);
    setEmail(cidadao.email || '');
    setFone(cidadao.fone || '');
    setEndereco(cidadao.endereco || '');
    setCep(cidadao.cep || '');
    setBairro(cidadao.bairro || '');
    setUserId(String(cidadao.user));
  }, [cidadao]);

  const handleSave = async () => {
    setSaving(true);

    if (!nome || !sobrenome || !cpf || !email || !userId) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      setSaving(false);
      return;
    }

    const res = await fetch(`http://localhost:8000/cidadaos/api/${cidadao.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome,
        sobrenome,
        cpf: cpfFormatado,
        email,
        user: parseInt(userId),
        fone,
        endereco,
        cep,
        bairro
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      alert('Erro de API: ' + JSON.stringify(errorData));
      setSaving(false);
      return;
    }

    navigation.navigate('Cidadaos');
    setSaving(false);
  };

  const handleCpfChange = (text: string) => {
    let formatted = text.replace(/\D/g, '');

    if (formatted.length > 11) {
      formatted = formatted.substring(0, 11);
    }

    formatted = formatted.replace(/(\d{3})(\d)/, '$1.$2');
    formatted = formatted.replace(/(\d{3})(\d)/, '$1.$2');
    formatted = formatted.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    setCpf(formatted);
  };

  const cpfFormatado = cpf.replace(/\D/g, '').substring(0, 11);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Dados Básicos</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput value={nome} onChangeText={setNome} style={styles.input} />

      <Text style={styles.label}>Sobrenome</Text>
      <TextInput value={sobrenome} onChangeText={setSobrenome} style={styles.input} />

      <Text style={styles.label}>CPF</Text>
      <TextInput value={cpf} onChangeText={handleCpfChange} style={styles.input} keyboardType="numeric" />

      <Text style={styles.label}>E-mail</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />

      <Text style={styles.label}>ID do User</Text>
      <TextInput value={userId} onChangeText={setUserId} style={styles.input} keyboardType="numeric" />

      <Text style={styles.sectionTitle}>Dados do Cidadão</Text>
      <Text style={styles.label}>Telefone</Text>
      <TextInput value={fone} onChangeText={setFone} style={styles.input} keyboardType="phone-pad" />

      <Text style={styles.label}>Endereço</Text>
      <TextInput value={endereco} onChangeText={setEndereco} style={styles.input} />

      <Text style={styles.label}>CEP</Text>
      <TextInput value={cep} onChangeText={setCep} style={styles.input} keyboardType="numeric" />

      <Text style={styles.label}>Bairro</Text>
      <TextInput value={bairro} onChangeText={setBairro} style={styles.input} />

      <View style={styles.buttonSpacer}>
        {saving ? (
          <ActivityIndicator size="large" color="#4B7BE5" />
        ) : (
          <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
        )}
      </View>
      <Button title="Cancelar" onPress={() => navigation.navigate('Cidadaos')} color="#6c757d" />

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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B7BE5',
    marginTop: 10,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 4,
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 12,
  },
  labelSwitch: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonSpacer: {
    marginTop: 16,
    marginBottom: 12,
  }
});

export default EditarCidadaoScreen;