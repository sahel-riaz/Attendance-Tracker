import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Navbar from '../components/Navbar'

import { COLORS, FONTS } from '../styles/theme'
import { useEffect, useState } from 'react'
import { Path, Svg } from 'react-native-svg'
import AsyncStorage from '@react-native-async-storage/async-storage'
import email from 'react-native-email'

export default function DbStudent({ route, navigation }) {
	const { course, classs, id } = route.params

	const [studentsCount, setStudentsCount] = useState(0)
	const [student, setStudent] = useState()
	const [status, setStatus] = useState()
	const [stats, setStats] = useState([])
	const [warning, setWarning] = useState(0)
	const [res, setRes] = useState({})

	useEffect(() => {
		if (course == null) return
		async function fetch() {
			AsyncStorage.getItem(course)
				.then((res) => {
					res = JSON.parse(res)
					setRes(res)
					setStudentsCount(res.classes[classs].students.length)
					setStudent(res.classes[classs].students[id])
				})
				.catch((e) => {
					console.log(e)
				})
		}
		fetch()
	}, [])

	useEffect(() => {
		if (!student) return
		var tempStats = [0, 0, 0]
		for (let i = 0; i < student.attendance.length; i++) {
			if (student.attendance[i] == 0) {
				tempStats[0]++
			} else if (student.attendance[i] == 1) {
				tempStats[1]++
			} else if (student.attendance[i] == 2) {
				tempStats[2]++
			}
		}
		setStats(tempStats)

		var absentCount = 0
		var tempAbsentCount = 0
		for (let i = 0; i < student.attendance.length; i++) {
			if (student.attendance[i] == 0) {
				tempAbsentCount++
				absentCount = Math.max(absentCount, tempAbsentCount)
			} else {
				tempAbsentCount = 0
			}
		}
		setWarning(absentCount)
	}, [student])

	function handleEmail() {
		/**
		 *
		 * 3 different cases:
		 *
		 *   -> {FName} .. {LName} = {FName}_Rollno@nitc.ac.in
		 *   -> {I} {FName} .. {LName} = {FName}_Rollno@nitc.ac.in
		 *   -> {I} {I} {FName} .. {LName} = {I}{I}{FName}_Rollno@nitc.ac.in
		 *
		 */

		let to = ''

		const names = student.studentName.split(' ')

		if (names[0].length == 1) {
			if (names[1].length == 1) {
				to =
					names[0].toLowerCase() +
					names[1].toLowerCase() +
					names[2].toLowerCase() +
					'_' +
					student.rollNumber.toLowerCase() +
					'@nitc.ac.in'
			} else {
				to = names[1].toLowerCase() + '_' + student.rollNumber.toLowerCase() + '@nitc.ac.in'
			}
		} else {
			to = names[0].toLowerCase() + '_' + student.rollNumber.toLowerCase() + '@nitc.ac.in'
		}

		email([to], {
			subject: 'Test 3 subject',
			body: 'Test 3 body',
		}).catch(console.error)
	}

	return (
		<View style={{ flex: 1 }}>
			<View style={{ paddingTop: 80, flexDirection: 'row', padding: 20 }}>
				<Svg
					width='20'
					height='20'
					viewBox='0 0 16 17'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					onPress={() =>
						navigation.reset({
							index: 0,
							routes: [
								{ name: 'Students', params: { course: course, classs: classs, date: date } },
							],
						})
					}
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
						View details
					</Text>
				</View>
			</View>

			<View
				style={{
					marginLeft: 24,
					marginRight: 24,
					marginTop: 32,
					borderColor: COLORS?.borderGrey,
					borderWidth: 1,
					borderRadius: 15,
					paddingBottom: 40,
					paddingTop: 40,
					paddingLeft: 24,
					paddingRight: 24,
				}}
			>
				<View style={{}}>
					<Text style={{ fontFamily: FONTS?.bold, color: COLORS?.selectGrey, fontSize: 16 }}>
						Student name:
					</Text>
					<Text style={{ marginTop: 5, fontFamily: FONTS?.bold, fontSize: 16 }}>
						{student && student.studentName}
					</Text>
				</View>
				<View style={{ marginTop: 20 }}>
					<Text style={{ fontFamily: FONTS?.bold, color: COLORS?.selectGrey, fontSize: 16 }}>
						Roll no:
					</Text>
					<Text style={{ marginTop: 5, fontFamily: FONTS?.bold, fontSize: 16 }}>
						{student && student.rollNumber}
					</Text>
				</View>
				<View style={{ marginTop: 20 }}>
					<View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: COLORS?.green,
								borderRadius: 7,
								height: 70,
								flex: 1,
							}}
						>
							<Text style={{ fontFamily: FONTS?.bold, fontSize: 22 }}>{stats[1]}</Text>
							<Text style={{ fontFamily: FONTS?.bold, fontSize: 14 }}>Present</Text>
						</View>
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: COLORS?.lightRed,
								borderRadius: 7,
								height: 70,
								flex: 1,
								marginLeft: 10,
							}}
						>
							<Text style={{ fontFamily: FONTS?.bold, fontSize: 22 }}>{stats[0]}</Text>
							<Text style={{ fontFamily: FONTS?.bold, fontSize: 14 }}>Absent</Text>
						</View>
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: COLORS?.yellow,
								borderRadius: 7,
								height: 70,
								flex: 1,
								marginLeft: 10,
							}}
						>
							<Text style={{ fontFamily: FONTS?.bold, fontSize: 22 }}>{stats[2]}</Text>
							<Text style={{ fontFamily: FONTS?.bold, fontSize: 14 }}>Late</Text>
						</View>
					</View>
					<View
						style={{
							backgroundColor: COLORS?.borderGrey,
							marginTop: 10,
							justifyContent: 'center',
							borderRadius: 7,
							alignItems: 'center',
							height: 40,
						}}
					>
						<Text style={{ fontFamily: FONTS?.bold, fontSize: 14 }}>
							Out of {student && student.attendance.length} classes
						</Text>
					</View>
				</View>
				{warning > 2 ? (
					<View style={{ flexDirection: 'row', marginTop: 25 }}>
						<Svg
							width='17'
							height='17'
							viewBox='0 0 17 17'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<Path
								d='M8.50005 6.37495V9.91662M8.50005 15.1654H4.20755C1.74964 15.1654 0.722554 13.4087 1.91255 11.2624L4.12255 7.28162L6.20505 3.54162C7.46589 1.26787 9.53422 1.26787 10.7951 3.54162L12.8776 7.2887L15.0876 11.2695C16.2776 13.4158 15.2434 15.1724 12.7926 15.1724H8.50005V15.1654Z'
								stroke='#FF0000'
								stroke-width='1.5'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
							<Path
								d='M8.49646 12.0416H8.50283'
								stroke='#FF0000'
								stroke-width='2'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
						</Svg>

						<Text style={{ paddingLeft: 7, fontFamily: FONTS?.bold, color: COLORS?.red }}>
							Absent for {warning} consecutive days
						</Text>
					</View>
				) : (
					<></>
				)}
				<TouchableOpacity
					style={{
						height: 43,
						width: 160,
						backgroundColor: COLORS?.blue,
						alignItems: 'center',
						borderRadius: 10,
						flexDirection: 'row',
						justifyContent: 'center',
						marginTop: 40,
						alignSelf: 'center',
					}}
					onPress={() => {
						handleEmail()
					}}
					activeOpacity={0.7}
				>
					<Svg
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<Path
							d='M16.14 2.95998L7.11 5.95998C1.04 7.98998 1.04 11.3 7.11 13.32L9.79 14.21L10.68 16.89C12.7 22.96 16.02 22.96 18.04 16.89L21.05 7.86998C22.39 3.81998 20.19 1.60998 16.14 2.95998ZM16.46 8.33998L12.66 12.16C12.51 12.31 12.32 12.38 12.13 12.38C11.94 12.38 11.75 12.31 11.6 12.16C11.4605 12.0188 11.3823 11.8284 11.3823 11.63C11.3823 11.4316 11.4605 11.2411 11.6 11.1L15.4 7.27998C15.69 6.98998 16.17 6.98998 16.46 7.27998C16.75 7.56998 16.75 8.04998 16.46 8.33998Z'
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
						Email student
					</Text>
				</TouchableOpacity>
			</View>
			<Navbar />
		</View>
	)
}
