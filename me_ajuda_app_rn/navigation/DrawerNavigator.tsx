import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from '../src/components/CustomDrawerContent';
import HomeScreen from '../screens/HomeScreen';
import OcorrenciasScreen, { Ocorrencia } from '../screens/OcorrenciasScreen';
import CriarOcorrenciaScreen from '../screens/CriarOcorrenciaScreen';
import EditarOcorrenciaScreen from '../screens/EditarOcorrenciaScreen';
import ServicosScreen, { Servico } from '../screens/ServicosScreen';
import EquipamentosScreen, { Equipamento } from '../screens/EquipamentosScreen';
import CriarEquipamentoScreen from '../screens/CriarEquipamentoScreen';
import EditarEquipamentoScreen from '../screens/EditarEquipamentoScreen';
import IntervencoesScreen, { Intervencao } from '../screens/IntervencoesScreen';
import CriarIntervencaoScreen from '../screens/CriarIntervencaoScreen';
import EditarIntervencaoScreen from '../screens/EditarIntervencaoScreen';
import CriarServicoScreen from '../screens/CriarServicoScreen';
import EditarServicoScreen from '../screens/EditarServicoScreen';
import SecretariasScreen, { Secretaria } from '../screens/SecretariasScreen';
import CriarSecretariaScreen from '../screens/CriarSecretariaScreen';
import EditarSecretariaScreen from '../screens/EditarSecretariaScreen';
import CidadaosScreen, { Cidadao } from '../screens/CidadaosScreen';
import CriarCidadaoScreen from '../screens/CriarCidadaoScreen';
import EditarCidadaoScreen from '../screens/EditarCidadaoScreen';
import FuncionariosScreen, { Funcionario } from '../screens/FuncionariosScreen';
import CriarFuncionarioScreen from '../screens/CriarFuncionarioScreen';
import EditarFuncionarioScreen from '../screens/EditarFuncionarioScreen';
import IntervencoesEquipamentosScreen, { IntervencaoEquipamento } from '../screens/IntervencoesEquipamentosScreen';
import CriarIntervencaoEquipamentoScreen from '../screens/CriarIntervencaoEquipamentoScreen';
import EditarIntervencaoEquipamentoScreen from '../screens/EditarIntervencaoEquipamentoScreen';
import VerProtocoloScreen, { Protocolo } from '../screens/VerProtocoloScreen';

export type DrawerParamList = {
  Home: undefined;
  Ocorrencias: undefined;
  CriarOcorrencia: undefined;
  EditarOcorrencia: { ocorrencia: Ocorrencia };
  Servicos: undefined;
  CriarServico: undefined;
  EditarServico: { servico: Servico };
  Equipamentos: undefined;
  CriarEquipamento: undefined;
  EditarEquipamento: { equipamento: Equipamento };
  Secretarias: undefined;
  CriarSecretaria: undefined;
  EditarSecretaria: { secretaria: Secretaria };
  Intervencoes: undefined;
  CriarIntervencao: undefined;
  EditarIntervencao: { intervencao: Intervencao };
  Cidadaos: undefined;
  CriarCidadao: undefined;
  EditarCidadao: { cidadao: Cidadao };
  Funcionarios: undefined;
  CriarFuncionario: undefined;
  EditarFuncionario: { funcionario: Funcionario };
  IntervencoesEquipamentos: undefined;
  CriarIntervencaoEquipamento: undefined;
  EditarIntervencaoEquipamento: { intervencaoEquipamento: IntervencaoEquipamento };
  VerProtocolo: { protocolo: Protocolo }
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#1a325a',
        drawerLabelStyle: { marginLeft: 0, fontSize: 16 },
        drawerStyle: { backgroundColor: '#fff', width: 250 },
        headerStyle: { backgroundColor: '#1a325a' },
        headerTintColor: '#fff',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="home-sharp" size={size} color={color} />,
          title: 'Início',
        }}
      />
      <Drawer.Screen
        name="Cidadaos"
        component={CidadaosScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="people-sharp" size={size} color={color} />,
          title: 'Cidadãos',
        }}
      />
      <Drawer.Screen
        name="CriarCidadao"
        component={CriarCidadaoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo cidadão' }}
      />
      <Drawer.Screen
        name="EditarCidadao"
        component={EditarCidadaoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar cidadão' }}
      />
      <Drawer.Screen
        name="Funcionarios"
        component={FuncionariosScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="id-card-sharp" size={size} color={color} />,
          title: 'Funcionários',
        }}
      />
      <Drawer.Screen
        name="CriarFuncionario"
        component={CriarFuncionarioScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo funcionário' }}
      />
      <Drawer.Screen
        name="EditarFuncionario"
        component={EditarFuncionarioScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar funcionário' }}
      />
      <Drawer.Screen
        name="Secretarias"
        component={SecretariasScreen}
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="business-sharp" size={size} color={color} />, title: 'Secretarias' }}
      />
      <Drawer.Screen
        name="CriarSecretaria"
        component={CriarSecretariaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Nova secretaria' }}
      />
      <Drawer.Screen
        name="EditarSecretaria"
        component={EditarSecretariaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar secretaria' }}
      />
      <Drawer.Screen
        name="Servicos"
        component={ServicosScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="build-sharp" size={size} color={color} />,
          title: 'Serviços',
        }}
      />
      <Drawer.Screen
        name="CriarServico"
        component={CriarServicoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo serviço' }}
      />
      <Drawer.Screen
        name="EditarServico"
        component={EditarServicoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar serviço' }}
      />
      <Drawer.Screen
        name="Ocorrencias"
        component={OcorrenciasScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="alert-circle-sharp" size={size} color={color} />,
          title: 'Ocorrências',
        }}
      />
      <Drawer.Screen
        name="CriarOcorrencia"
        component={CriarOcorrenciaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Nova ocorrência' }}
      />
      <Drawer.Screen
        name="EditarOcorrencia"
        component={EditarOcorrenciaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Ocorrência' }}
      />
      <Drawer.Screen
        name="VerProtocolo"
        component={VerProtocoloScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Visualizar Protocolo' }}
      />
      <Drawer.Screen
        name="Equipamentos"
        component={EquipamentosScreen}
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="hammer-sharp" size={size} color={color} />, title: 'Equipamentos' }}
      />
      <Drawer.Screen
        name="CriarEquipamento"
        component={CriarEquipamentoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo equipamento' }}
      />
      <Drawer.Screen
        name="EditarEquipamento"
        component={EditarEquipamentoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar equipamento' }}
      />
      <Drawer.Screen
        name="Intervencoes"
        component={IntervencoesScreen}
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="construct-sharp" size={size} color={color} />, title: 'Intervenções' }}
      />
      <Drawer.Screen
        name="CriarIntervencao"
        component={CriarIntervencaoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Nova intervenção' }}
      />
      <Drawer.Screen
        name="EditarIntervencao"
        component={EditarIntervencaoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar intervenção' }}
      />
      <Drawer.Screen
        name="IntervencoesEquipamentos"
        component={IntervencoesEquipamentosScreen}
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="construct-outline" size={size} color={color} />, title: 'Alocações de Equip.' }}
      />
      <Drawer.Screen
        name="CriarIntervencaoEquipamento"
        component={CriarIntervencaoEquipamentoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Nova Alocação' }}
      />
      <Drawer.Screen
        name="EditarIntervencaoEquipamento"
        component={EditarIntervencaoEquipamentoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Alocação' }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
