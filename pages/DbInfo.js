import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Path, Svg } from 'react-native-svg'
import { COLORS, FONTS } from '../styles/theme'
import { useNavigation } from '@react-navigation/native'

export default function DbInfo() {
	const navigation = useNavigation()

	return (
		<View style={{ flex: 1 }}>
			<StatusBar style='dark' />

			<View style={{ paddingTop: 60, flexDirection: 'row', paddingLeft: 20, paddingRight: 20 }}>
				<TouchableOpacity
					style={{ padding: 20, paddingLeft: 0 }}
					onPress={() => navigation.push('Db')}
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
						What does the database contain?
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
						Total students:
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 8,
						}}
					>
						Total students in the batch
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
						Average attendance:
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 8,
						}}
					>
						Displays the average attendance for the batch across all sessions.
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
						Student details:
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 8,
						}}
					>
						All the students in the batch can be viewed with their stats.{'\n'}
						Emails can be sent to students individually.
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
						Students with attendance {'< 80%'}
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 8,
						}}
					>
						Shows the list of students with attendance {'< 80%'}.
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
						}}
					>
						The list can be exported as a separate CSV file with the attendance percentage for each
						student.
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
						}}
					>
						An email can be sent to all students with a pre-generated template
						{' (which can be edited if necessary).'}
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
						Delete students or batch:
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 8,
						}}
					>
						Students can be deleted from the batch.{'\n'}
						Once deleted, all the information related to the student will be deleted including the
						attendance details.
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
						}}
					>
						The database provides an option to delete the batch in its entirety.{'\n'}
						Once deleted, all the information related to the batch will be deleted including the
						attendance details.
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
						Add student
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 8,
						}}
					>
						Students can be added to batch if necessary.
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
						}}
					>
						Please make sure the roll number is unique when entering the details.
					</Text>
				</View>
			</ScrollView>
		</View>
	)
}
