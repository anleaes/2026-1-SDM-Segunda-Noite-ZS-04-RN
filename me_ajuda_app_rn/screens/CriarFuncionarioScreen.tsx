import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CriarFuncionario'>;

const CriarFuncionarioScreen = ({ navigation }: Props) => {

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [registro, setRegistro] = useState('');
  const [funcao, setFuncao] = useState('TEC');
  const [ativo, setAtivo] = useState(true);
  const [secretarias, setSecretarias] = useState('');
  const [userId, setUserId] = useState('');

  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setNome(''); setSobrenome(''); setCpf(''); setEmail('');
      setRegistro(''); setFuncao('TEC'); setAtivo(true);
      setSecretarias('');
      setUserId('');
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);

    if (!nome || !sobrenome || !cpf || !email || !userId) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      setSaving(false);
      return;
    }

    const res = await fetch('http://localhost:8000/funcionarios/api/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome,
        sobrenome,
        cpf,
        email,
        user: parseInt(userId),
        registro,
        funcao,
        ativo,
        secretarias: secretarias.split(',').map(s => parseInt(s.trim()))
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      alert('Erro de API: ' + JSON.stringify(errorData));
      setSaving(false);
      return;
    }

    navigation.navigate('Funcionarios');
    setSaving(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Novo Funcionário</Text>

      <Text style={styles.sectionTitle}>Dados Básicos</Text>
      <Text style={styles.label}>Nome *</Text>
      <TextInput value={nome} onChangeText={setNome} style={styles.input} />

      <Text style={styles.label}>Sobrenome *</Text>
      <TextInput value={sobrenome} onChangeText={setSobrenome} style={styles.input} />

      <Text style={styles.label}>CPF *</Text>
      <TextInput value={cpf} onChangeText={setCpf} style={styles.input} keyboardType="numeric" />

      <Text style={styles.label}>E-mail *</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />

      <Text style={styles.label}>ID do User *</Text>
      <TextInput value={userId} onChangeText={setUserId} style={styles.input} keyboardType="numeric" />


      <Text style={styles.sectionTitle}>Dados do Funcionário</Text>

      <Text style={styles.label}>Secretarias (IDs, separados por vírgula) *</Text>
      <TextInput
        value={secretarias}
        onChangeText={setSecretarias}
        style={styles.input}
        placeholder="Ex: 1, 2, 3"
      />

      <Text style={styles.label}>Registro (Matrícula) *</Text>
      <TextInput value={registro} onChangeText={setRegistro} style={styles.input} />

      <Text style={styles.label}>Função</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={funcao} onValueChange={setFuncao}>
          <Picker.Item label="Técnico (TEC)" value="TEC" />
          <Picker.Item label="Gestor (GES)" value="GES" />
        </Picker>
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.labelSwitch}>Funcionário Ativo?</Text>
        <Switch
          value={ativo}
          onValueChange={setAtivo}
          trackColor={{ false: "#ccc", true: "#4B7BE5" }}
        />
      </View>

      <View style={styles.buttonSpacer}>
        {saving
          ? <ActivityIndicator size="large" color="#4B7BE5" />
          : <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
        }
      </View>
      <Button title="Voltar" onPress={() => navigation.navigate('Funcionarios')} color="#6c757d" />

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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B7BE5',
    marginTop: 20,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 4,
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
    fontWeight: '600',
    fontSize: 16,
  },
  buttonSpacer: {
    marginTop: 16,
    marginBottom: 12,
  }
});

export default CriarFuncionarioScreen;