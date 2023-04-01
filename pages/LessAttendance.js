import { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import { FlatList } from 'react-native-gesture-handler'
import * as MailComposer from 'expo-mail-composer'

//components
import Navbar from '../components/Navbar'

//themesw
import { COLORS, FONTS } from '../styles/theme'

export default function LessAttendance({ route, navigation }) {
	const { course, classs } = route.params

	const [students, setStudents] = useState([])
	const [faculty, setFaculty] = useState('')

	useEffect(() => {
		if (course == null) return
		async function fetch() {
			AsyncStorage.getItem(course)
				.then((res) => {
					res = JSON.parse(res)
					var tempStudents = []
					for (let i = 0; i < res['classes'][classs].students.length; i++) {
						var tempCount = 0
						for (let j = 0; j < res['classes'][classs].students[i].attendance.length; j++) {
							if (
								res['classes'][classs].students[i].attendance[j] == 1 || //present
								res['classes'][classs].students[i].attendance[j] == 2 //late
							)
								tempCount += 1
						}
						console.log(tempCount / res['classes'][classs].students[i].attendance.length)
						if (tempCount / res['classes'][classs].students[i].attendance.length < 0.8) {
							tempStudents.push(res['classes'][classs].students[i])
						}
					}
					setStudents(tempStudents)
				})
				.catch((e) => {
					console.log(e)
				})
			AsyncStorage.getItem('settings').then((res) => {
				setFaculty(res)
			})
		}
		fetch()
	}, [])

	function handleAllEmail() {
		let to = []

		for (let i = 0; i < students.length; i++) {
			if (students[i].emailId != null) {
				to.push(students[i].emailId)
			} else {
				/*
				 *
				 * emailId is not there -> generate emailId from name and rollNumber
				 *
				 * 3 different cases:
				 *
				 *   -> {FName} .. {LName} = {FName}_Rollno@nitc.ac.in
				 *   -> {I} {FName} .. {LName} = {FName}_Rollno@nitc.ac.in
				 *   -> {I} {I} {FName} .. {LName} = {I}{I}{FName}_Rollno@nitc.ac.in
				 *
				 */

				const names = students[i].studentName.split(' ')

				if (names[0].length == 1) {
					if (names[1].length == 1) {
						to =
							names[0].toLowerCase() +
							names[1].toLowerCase() +
							names[2].toLowerCase() +
							'_' +
							students[i].rollNumber.toLowerCase() +
							'@nitc.ac.in'
					} else {
						to =
							names[1].toLowerCase().trim() +
							'_' +
							students[i].rollNumber.toLowerCase().trim() +
							'@nitc.ac.in'
					}
				} else {
					to =
						names[0].toLowerCase().trim() +
						'_' +
						students[i].rollNumber.toLowerCase().trim() +
						'@nitc.ac.in'
				}
			}
		}

		MailComposer.composeAsync({
			recipients: to,
			subject: `Low attendance in ${course} - ${classs}`,
			body: `Dear students
	
					Your attendance in the course ${course} is noted to be low. Please attend the next class without fail.
					
					Regards
					${faculty}
					${course}
				`,
		})
	}

	return (
		<View style={{ flex: 1 }}>
			<StatusBar style='dark' />

			<View
				style={{
					paddingTop: 60,
					flexDirection: 'row',
					paddingRight: 20,
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<TouchableOpacity
					style={{ padding: 20 }}
					onPress={() => navigation.push('DbStudents', { course: course, classs: classs })}
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
						Attendance {'<'} 80%
					</Text>
				</View>
			</View>

			<View
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: 43,
					backgroundColor: COLORS?.borderGrey,
					borderRadius: 10,
					marginTop: 25,
					marginLeft: 24,
					marginRight: 24,
				}}
			>
				<Text style={{ fontFamily: FONTS?.bold, fontSize: 16 }}>
					Total students: {students?.length}
				</Text>
			</View>

			<Text style={{ fontFamily: FONTS?.bold, fontSize: 16, paddingLeft: 24, marginTop: 25 }}>
				Students:
			</Text>
			<View
				style={{
					paddingLeft: 24,
					paddingRight: 24,
					width: '100%',
					marginTop: 10,
					marginBottom: 320,
				}}
			>
				{students.length > 1 && (
					<FlatList
						keyExtractor={(student) => student.rollNumber}
						data={students}
						renderItem={({ item, index }) => (
							<TouchableOpacity
								rollNumber={item.rollNumber}
								style={{
									marginTop: 8,
									paddingLeft: 16,
									paddingRight: 10,
									paddingBottom: 12,
									paddingTop: 12,
									borderColor: COLORS?.borderGrey,
									borderWidth: 1,
									borderRadius: 10,
									width: '100%',
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
								activeOpacity={0.4}
								onPress={() =>
									navigation.push('DbStudent', {
										course: course,
										classs: classs,
										id: index,
									})
								}
							>
								<Text style={{ fontSize: 18, fontFamily: FONTS?.regular }} numberOfLines={1}>
									{item.studentName}
								</Text>
								<Svg
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<Path
										d='M14.43 5.93005L20.5 12.0001L14.43 18.0701M3.5 12.0001H20.33'
										stroke='black'
										stroke-width='1.5'
										stroke-miterlimit='10'
										stroke-linecap='round'
										stroke-linejoin='round'
									/>
								</Svg>
							</TouchableOpacity>
						)}
					/>
				)}
				<TouchableOpacity
					style={{
						height: 43,
						backgroundColor: COLORS?.blue,
						alignItems: 'center',
						borderRadius: 10,
						flexDirection: 'row',
						justifyContent: 'center',
						alignSelf: 'center',
						marginRight: 10,
						paddingLeft: 20,
						paddingRight: 20,
						marginTop: 30,
					}}
					onPress={() => handleAllEmail()}
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
							d='M12.7775 2.34331L5.62872 4.71831C0.823304 6.32539 0.823304 8.94581 5.62872 10.545L7.75039 11.2496L8.45497 13.3712C10.0541 18.1766 12.6825 18.1766 14.2816 13.3712L16.6646 6.23039C17.7254 3.02414 15.9837 1.27456 12.7775 2.34331ZM13.0308 6.60247L10.0225 9.62664C9.90372 9.74539 9.7533 9.80081 9.60289 9.80081C9.45247 9.80081 9.30205 9.74539 9.1833 9.62664C9.07288 9.51491 9.01096 9.36415 9.01096 9.20706C9.01096 9.04997 9.07288 8.89921 9.1833 8.78747L12.1916 5.76331C12.4212 5.53372 12.8012 5.53372 13.0308 5.76331C13.2604 5.99289 13.2604 6.37289 13.0308 6.60247Z'
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
						Email all students
					</Text>
				</TouchableOpacity>
			</View>
			<Navbar />
		</View>
	)
}
