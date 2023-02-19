import { SafeAreaView, StatusBar, Text, View } from 'react-native'

import COLORS from '../styles/theme'

export default function Home() {
	return (
		<SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>
			<StatusBar />
			<Text style={{ color: 'white', padding: 50 }}>hello</Text>
		</SafeAreaView>
	)
}
