import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'VerProtocolo'>;

export type Protocolo = {
	protocolo_numero: string;
	gerado_em: string;
	prazo: string;
	ocorrencia: number;
};

const VerProtocoloScreen = ({ route, navigation }: Props) => {
	const { protocolo } = route.params;

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>Detalhes do Protocolo</Text>

			<Text style={styles.label}>Número do Protocolo</Text>
			<TextInput
				value={protocolo.protocolo_numero}
				style={styles.input}
				editable={false}
			/>

			<Text style={styles.label}>Data de Geração</Text>
			<TextInput
				value={protocolo.gerado_em.split('T')[0].split('-').reverse().join('/')}
				style={styles.input}
				editable={false}
			/>

			<Text style={styles.label}>Prazo Estimado</Text>
			<TextInput
				value={protocolo.prazo.split('-').reverse().join('/')}
				style={styles.input}
				editable={false}
			/>

			<Text style={styles.label}>ID da Ocorrência</Text>
			<TextInput
				value={String(protocolo.ocorrencia)}
				style={styles.input}
				editable={false}
			/>

			<View style={styles.buttonSpacer}>
				<Button title="Voltar" onPress={() => navigation.navigate('Ocorrencias')} color="#6c757d" />
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
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 20,
		marginTop: 10,
		color: '#333',
		alignSelf: 'center',
	},
	label: {
		fontWeight: 'bold',
		marginTop: 12,
		marginBottom: 4,
		color: '#555'
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		padding: 10,
		backgroundColor: '#e9ecef',
		color: '#333'
	},
	buttonSpacer: {
		marginTop: 16,
		marginBottom: 12,
	}
});

export default VerProtocoloScreen;