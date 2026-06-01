import { DrawerScreenProps } from '@react-navigation/drawer';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditarUsuario'>;

const EditarUsuarioScreen = ({ route, navigation }: Props) => {
  const { usuario } = route.params;

  const tipoInicial = usuario.registro ? 'funcionario' : 'cidadao';
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

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const tipo = usuario.registro ? 'funcionario' : 'cidadao';
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
  }, [usuario]);

  const handleSave = async () => {
    setSaving(true);

    const payload: any = { nome, sobrenome, cpf, email, tipo: tipoUsuario };

    if (tipoUsuario === 'cidadao') {
      Object.assign(payload, { fone, endereco, cep, bairro });
    } else {
      Object.assign(payload, { registro, funcao, ativo });
    }

    await fetch(`http://localhost:8000/usuarios/api/${usuario.id}/`, {
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

      {tipoUsuario === 'cidadao' && (
        <>
          <Text style={styles.sectionTitle}>Dados do Cidadão</Text>
          <Text style={styles.label}>Telefone</Text>
          <TextInput value={fone} onChangeText={setFone} style={styles.input} keyboardType="phone-pad" />

          <Text style={styles.label}>Endereço</Text>
          <TextInput value={endereco} onChangeText={setEndereco} style={styles.input} />

          <Text style={styles.label}>CEP</Text>
          <TextInput value={cep} onChangeText={setCep} style={styles.input} keyboardType="numeric" />

          <Text style={styles.label}>Bairro</Text>
          <TextInput value={bairro} onChangeText={setBairro} style={styles.input} />
        </>
      )}

      {tipoUsuario === 'funcionario' && (
        <>
          <Text style={styles.sectionTitle}>Dados do Funcionário</Text>
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

export default EditarUsuarioScreen;