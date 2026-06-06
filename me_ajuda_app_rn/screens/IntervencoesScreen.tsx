import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Intervencoes'>;

export type Intervencao = {
  id: number;
  titulo: string;
  data_exec: string;
  relato: string;
  custo_trab: string | number;
  doc: string | null;
  ocorrencia: number;
  funcionario: number;
};

const IntervencoesScreen = ({ navigation }: Props) => {

  const [intervencoes, setIntervencoes] = useState<Intervencao[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchIntervencoes = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/intervencoes/api/');
    const data = await response.json();
    setIntervencoes(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchIntervencoes();
    }, [])
  );

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:8000/intervencoes/api/${id}/`, {
      method: 'DELETE',
    });
    setIntervencoes(prev => prev.filter(i => i.id !== id));
  };

  const renderItem = ({ item }: { item: Intervencao }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.titulo}</Text>

      <Text style={styles.info}>Data da Execução: {item.data_exec.split('-').reverse().join('/')}</Text>
      <Text style={styles.info}>Custo: R$ {Number(item.custo_trab).toFixed(2)}</Text>
      <Text style={styles.info}>🆔 ID: {item.id}</Text>

      <Text style={styles.description} numberOfLines={2}>{item.relato}</Text>

      {item.doc && (
        <Text style={styles.docIndicator}>📎 Documento Anexado</Text>
      )}

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditarIntervencao', { intervencao: item })}
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
      <Text style={styles.title}>Intervenções</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={intervencoes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CriarIntervencao')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
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
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 6,
    marginBottom: 4,
  },
  docIndicator: {
    fontSize: 12,
    color: '#0D47A1',
    fontStyle: 'italic',
    marginTop: 4,
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

export default IntervencoesScreen;