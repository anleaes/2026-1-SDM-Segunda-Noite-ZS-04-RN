import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Usuarios'>;

export type Usuario = {
  id: number;
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  fone?: string;
  endereco?: string;
  cep?: string;
  bairro?: string;
  registro?: string;
  funcao?: string;
  ativo?: boolean;
  user: number;
};

const UsuariosScreen = ({ navigation }: Props) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsuarios = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/usuarios/api/');
    const data = await response.json();
    setUsuarios(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchUsuarios();
    }, [])
  );

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8000/usuarios/api/${id}/`, {
      method: 'DELETE',
    });
    setUsuarios(prev => prev.filter(u => u.id !== id));
  };

  const renderItem = ({ item }: { item: Usuario }) => {
    const isFuncionario = !!item.registro;

    return (
      <View style={styles.card}>
        <View style={styles.headerCard}>
          <Text style={styles.name}>{item.nome} {item.sobrenome}</Text>
          <View style={[styles.badge, { backgroundColor: isFuncionario ? '#4B7BE5' : '#28a745' }]}>
            <Text style={styles.badgeText}>{isFuncionario ? 'Funcionário' : 'Cidadão'}</Text>
          </View>
        </View>

        <Text style={styles.info}>✉️ {item.email}</Text>
        <Text style={styles.info}>📄 CPF: {item.cpf}</Text>

        {isFuncionario ? (
          <Text style={styles.subInfo}>Registro: {item.registro} - Função: {item.funcao}</Text>
        ) : (
          <Text style={styles.subInfo}>Telefone: {item.fone || 'Não informado'}</Text>
        )}

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditarUsuario', { usuario: item })}
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
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CriarUsuario')}
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
    alignItems: 'flex-start',
    marginBottom: 8,
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
    marginLeft: 10,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  info: {
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
  },
  subInfo: {
    fontSize: 13,
    color: '#666',
    marginTop: 6,
    fontStyle: 'italic',
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

export default UsuariosScreen;