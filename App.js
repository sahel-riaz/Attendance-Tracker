import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { useFonts } from 'expo-font'

import Home from './pages/Home'
import Mark from './pages/Mark'
import Export from './pages/Export'
import AddStudent from './pages/AddStudent'
import Import from './pages/Import'
import Db from './pages/Db'

const Stack = createNativeStackNavigator()

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
	},
}

const App = () => {
	const [loaded] = useFonts({
		LatoBold: require('./assets/fonts/Lato-Bold.ttf'),
		LatoLight: require('./assets/fonts/Lato-Light.ttf'),
		LatoRegular: require('./assets/fonts/Lato-Regular.ttf'),
	})

	if (!loaded) return null

	return (
		<NavigationContainer theme={theme}>
			<Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
				<Stack.Screen name='Home' component={Home} />
				<Stack.Screen name='Import' component={Import} />
				<Stack.Screen name='Mark' component={Mark} />
				<Stack.Screen name='Export' component={Export} />
				<Stack.Screen name='Db' component={Db} />
				<Stack.Screen name='AddStudent' component={AddStudent} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default App
