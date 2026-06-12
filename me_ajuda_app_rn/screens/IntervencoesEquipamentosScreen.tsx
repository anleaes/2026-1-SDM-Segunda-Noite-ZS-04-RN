import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'IntervencoesEquipamentos'>;

export type IntervencaoEquipamento = {
  id: number;
  horas_usado: number;
  custo_total: number;
  intervencao: number;
  equipamento: number;
};

const IntervencoesEquipamentosScreen = ({ navigation }: Props) => {

  const [intervencoesEquipamentos, setIntervencoesEquipamentos] = useState<IntervencaoEquipamento[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchIntervencoesEquipamentos = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/equipamentos_intervencao/api/');
    const data = await response.json();
    setIntervencoesEquipamentos(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchIntervencoesEquipamentos();
    }, [])
  );

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:8000/equipamentos_intervencao/api/${id}/`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const errorData = await res.json();
      alert('Erro de API: ' + JSON.stringify(errorData));
      return;
    }

    setIntervencoesEquipamentos(prev => prev.filter(i => i.id !== id));
  };

  const renderItem = ({ item }: { item: IntervencaoEquipamento }) => (
    <View style={styles.card}>
      <Text style={styles.name}>Interv.:{item.intervencao}</Text>
      <Text style={styles.name}>Equip.: {item.equipamento}</Text>

      <Text style={styles.info}>Horas Usado: {item.horas_usado}</Text>
      <Text style={styles.info}>Custo: R$ {Number(item.custo_total).toFixed(2)}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditarIntervencaoEquipamento', { intervencaoEquipamento: item })}
        >
          <Text style={styles.editText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.editText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alocações de Equipamentos</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={intervencoesEquipamentos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CriarIntervencaoEquipamento')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#f0f4ff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
    marginBottom: 2,
  },
  editButton: {
    backgroundColor: '#4B7BE5',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  editText: {
    color: '#fff',
    fontWeight: '500'
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#0D47A1',
    borderRadius: 28,
    padding: 14,
    elevation: 4,
  },
  deleteButton: {
    backgroundColor: '#E54848',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'flex-end'
  },
});

export default IntervencoesEquipamentosScreen;