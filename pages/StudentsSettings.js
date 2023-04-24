import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Path, Svg } from 'react-native-svg'

//components
import ErrorPopUp from '../components/ErrorPopUp'

//themes
import { COLORS, FONTS } from '../styles/theme'
import { ScrollView } from 'react-native-gesture-handler'

export default function DbSettings({ route, navigation }) {
	const { course, batch, date, dateIndex } = route.params

	const [trigger, setTrigger] = useState(false)

	function handleDeleteSession() {
		AsyncStorage.getItem(course)
			.then((res) => {
				res = JSON.parse(res)
				res['batches'][batch]['date'].splice(dateIndex, 1)
				for (let i = 0; i < res['batches'][batch]['students'].length; i++) {
					res['batches'][batch]['students'][i]['attendance'].splice(dateIndex, 1)
				}
				res = JSON.stringify(res)
				AsyncStorage.setItem(course, res)
			})
			.then(() => {
				navigation.push('Mark')
			})
	}

	function onCancel() {
		setTrigger(false)
	}

	function onDelete() {
		handleDeleteSession()
		setTrigger(false)
	}

	/*=============================================
	=               preventGoingBack              =
	=============================================*/

	navigation.addListener(
		'beforeRemove',
		(e) => {
			e.preventDefault()
			navigation.push('Students', { course: course, batch: batch, date: date })
		},
		[navigation]
	)

	return (
		<View style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}>
			<StatusBar style='dark' />
			<ErrorPopUp
				data='Are you sure you want to delete this session?'
				trigger={trigger}
				onCancel={onCancel}
				onDelete={onDelete}
			/>
			<View style={{ paddingTop: 60, flexDirection: 'row' }}>
				<TouchableOpacity
					style={{ padding: 20, paddingLeft: 0 }}
					onPress={() => navigation.push('Students', { course: course, batch: batch, date: date })}
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
						Session information
					</Text>
				</View>
			</View>

			<ScrollView style={{ marginTop: 30, marginBottom: 20 }}>
				<View>
					<Text
						style={{
							fontFamily: FONTS?.bold,
							fontSize: 16,
							lineHeight: 19,
						}}
					>
						Color key:
					</Text>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: 8,
						}}
					>
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								paddingTop: 13,
								paddingBottom: 13,
								flex: 1 / 4,
								backgroundColor: COLORS?.borderGrey,
								borderRadius: 10,
								borderWidth: 3,
								borderStyle: 'solid',
								borderColor: '#E8E8E8',
							}}
						>
							<Text style={{ fontFamily: FONTS?.regular, fontSize: 10 }}>Not marked</Text>
						</View>
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								paddingTop: 13,
								paddingBottom: 13,
								flex: 1 / 4,
								marginLeft: 10,
								backgroundColor: COLORS?.green,
								borderRadius: 10,
								borderWidth: 3,
								borderStyle: 'solid',
								borderColor: '#ABE2CB',
							}}
						>
							<Text style={{ fontFamily: FONTS?.regular, fontSize: 14 }}>Present</Text>
						</View>
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								paddingTop: 13,
								paddingBottom: 13,
								flex: 1 / 4,
								marginLeft: 10,
								backgroundColor: COLORS?.lightRed,
								borderRadius: 10,
								borderWidth: 3,
								borderStyle: 'solid',
								borderColor: '#FFA196',
							}}
						>
							<Text style={{ fontFamily: FONTS?.regular, fontSize: 14 }}>Absent</Text>
						</View>
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								paddingTop: 13,
								paddingBottom: 13,
								flex: 1 / 4,
								marginLeft: 10,
								backgroundColor: COLORS?.yellow,
								borderRadius: 10,
								borderWidth: 3,
								borderStyle: 'solid',
								borderColor: '#FFEE93',
							}}
						>
							<Text style={{ fontFamily: FONTS?.regular, fontSize: 14 }}>Late</Text>
						</View>
					</View>
				</View>

				<View style={{ marginTop: 30 }}>
					<Text
						style={{
							fontFamily: FONTS?.bold,
							fontSize: 16,
							lineHeight: 19,
						}}
					>
						Total students & percentage:
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 8,
						}}
					>
						Shows the number of students in the batch and the attendance percentage for this
						session.
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
						Students:
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 8,
						}}
					>
						All the students in the batch are displayed below.
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
						How to start taking attendance?
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 8,
						}}
					>
						When a new session is created, all students are 'Not marked' by default.
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
						}}
					>
						Click on the first student to start marking attendance for the entire batch.
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
						}}
					>
						App will take you to a page with student details and 5 different buttons, each with
						their own actions:
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 12,
							paddingLeft: 14,
						}}
					>
						<Text style={{ fontStyle: 'italic', color: COLORS?.green, fontFamily: FONTS?.bold }}>
							/*
						</Text>
						<Text style={{ fontStyle: 'italic' }}>Present</Text> - Mark current student as present
						and redirect to next student.
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
							paddingLeft: 14,
						}}
					>
						<Text style={{ fontStyle: 'italic', color: COLORS?.yellow, fontFamily: FONTS?.bold }}>
							/*
						</Text>
						<Text style={{ fontStyle: 'italic' }}>Late</Text> - Mark current student as late and
						redirect to next student.
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
							paddingLeft: 14,
						}}
					>
						<Text style={{ fontStyle: 'italic', color: COLORS?.red, fontFamily: FONTS?.bold }}>
							/*
						</Text>
						<Text style={{ fontStyle: 'italic' }}>Absent</Text> - Mark current student as absent and
						redirect to next student.
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
							paddingLeft: 14,
						}}
					>
						<Text
							style={{ fontStyle: 'italic', color: COLORS?.borderGrey, fontFamily: FONTS?.bold }}
						>
							/*
						</Text>
						<Text style={{ fontStyle: 'italic' }}>Previous</Text> - Go to the previous student
						without changing the attendance of the current student.
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
							paddingLeft: 14,
						}}
					>
						<Text
							style={{ fontStyle: 'italic', color: COLORS?.borderGrey, fontFamily: FONTS?.bold }}
						>
							/*
						</Text>
						<Text style={{ fontStyle: 'italic' }}>Skip</Text> - Go to the next student without
						changing the attendance of the current student.
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
						}}
					>
						The page also contains details of the student including:
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 12,
							paddingLeft: 14,
						}}
					>
						1. Student Name
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
							paddingLeft: 14,
						}}
					>
						2. Roll number
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
							paddingLeft: 14,
						}}
					>
						3. Stats: attendance statistics for that student
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
							paddingLeft: 14,
						}}
					>
						4. Total sessions & attendance percentage: If the attendance is {'<80%'}, a{' '}
						<Text style={{ color: COLORS?.red }}>red</Text> box will appear around the screen.
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
							paddingLeft: 14,
						}}
					>
						5. (optional) If the student is absent for 3 or more days, a warning will be displayed
						in <Text style={{ color: COLORS?.red }}>red.</Text>
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
						Change attendance
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 8,
						}}
					>
						Navigate to the student you want to the change the attendance for. Click on the
						appropriate button to mark. Return back by clicking on the back arrow button.
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
						Delete session
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 8,
						}}
					>
						To delete all the attendance information of this particular session, click on the button
						below.
					</Text>
				</View>
			</ScrollView>
			<TouchableOpacity
				style={{
					height: 43,
					width: '100%',
					backgroundColor: COLORS?.red,
					alignItems: 'center',
					borderRadius: 10,
					flexDirection: 'row',
					justifyContent: 'center',
					marginBottom: 20,
				}}
				onPress={() => {
					setTrigger(true)
				}}
				activeOpacity={0.7}
			>
				<Svg
					width='19'
					height='19'
					viewBox='0 0 19 19'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<Path
						d='M16.6803 4.1404C15.4057 4.01373 14.1312 3.91873 12.8487 3.84748V3.83956L12.6745 2.8104C12.5557 2.08206 12.3816 0.989563 10.5291 0.989563H8.4549C6.61032 0.989563 6.43615 2.03456 6.30948 2.80248L6.14323 3.81581C5.40698 3.86331 4.67073 3.91081 3.93448 3.98206L2.31948 4.1404C1.98698 4.17206 1.74948 4.46498 1.78115 4.78956C1.81282 5.11415 2.09782 5.35165 2.43032 5.31998L4.04532 5.16165C8.19365 4.74998 12.3737 4.90831 16.5695 5.3279H16.6328C16.9337 5.3279 17.1949 5.09831 17.2266 4.78956C17.2385 4.63142 17.188 4.4749 17.0859 4.35355C16.9838 4.2322 16.8382 4.15568 16.6803 4.1404ZM15.2237 6.44415C15.0337 6.24623 14.7724 6.1354 14.5032 6.1354H4.49657C4.2274 6.1354 3.95823 6.24623 3.77615 6.44415C3.59407 6.64206 3.49115 6.91123 3.50698 7.18831L3.99782 15.3108C4.0849 16.5141 4.19573 18.0183 6.95865 18.0183H12.0412C14.8041 18.0183 14.9149 16.5221 15.002 15.3108L15.4928 7.19623C15.5087 6.91123 15.4057 6.64206 15.2237 6.44415ZM10.8141 14.0521H8.17782C7.85323 14.0521 7.58407 13.7829 7.58407 13.4583C7.58407 13.1337 7.85323 12.8646 8.17782 12.8646H10.8141C11.1387 12.8646 11.4078 13.1337 11.4078 13.4583C11.4078 13.7829 11.1387 14.0521 10.8141 14.0521ZM11.4791 10.8854H7.52073C7.19615 10.8854 6.92698 10.6162 6.92698 10.2916C6.92698 9.96706 7.19615 9.6979 7.52073 9.6979H11.4791C11.8037 9.6979 12.0728 9.96706 12.0728 10.2916C12.0728 10.6162 11.8037 10.8854 11.4791 10.8854Z'
						fill='white'
					/>
				</Svg>

				<Text
					style={{
						paddingLeft: 10,
						fontFamily: FONTS?.regular,
						fontSize: 16,
						color: COLORS?.white,
					}}
				>
					Delete session
				</Text>
			</TouchableOpacity>
		</View>
	)
}
