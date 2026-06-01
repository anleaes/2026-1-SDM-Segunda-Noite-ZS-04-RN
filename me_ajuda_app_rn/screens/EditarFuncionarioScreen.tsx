import { DrawerScreenProps } from '@react-navigation/drawer';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditarFuncionario'>;

const EditarUsuarioScreen = ({ route, navigation }: Props) => {
  const { usuario } = route.params;

  const isFuncionario = usuario.tipo_usuario === 'funcionario';
  const tipoInicial = isFuncionario ? 'funcionario' : 'cidadao';
  const [tipoUsuario, setTipoUsuario] = useState<'cidadao' | 'funcionario'>(tipoInicial);

  const [nome, setNome] = useState(usuario.nome || '');
  const [sobrenome, setSobrenome] = useState(usuario.sobrenome || '');
  const [cpf, setCpf] = useState(usuario.cpf || '');
  const [email, setEmail] = useState(usuario.email || '');

  const [fone, setFone] = useState(usuario.fone || '');
  const [endereco, setEndereco] = useState(usuario.endereco || '');
  const [cep, setCep] = useState(usuario.cep || '');
  const [bairro, setBairro] = useState(usuario.bairro || '');

  const [registro, setRegistro] = useState(usuario.registro || '');
  const [funcao, setFuncao] = useState(usuario.funcao || 'TEC');
  const [ativo, setAtivo] = useState(usuario.ativo !== undefined ? usuario.ativo : true);
  const [secretarias, setSecretarias] = useState(usuario.secretarias ? usuario.secretarias.join(',') : '');

  const [userId, setUserId] = useState(String(usuario.user));

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const tipo = isFuncionario ? 'funcionario' : 'cidadao';
    setTipoUsuario(tipo);
    setNome(usuario.nome || '');
    setSobrenome(usuario.sobrenome || '');
    setCpf(usuario.cpf || '');
    setEmail(usuario.email || '');
    setFone(usuario.fone || '');
    setEndereco(usuario.endereco || '');
    setCep(usuario.cep || '');
    setBairro(usuario.bairro || '');
    setRegistro(usuario.registro || '');
    setFuncao(usuario.funcao || 'TEC');
    setAtivo(usuario.ativo !== undefined ? usuario.ativo : true);
    setSecretarias(usuario.secretarias ? usuario.secretarias.join(',') : '');
    setUserId(String(usuario.user));
  }, [usuario]);

  const handleSave = async () => {
    setSaving(true);

    const payload: any = { nome, sobrenome, cpf, email, tipo: tipoUsuario, user: parseInt(userId) };

    let rotaApi = '';

    if (tipoUsuario === 'cidadao') {
      Object.assign(payload, { fone, endereco, cep, bairro });
      rotaApi = 'cidadaos';
    } else {
      Object.assign(payload, { registro, funcao, ativo, secretarias: secretarias.split(',').map(s => parseInt(s.trim())) });
      rotaApi = 'funcionarios';
    }

    await fetch(`http://localhost:8000/${rotaApi}/${usuario.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    navigation.navigate('Usuarios');
    setSaving(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Dados Básicos</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput value={nome} onChangeText={setNome} style={styles.input} />

      <Text style={styles.label}>Sobrenome</Text>
      <TextInput value={sobrenome} onChangeText={setSobrenome} style={styles.input} />

      <Text style={styles.label}>CPF</Text>
      <TextInput value={cpf} onChangeText={setCpf} style={styles.input} keyboardType="numeric" />

      <Text style={styles.label}>E-mail</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />

      <Text style={styles.label}>ID do User</Text>
      <TextInput value={userId} onChangeText={setUserId} style={styles.input} keyboardType="numeric" />


      {tipoUsuario === 'funcionario' && (
        <>
          <Text style={styles.sectionTitle}>Dados do Funcionário</Text>

          <Text style={styles.label}>Secretarias (IDs, separados por vírgula)</Text>
          <TextInput
            value={secretarias}
            onChangeText={setSecretarias}
            style={styles.input}
            placeholder="Ex: 1, 2, 3"
          />

          <Text style={styles.label}>Registro (Matrícula)</Text>
          <TextInput value={registro} onChangeText={setRegistro} style={styles.input} />

          <Text style={styles.label}>Função</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={funcao} onValueChange={setFuncao}>
              <Picker.Item label="Técnico (TEC)" value="TEC" />
              <Picker.Item label="Gestor (GES)" value="GES" />
              <Picker.Item label="Analista (ANA)" value="ANA" />
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
        </>
      )}

      <View style={styles.buttonSpacer}>
        {saving ? (
          <ActivityIndicator size="large" color="#4B7BE5" />
        ) : (
          <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
        )}
      </View>
      <Button title="Voltar" onPress={() => navigation.navigate('Usuarios')} color="#6c757d" />

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

export default EditarFuncionarioScreen;