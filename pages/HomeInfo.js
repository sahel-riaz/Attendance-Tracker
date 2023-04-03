import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Path, Svg } from 'react-native-svg'
import { COLORS, FONTS } from '../styles/theme'
import { useNavigation } from '@react-navigation/native'

export default function HomeInfo() {
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
						User manual
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
						What is it?
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 8,
						}}
					>
						This app is designed to ease the process of marking attendance in class.
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
						Who is it for?
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 8,
						}}
					>
						Although anyone can access the app, it is indented for faculties and teaching staff.
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
						How to use?
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 8,
						}}
					>
						This application has 5 main pages and each page contains instructions on how to use it.
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
						}}
					>
						1. Home page contains some stats and a 'Quick navigation' section to mark attendance
						immediately.
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
						}}
					>
						2. Import roll list into the app by going to the 'Import student roll list' page.
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
						}}
					>
						3. To take attendance for a particular batch, go to the 'Mark attendance' page
						{' (big blue button in the bottom middle)'}
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
						}}
					>
						4. To view batch details and statistics, go to 'View student database' page.
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
						}}
					>
						5. Export attendance details by going to 'Export attendance' page.
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
						Why would you use this?
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 8,
						}}
					>
						This app digitizes and eases the process of marking attendance in class.
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
						}}
					>
						Import student roll list as a CSV file directly into the app.
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
						}}
					>
						Intuitive and clean UI to take attendance.
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
						}}
					>
						Gives you rich and detailed statistics.
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
						}}
					>
						Export attendance for a batch whenever necessary as a CSV file.
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
						Contact
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 8,
						}}
					>
						If you have found a bug or have any queries, please send a mail to:
						aadhavanlenin@gmail.com
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.bold,
							fontSize: 12,
							lineHeight: 20,
							marginTop: 30,
							alignSelf: 'center',
						}}
					>
						Made with ❤️ by students from CSE, NITC
					</Text>
				</View>
			</ScrollView>
		</View>
	)
}
