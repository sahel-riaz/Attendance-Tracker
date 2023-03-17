import { Text, View } from 'react-native'
import { COLORS, FONTS } from '../styles/theme'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { Path, Svg } from 'react-native-svg'

export default function Info() 
{	
	const navigation = useNavigation()
	return (
		<View style={{flex : 1}}>
			<View style={{ paddingTop: 80, flexDirection: 'row', padding: 20 }}>
				<View
					style={{
						position: 'absolute',
						top: 80,
						left: 0,
						right: 0,
						alignItems: 'center',
						marginBottom: 20,
					}}
				>
					<Text
						style={{
							fontFamily: FONTS?.bold,
							color: COLORS?.subHeading,
							fontSize: 16,
							lineHeight: 19,
						}}
					>
						Info
					</Text>
				</View>
			</View>
		</View>
		)
}
