import { Image, View } from 'react-native'
import { COLORS } from '../styles/theme'

export default function Navbar() {
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
				<Image
					style={{ height: 24, width: 24, marginRight: 42 }}
					source={require('./icons/home.png')}
				/>
				<Image style={{ height: 24, width: 24 }} source={require('./icons/import.png')} />
			</View>
			<View
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
			</View>
			<View style={{ flexDirection: 'row' }}>
				<Image
					style={{ height: 24, width: 24, marginRight: 42 }}
					source={require('./icons/export.png')}
				/>
				<Image style={{ height: 24, width: 24 }} source={require('./icons/db.png')} />
			</View>
		</View>
	)
}
