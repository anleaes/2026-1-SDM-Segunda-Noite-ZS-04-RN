import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Equipamentos'>;

export type Equipamento = {
  id: number;
  nome: string;
  descricao: string;
  disponivel: boolean;
  preco: string | number;
};

const EquipamentosScreen = ({ navigation }: Props) => {

  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEquipamentos = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/equipamentos/api/');
    const data = await response.json();
    setEquipamentos(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchEquipamentos();
    }, [])
  );

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:8000/equipamentos/api/${id}/`, {
      method: 'DELETE',
    });
    setEquipamentos(prev => prev.filter(e => e.id !== id));
  };

  const renderItem = ({ item }: { item: Equipamento }) => (
    <View style={styles.card}>
      <View style={styles.headerCard}>
        <Text style={styles.name}>{item.nome}</Text>
        <View style={[styles.badge, { backgroundColor: item.disponivel ? '#28a745' : '#6c757d' }]}>
          <Text style={styles.badgeText}>
            {item.disponivel ? 'Disponível' : 'Indisponível'}
          </Text>
        </View>
      </View>

      <Text style={styles.info}>ID: {item.id}</Text>
      <Text style={styles.description}>{item.descricao}</Text>
      <Text style={styles.preco}>Preço/Hora: R$ {Number(item.preco).toFixed(2)}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditarEquipamento', { equipamento: item })}
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
      <Text style={styles.title}>Equipamentos</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={equipamentos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CriarEquipamento')}
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
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
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
    marginTop: 8,
  },
  preco: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginTop: 8,
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

export default EquipamentosScreen;