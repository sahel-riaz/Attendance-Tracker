import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { useFonts } from 'expo-font'

import Home from './pages/Home'

const Stack = createNativeStackNavigator()

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
	},
}

const App = () => {
	const [loaded] = useFonts({
		LatoBold: require('./assets/fonts/Lato-Bold.tff'),
		LatoLight: require('./assets/fonts/Lato-Light.tff'),
		LatoRegular: require('./assets/fonts/Lato-Regular.tff'),
	})

	if (!loaded) return null

	return (
		<NavigationContainer theme={theme}>
			<Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
				<Stack.Screen name='Home' component={Home} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default App
