import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';
import { Protocolo } from './VerProtocoloScreen';

type Props = DrawerScreenProps<DrawerParamList, 'Ocorrencias'>;

export type Ocorrencia = {
  id: number;
  titulo: string;
  endereco: string;
  numero?: string;
  descricao: string;
  status: 'ABE' | 'AND' | 'FEC';
  criado_em: string;
  fechado_em?: string;
  complemento?: string;
  cidadao: number;
  servico: number;
};

const OcorrenciasScreen = ({ navigation }: Props) => {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOcorrencias = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/ocorrencias/api/');
    const data = await response.json();
    setOcorrencias(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchOcorrencias();
    }, [])
  );

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:8000/ocorrencias/api/${id}/`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const errorData = await res.json();
      alert('Erro de API: ' + JSON.stringify(errorData));
      return;
    }

    setOcorrencias(prev => prev.filter(o => o.id !== id));
  };

  const handleViewProtocol = async (id: number) => {
    const res = await fetch(`http://localhost:8000/protocolos/api/?ocorrencia=${id}`);

    if (!res.ok) {
      const errorData = await res.json();
      alert('Erro de API: ' + JSON.stringify(errorData));
      return;
    }

    const data = await res.json() as Protocolo[];

    if (data && data.length > 0) {
      const protocolo = data[0];

      navigation.navigate('VerProtocolo', { protocolo: protocolo });
    } else {
      alert('Nenhum protocolo encontrado para esta ocorrência.');
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ABE': return 'Aberta';
      case 'AND': return 'Em Andamento';
      case 'FEC': return 'Fechada';
      default: return status;
    }
  };

  const renderItem = ({ item }: { item: Ocorrencia }) => (
    <View style={styles.card}>
      <View style={styles.headerCard}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.status}>{getStatusLabel(item.status)}</Text>
      </View>

      <Text style={styles.info}>Criada em: {item.criado_em.split('T')[0].split('-').reverse().join('/')}</Text>
      {item.fechado_em && (
        <Text style={styles.info}>Fechada em: {item.fechado_em.split('T')[0].split('-').reverse().join('/')}</Text>
      )}
      <Text style={styles.info}>ID: {item.id}</Text>
      <Text style={styles.info}>{item.endereco}, {item.numero}</Text>
      <Text style={styles.description} numberOfLines={2}>{item.descricao}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditarOcorrencia', { ocorrencia: item })}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.viewProtocolButton}
          onPress={() => handleViewProtocol(item.id)}
        >
          <Text style={styles.buttonText}>Visualizar Protocolo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ocorrências</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={ocorrencias}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CriarOcorrencia')}
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
    marginBottom: 4,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#001f3f',
    flex: 1,
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#d9534f',
    backgroundColor: '#ffebeb',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  info: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'flex-end',
  },
  editButton: {
    backgroundColor: '#17a2b8',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#E54848',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginRight: 8,
  },
  viewProtocolButton: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: {
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
});

export default OcorrenciasScreen;