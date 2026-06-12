import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CriarIntervencaoEquipamento'>;

type ItemAlocacao = {
  id_temporario: string;
  equipamento: number;
  horas_usado: number;
  custo_total: number;
};

const CriarIntervencaoEquipamentoScreen = ({ navigation }: Props) => {

  const [intervencaoId, setIntervencaoId] = useState('');
  const [alocacao, setAlocacao] = useState<ItemAlocacao[]>([]);
  const [saving, setSaving] = useState(false);

  const [equipamentoId, setEquipamentoId] = useState('');
  const [horasUsado, setHorasUsado] = useState('');
  const [custoTotal, setCustoTotal] = useState('');

  useFocusEffect(
    useCallback(() => {
      setIntervencaoId('');
      setEquipamentoId('');
      setHorasUsado('');
      setCustoTotal('');
      setAlocacao([]);
      setSaving(false);
    }, [])
  );

  const adicionarEmAlocacao = () => {

    if (!intervencaoId || !equipamentoId || !horasUsado || !custoTotal) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      setSaving(false);
      return;
    }

    const novoItem: ItemAlocacao = {
      id_temporario: Math.random().toString(),
      equipamento: parseInt(equipamentoId),
      horas_usado: parseInt(horasUsado),
      custo_total: parseFloat(custoTotal.replace(',', '.'))
    };

    setAlocacao(prev => [...prev, novoItem]);

    setEquipamentoId('');
    setHorasUsado('');
    setCustoTotal('');
  };

  const removerDeAlocacao = (id_temporario: string) => {
    setAlocacao(prev => prev.filter(item => item.id_temporario !== id_temporario));
  };

  const editarDeAlocacao = (id_temporario: string) => {
    const item = alocacao.find(i => i.id_temporario === id_temporario);
    if (!item) return;
    setEquipamentoId(item.equipamento.toString());
    setHorasUsado(item.horas_usado.toString());
    setCustoTotal(item.custo_total.toString());
    removerDeAlocacao(id_temporario);
  };

  const handleSave = async () => {
    setSaving(true);

    if (!intervencaoId) {
      alert('Por favor, informe o ID da intervenção.');
      setSaving(false);
      return;
    }

    if (alocacao.length === 0) {
      alert('Por favor, adicione pelo menos um equipamento à alocação.');
      setSaving(false);
      return;
    }

    for (const item of alocacao) {
      const res = await fetch('http://localhost:8000/equipamentos_intervencao/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intervencao: parseInt(intervencaoId),
          equipamento: item.equipamento,
          horas_usado: item.horas_usado,
          custo_total: item.custo_total
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert('Erro de API: ' + JSON.stringify(errorData));
        setSaving(false);
        return;
      }
    }

    navigation.navigate('IntervencoesEquipamentos');

    setSaving(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nova Alocação de Equipamentos</Text>

      <View style={styles.section}>
        <Text style={styles.label}>ID da Intervenção *</Text>
        <TextInput
          value={intervencaoId}
          onChangeText={setIntervencaoId}
          style={styles.input}
          keyboardType="numeric"
          placeholder="Ex: 1"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Adicionar Equipamento</Text>

        <Text style={styles.label}>ID do Equipamento *</Text>
        <TextInput value={equipamentoId} onChangeText={setEquipamentoId} style={styles.input} keyboardType="numeric" />

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={styles.label}>Horas de Uso *</Text>
            <TextInput value={horasUsado} onChangeText={setHorasUsado} style={styles.input} keyboardType="numeric" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Custo (R$) *</Text>
            <TextInput value={custoTotal} onChangeText={setCustoTotal} style={styles.input} keyboardType="numeric" placeholder="Ex: 150.50" />
          </View>
        </View>

        <View style={styles.buttonSpacer}>
          <Button title="+ Adicionar à Lista" onPress={adicionarEmAlocacao} color="#28a745" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Equipamentos Alocados ({alocacao.length})</Text>

        {alocacao.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum equipamento alocado ainda.</Text>
        ) : (
          alocacao.map((item) => (
            <View key={item.id_temporario} style={styles.cartItem}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cartText}>Equip. ID: {item.equipamento}</Text>
                <Text style={styles.cartSubText}>{item.horas_usado}h | R$ {item.custo_total}</Text>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => removerDeAlocacao(item.id_temporario)} style={{ marginRight: 12 }}>
                  <Text style={styles.deleteText}>Remover</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => editarDeAlocacao(item.id_temporario)}>
                  <Text style={styles.editText}>Editar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>

      <View style={styles.footer}>
        {saving ? (
          <ActivityIndicator size="large" color="#4B7BE5" />
        ) : (
          <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
        )}
        <View style={{ marginTop: 12 }}>
          <Button title="Cancelar" onPress={() => navigation.navigate('IntervencoesEquipamentos')} color="#6c757d" />
        </View>
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
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B7BE5',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#eee', paddingBottom: 4
  },
  row: {
    flexDirection: 'row'
  },
  emptyText: {
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 10
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e9ecef',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8
  },
  cartText: {
    fontWeight: 'bold',
    color: '#333'
  },
  cartSubText: {
    color: '#666',
    fontSize: 13
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteText: {
    color: '#E54848',
    fontWeight: 'bold',
  },
  editText: {
    color: '#4B7BE5',
    fontWeight: 'bold'
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderColor: '#eee'
  }
});

export default CriarIntervencaoEquipamentoScreen;