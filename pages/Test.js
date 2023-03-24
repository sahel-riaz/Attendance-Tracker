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
				height: 436,
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
			<View
				style={{
					width: 270,
					height: 376,
					borderWidth: 1,
				}}
			>
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
					<View
						style={{
							width: 270,
							height: 70,
							marginTop: 5,
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<View
							style={{
								width: 82,
								height: 70,
								padding: 12,
								borderwidth: 1,
								borderRadius: 7,
								borderColor: '#66DDAA',
								backgroundColor: '#66DDAA',
							}}
						>
							<View style={{ height: 46, width: 58, alignItems: 'center' }}>
								<View>
									<Text>7</Text>
								</View>
								<View style={{ marginTop: 3 }}>
									<Text>Present</Text>
								</View>
							</View>
						</View>
						<View
							style={{
								width: 82,
								height: 70,
								padding: 12,
								borderwidth: 1,
								borderRadius: 7,
								borderColor: '#FA8072',
								backgroundColor: '#FA8072',
							}}
						>
							<View style={{ height: 46, width: 58, alignItems: 'center' }}>
								<View>
									<Text>3</Text>
								</View>
								<View style={{ marginTop: 3 }}>
									<Text>Absent</Text>
								</View>
							</View>
						</View>
						<View
							style={{
								width: 82,
								height: 70,
								padding: 12,
								borderwidth: 1,
								borderRadius: 7,
								borderColor: '#FFD800',
								backgroundColor: '#FFD800',
							}}
						>
							<View style={{ height: 46, width: 58, alignItems: 'center' }}>
								<View>
									<Text>2</Text>
								</View>
								<View style={{ marginTop: 3 }}>
									<Text>Late</Text>
								</View>
							</View>
						</View>
					</View>
					<View
						style={{
							width: 270,
							height: 40,
							marginTop: 12,
							padding: 12,
							backgroundColor: '#D9D9D9',
							alignItems: 'center',
						}}
					>
						<Text
							style={{
								fontFamily: FONTS?.bold,
								color: COLORS?.selectblack,
								fontWeight: 600,
								fontSize: 14,
								lineHeight: 16.8,
							}}
						>
							Out of 10 Classes
						</Text>
					</View>
				</View>
				<View
					style={{
						width: 211,
						height: 17,
					}}
				>
					<View></View>
					<View></View>
				</View>
			</View>
		</View>
	)
}
