import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Secretarias'>;

export type Secretaria = {
  id: number;
  nome: string;
  sigla: string;
  descricao: string;
  site: string;
};

const SecretariasScreen = ({ navigation }: Props) => {

  const [secretarias, setSecretarias] = useState<Secretaria[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSecretarias = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/secretarias/api/');
    const data = await response.json();
    setSecretarias(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchSecretarias();
    }, [])
  );

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:8000/secretarias/api/${id}/`, {
      method: 'DELETE',
    });
    setSecretarias(prev => prev.filter(s => s.id !== id));
  };

  const renderItem = ({ item }: { item: Secretaria }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.nome} ({item.sigla})</Text>

      <Text style={styles.info}>ID: {item.id}</Text>
      <Text style={styles.description}>{item.descricao}</Text>
      {item.site ? <Text style={styles.site}>Site: {item.site}</Text> : null}

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditarSecretaria', { secretaria: item })}
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
      <Text style={styles.title}>Secretarias</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={secretarias}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CriarSecretaria')}
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
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  site: {
    fontSize: 13,
    color: '#4B7BE5',
    marginTop: 4,
    fontStyle: 'italic',
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
    alignSelf: 'flex-end'
  },
});

export default SecretariasScreen;