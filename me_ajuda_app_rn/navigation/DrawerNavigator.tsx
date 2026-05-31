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


export type DrawerParamList = {
  Home: undefined;
  // Usuarios: undefined;
  // CriarUsuario: undefined;
  // EditarUsuario: { usuario: Usuario };
  Ocorrencias: undefined;
  CriarOcorrencia: undefined;
  EditarOcorrencia: { ocorrencia: Ocorrencia };
   Servicos: undefined;
   CriarServico: undefined;
   EditarServico: { servico: Servico };
  Equipamentos: undefined;
  CriarEquipamento: undefined;
  EditarEquipamento: { equipamento: Equipamento };
  // Secretarias: undefined;
  // CriarSecretaria: undefined;
  // EditarSecretaria: { secretaria: Secretaria };
  // Intervencoes: undefined;
  // CriarIntervencao: undefined;
  // EditarIntervencao: { intervencao: Intervencao };
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#4B7BE5',
        drawerLabelStyle: { marginLeft: 0, fontSize: 16 },
        drawerStyle: { backgroundColor: '#fff', width: 250 },
        headerStyle: { backgroundColor: '#4B7BE5' },
        headerTintColor: '#fff',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          title: 'Início',
        }}
      />
      <Drawer.Screen
        name="Ocorrencias"
        component={OcorrenciasScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
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
      {/* <Drawer.Screen
        name="Usuarios"
        component={UsuariosScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} />,
          title: 'Usuários',
        }}
      />
      <Drawer.Screen
        name="CriarUsuario"
        component={CriarUsuarioScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo usuário' }}
      />
      <Drawer.Screen
        name="EditarUsuario"
        component={EditarUsuarioScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar usuário' }}
      /> */
      <Drawer.Screen
        name="Servicos"
        component={ServicosScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="logo-facebook" size={size} color={color} />,
          title: 'Serviços',
        }}
      />
      /* <Drawer.Screen
        name="CriarServico"
        component={CriarServicoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo serviço' }}
      />
      <Drawer.Screen
        name="EditarServico"
        component={EditarServicoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar serviço' }}
      /> */}
      <Drawer.Screen
        name="Equipamentos"
        component={EquipamentosScreen}
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="hardware-chip" size={size} color={color} />, title: 'Equipamentos' }}
      />
      {/*<Drawer.Screen
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
        name="Secretarias"
        component={SecretariasScreen}
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="business-outline" size={size} color={color} />, title: 'Secretarias' }}
      />
      <Drawer.Screen
        name="CriarSecretaria"
        component={CriarSecretariaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Nova secretaria' }}
      />
      <Drawer.Screen
        name="EditSecretaria"
        component={EditarSecretariaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar secretaria' }}
      />
      <Drawer.Screen
        name="Intervencoes"
        component={IntervencoesScreen}
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="construct-outline" size={size} color={color} />, title: 'Intervenções' }}
      />
      <Drawer.Screen
        name="CriarIntervencao"
        component={CriarIntervencaoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Nova intervenção' }}
      />
      <Drawer.Screen
        name="EditIntervencao"
        component={EditarIntervencaoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar intervenção' }}
      /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;