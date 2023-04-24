import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Path, Svg } from 'react-native-svg'
import { COLORS, FONTS } from '../styles/theme'
import { useNavigation } from '@react-navigation/native'

export default function MarkInfo() {
	const navigation = useNavigation()

	return (
		<View style={{ flex: 1 }}>
			<StatusBar style='dark' />

			<View style={{ paddingTop: 60, flexDirection: 'row', paddingLeft: 20, paddingRight: 20 }}>
				<TouchableOpacity
					style={{ padding: 20, paddingLeft: 0 }}
					onPress={() => navigation.push('Home')}
				>
					<Svg
						width='20'
						height='20'
						viewBox='0 0 16 17'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<Path
							d='M9.99998 13.78L5.65331 9.4333C5.13998 8.91997 5.13998 8.07997 5.65331 7.56664L9.99998 3.21997'
							stroke='#525058'
							stroke-width='1.5'
							stroke-miterlimit='10'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
					</Svg>
				</TouchableOpacity>
				<View
					style={{
						position: 'absolute',
						top: 80,
						left: 0,
						right: 0,
						alignItems: 'center',
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
						How to mark attendance?
					</Text>
				</View>
			</View>
			<ScrollView style={{ marginTop: 30, marginBottom: 20, paddingLeft: 20, paddingRight: 20 }}>
				<View>
					<Text
						style={{
							fontFamily: FONTS?.bold,
							fontSize: 16,
							lineHeight: 19,
						}}
					>
						Course:
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 8,
						}}
					>
						Select the course of the respective batch you want to take attendance for.
					</Text>
				</View>

				<View style={{ marginTop: 30 }}>
					<Text
						style={{
							fontFamily: FONTS?.bold,
							fontSize: 16,
							lineHeight: 19,
						}}
					>
						Batch:
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 8,
						}}
					>
						Select the required batch from the dropdown.
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 8,
						}}
					>
						If the batch you wanted is not available in the dropdown, check the selected course
						again.
					</Text>
				</View>

				<View style={{ marginTop: 30 }}>
					<Text
						style={{
							fontFamily: FONTS?.bold,
							fontSize: 16,
							lineHeight: 19,
						}}
					>
						Date / Time:
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 8,
						}}
					>
						Once the course and batch are selected, the current date and time will automatically be
						set.
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
						}}
					>
						To take attendance for a new session, click on 'Apply' button.
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
						}}
					>
						To change attendance of previous sessions, select the respective date/time for that
						session from the dropdown and click on 'Apply'.
					</Text>
				</View>
			</ScrollView>
		</View>
	)
}
