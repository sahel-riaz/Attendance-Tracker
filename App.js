import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { useFonts } from 'expo-font'

import Auth from './pages/Auth'
import Home from './pages/Home'
import Mark from './pages/Mark'
import Export from './pages/Export'
import AddStudent from './pages/AddStudent'
import Import from './pages/Import'
import Db from './pages/Db'
import Students from './pages/Students'
import Student from './pages/Student'
import DbStudents from './pages/DbStudents'
import DbStudent from './pages/DbStudent'

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
			<Stack.Navigator initialRouteName='Mark' screenOptions={{ headerShown: false }}>
				<Stack.Screen name='Auth' component={Auth} />
				<Stack.Screen name='Home' component={Home} />
				<Stack.Screen name='Import' component={Import} />
				<Stack.Screen name='Mark' component={Mark} />
				<Stack.Screen name='Export' component={Export} />
				<Stack.Screen name='Db' component={Db} />
				<Stack.Screen name='AddStudent' component={AddStudent} />
				<Stack.Screen name='Students' component={Students} />
				<Stack.Screen name='Student' component={Student} />
				<Stack.Screen name='DbStudents' component={DbStudents} />
				<Stack.Screen name='DbStudent' component={DbStudent} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default App
