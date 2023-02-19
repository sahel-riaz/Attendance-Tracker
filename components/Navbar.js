import { Image, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../styles/theme'
import { useRoute } from '@react-navigation/native'

export default function Navbar() {
	const route = useRoute()

	return (
		<View
			style={{
				backgroundColor: COLORS?.white,
				borderColor: COLORS?.borderGrey,
				borderTopStartRadius: 20,
				borderTopEndRadius: 20,
				borderWidth: 1,
				paddingTop: 20,
				paddingBottom: 20,
				paddingLeft: 30,
				paddingRight: 30,
				flexDirection: 'row',
				position: 'absolute',
				bottom: 0,
				justifyContent: 'space-between',
				width: '100%',
			}}
		>
			<View style={{ flexDirection: 'row' }}>
				<TouchableOpacity onPress={() => {}} activeOpacity={0.7}>
					{route.name == 'Home' ? (
						<Image
							style={{ height: 24, width: 24, marginRight: 42, tintColor: COLORS?.black }}
							source={require('./icons/home.png')}
						/>
					) : (
						<Image
							style={{ height: 24, width: 24, marginRight: 42 }}
							source={require('./icons/home.png')}
						/>
					)}
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {}} activeOpacity={0.7}>
					{route.name == 'Import' ? (
						<Image
							style={{ height: 24, width: 24, tintColor: COLORS?.black }}
							source={require('./icons/import.png')}
						/>
					) : (
						<Image style={{ height: 24, width: 24 }} source={require('./icons/import.png')} />
					)}
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				onPress={() => {
					console.log(route.name)
				}}
				activeOpacity={0.7}
				style={{
					position: 'absolute',
					top: -33,
					right: '50%',
					backgroundColor: COLORS.blue,
					borderRadius: 100,
					height: 64,
					width: 64,
					justifyContent: 'center',
					alignItems: 'center',
					elevation: 3,
				}}
			>
				<Image style={{ height: 30, width: 30 }} source={require('./icons/calendar.png')} />
			</TouchableOpacity>
			<View style={{ flexDirection: 'row' }}>
				<TouchableOpacity onPress={() => {}} activeOpacity={0.7}>
					{route.name == 'Export' ? (
						<Image
							style={{ height: 24, width: 24, marginRight: 42, tintColor: COLORS?.black }}
							source={require('./icons/export.png')}
						/>
					) : (
						<Image
							style={{ height: 24, width: 24, marginRight: 42 }}
							source={require('./icons/export.png')}
						/>
					)}
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {}} activeOpacity={0.7}>
					{route.name == 'DB' ? (
						<Image
							style={{ height: 24, width: 24, tintColor: COLORS?.black }}
							source={require('./icons/db.png')}
						/>
					) : (
						<Image style={{ height: 24, width: 24 }} source={require('./icons/db.png')} />
					)}
				</TouchableOpacity>
			</View>
		</View>
	)
}
