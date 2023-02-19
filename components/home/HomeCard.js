import { Image, Text, View } from 'react-native'
import { COLORS, FONTS } from '../../styles/theme'

export default function HomeCard() {
	return (
		<View
			style={{
				height: 160,
				width: 140,
				paddingTop: 23,
				backgroundColor: COLORS?.white,
				borderRadius: 20,
				alignItems: 'center',
				elevation: 3,
			}}
		>
			<View
				style={{
					height: 54,
					width: 54,
					borderRadius: 100,
					backgroundColor: '#FAFAFE',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Image style={{ height: 28, width: 28 }} source={require('./icons/graduationHat.png')} />
			</View>
			<View style={{ gap: 10, alignItems: 'center', paddingTop: 10 }}>
				<Text style={{ fontSize: 28, fontFamily: FONTS?.bold, lineHeight: 34 }}>3</Text>
				<Text style={{ fontSize: 12, fontFamily: FONTS?.regular, lineHeight: 14, paddingTop: 2 }}>
					Courses
				</Text>
			</View>
		</View>
	)
}
