import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
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
<<<<<<< HEAD
import Info from './pages/Info'
import PopUp from './pages/PopUp'
// import NewAuth from './pages/NewAuth'
import NewButtons from './pages/NewButtons'

=======
import Settings from './pages/Settings'
import DbSettings from './pages/DbSettings'
import LessAttendance from './pages/LessAttendance'
import StudentsSettings from './pages/StudentsSettings'
import ImportInfo from './pages/ImportInfo'
import HomeInfo from './pages/HomeInfo'
import ExportInfo from './pages/ExportInfo'
import MarkInfo from './pages/MarkInfo'
import DbInfo from './pages/DbInfo'
>>>>>>> 9ed94aa7f63d42982e277766e0f5317ef290704b

const Stack = createStackNavigator()

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
			<Stack.Navigator
				initialRouteName='Auth'
				screenOptions={{
					headerShown: false,
					gestureEnabled: false,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen name='Auth' component={Auth} />
				<Stack.Screen name='Home' component={Home} />
				<Stack.Screen name='Settings' component={Settings} />
				<Stack.Screen name='Import' component={Import} />
				<Stack.Screen name='Mark' component={Mark} />
				<Stack.Screen name='Export' component={Export} />
				<Stack.Screen name='Db' component={Db} />
				<Stack.Screen name='AddStudent' component={AddStudent} />
				<Stack.Screen name='Students' component={Students} />
				<Stack.Screen name='Student' component={Student} />
				<Stack.Screen name='DbStudents' component={DbStudents} />
				<Stack.Screen name='DbStudent' component={DbStudent} />
<<<<<<< HEAD
				<Stack.Screen name='NewButtons' component={NewButtons} />
				{/* <Stack.Screen name='NewAuth' component={NewAuth} /> */}
=======
				<Stack.Screen name='DbSettings' component={DbSettings} />
				<Stack.Screen name='LessAttendance' component={LessAttendance} />
				<Stack.Screen name='StudentsSettings' component={StudentsSettings} />
				<Stack.Screen name='ImportInfo' component={ImportInfo} />
				<Stack.Screen name='HomeInfo' component={HomeInfo} />
				<Stack.Screen name='ExportInfo' component={ExportInfo} />
				<Stack.Screen name='MarkInfo' component={MarkInfo} />
				<Stack.Screen name='DbInfo' component={DbInfo} />
>>>>>>> 9ed94aa7f63d42982e277766e0f5317ef290704b
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default App
