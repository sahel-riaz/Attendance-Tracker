import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Navbar from '../components/Navbar'

import { COLORS, FONTS } from '../styles/theme'
import { useEffect, useState } from 'react'
import { Path, Svg } from 'react-native-svg'

import { useNavigation } from '@react-navigation/native'

export default function Test() {
	const navigation = useNavigation()
	return (
		<View
			style={{
				width: 320,
				height: 358,
				paddingTop: 30,
				paddingBottom: 30,
				paddingLeft: 25,
				paddingRight: 25,
				marginTop: 50,
				marginLeft: 35,
				borderWidth: 1,
				borderColor: '#D8D8D8',
				borderRadius: 15,
			}}
		>
			<View style={{ width: 270, height: 298, borderWidth: 1 }}>
				<View>
					<Text
						style={{
							fontFamily: FONTS?.bold,
							color: COLORS?.selectGrey,
							fontWeight: 700,
							fontSize: 16,
							lineHeight: 19,
						}}
					>
						Student Name:
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.bold,
							color: COLORS?.selectblack,
							fontWeight: 700,
							fontSize: 16,
							lineHeight: 19,
						}}
					>
						Pavanitha B
					</Text>
				</View>
				<View style={{ marginTop: 15 }}>
					<Text
						style={{
							fontFamily: FONTS?.bold,
							color: COLORS?.selectGrey,
							fontWeight: 700,
							fontSize: 16,
							lineHeight: 19,
						}}
					>
						Roll no:
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.bold,
							color: COLORS?.selectblack,
							fontWeight: 700,
							fontSize: 16,
							lineHeight: 19,
						}}
					>
						B200702CS
					</Text>
				</View>
				<View style={{ marginTop: 15 }}>
					<Text
						style={{
							fontFamily: FONTS?.bold,
							color: COLORS?.selectGrey,
							fontWeight: 700,
							fontSize: 16,
							lineHeight: 19,
						}}
					>
						Stats:
					</Text>
				</View>
			</View>
		</View>
	)
}
