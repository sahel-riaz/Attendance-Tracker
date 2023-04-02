import { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import { FlatList } from 'react-native-gesture-handler'
import * as MailComposer from 'expo-mail-composer'

//themes
import { COLORS, FONTS } from '../styles/theme'
import { StorageAccessFramework } from 'expo-file-system'
import { jsonToCSV } from 'react-native-csv'

export default function LessAttendance({ route, navigation }) {
	const { course, batch } = route.params

	const [students, setStudents] = useState([])
	const [faculty, setFaculty] = useState('')
	const [percentages, setPercentages] = useState([])

	useEffect(() => {
		if (course == null) return
		async function fetch() {
			AsyncStorage.getItem(course)
				.then((res) => {
					res = JSON.parse(res)
					let tempStudents = []
					let tempPercentages = []
					for (let i = 0; i < res['batches'][batch].students.length; i++) {
						var tempCount = 0
						for (let j = 0; j < res['batches'][batch].students[i].attendance.length; j++) {
							if (
								res['batches'][batch].students[i].attendance[j] == 1 || //present
								res['batches'][batch].students[i].attendance[j] == 2 //late
							)
								tempCount += 1
						}
						let tempPercentage = tempCount / res['batches'][batch].students[i].attendance.length
						if (tempPercentage < 0.8) {
							tempStudents.push(res['batches'][batch].students[i])
							tempPercentages.push(tempPercentage)
						}
					}
					setStudents(tempStudents)
					setPercentages(tempPercentages)
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
			subject: `Low attendance in ${course} - ${batch}`,
			body: `Dear students
	
					Your attendance in the course ${course} is noted to be low. Please attend the next batch without fail.
					
					Regards
					${faculty}
					${course}
				`,
		})
	}

	async function handleExport() {
		AsyncStorage.getItem(course).then((res) => {
			const jsDate = new Date()
			const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
			const [dotw, day, month, year, hours, minutes, seconds] = [
				weekday[jsDate.getDay()],
				jsDate.getDate(),
				jsDate.getMonth() + 1,
				jsDate.getFullYear(),
				jsDate.getHours(),
				jsDate.getMinutes(),
				jsDate.getSeconds(),
			]

			const date = String(
				dotw + ', ' + day + '/' + month + '/' + year + '-' + hours + ':' + minutes + ':' + seconds
			)
			const fileName = 'Low Attendance' + ' || ' + date

			var header = ['Roll No.', 'Student Name', 'Percentage']

			var student = []

			for (let i = 0; i < students.length; i++) {
				student = [
					...student,
					[students[i].rollNumber.trim(), students[i].studentName, percentages[i].toFixed(2)],
				]
			}

			StorageAccessFramework.requestDirectoryPermissionsAsync()
				.then((res) => {
					const folderLocation = res['directoryUri']
					const results = jsonToCSV({
						fields: header,
						data: student,
					})
					StorageAccessFramework.createFileAsync(folderLocation, fileName, 'text/csv').then(
						(res) => {
							StorageAccessFramework.writeAsStringAsync(res, results)
						}
					)
				})
				.catch((e) => {
					console.log(e)
				})
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
					onPress={() => navigation.push('DbStudents', { course: course, batch: batch })}
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
				{students.length > 0 && (
					<FlatList
						keyExtractor={(student) => student.rollNumber}
						data={students}
						renderItem={({ item, index }) => (
							<View
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
							>
								<Text style={{ fontSize: 18, fontFamily: FONTS?.regular }} numberOfLines={1}>
									{item.studentName}
								</Text>
							</View>
						)}
					/>
				)}
				<View style={{ flexDirection: 'row', marginTop: 30 }}>
					<TouchableOpacity
						style={{
							height: 43,
							backgroundColor: COLORS?.blue,
							alignItems: 'center',
							borderRadius: 10,
							flexDirection: 'row',
							justifyContent: 'center',
							alignSelf: 'center',
							flex: 9 / 16,
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
					<TouchableOpacity
						style={{
							height: 43,
							backgroundColor: COLORS?.blue,
							alignItems: 'center',
							borderRadius: 10,
							flexDirection: 'row',
							justifyContent: 'center',
							alignSelf: 'center',
							flex: 7 / 16,
							marginLeft: 10,
						}}
						onPress={handleExport}
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
								d='M7.25 7.59998C7.25 8.56647 8.0335 9.34998 9 9.34998H15C15.9665 9.34998 16.75 8.56647 16.75 7.59998V4.27627C16.75 4.12369 16.8737 4 17.0263 4C17.1722 4 17.3108 4.06373 17.4058 4.17448L20.3685 7.62867C20.7791 8.1074 20.9936 8.72364 20.9689 9.35387L20.6273 18.0976C20.5749 19.4393 19.4719 20.5 18.1292 20.5H17.75C17.4739 20.5 17.25 20.2761 17.25 20V15C17.25 14.0335 16.4665 13.25 15.5 13.25H8.5C7.5335 13.25 6.75 14.0335 6.75 15V20C6.75 20.2761 6.52614 20.5 6.25 20.5H6.11291C4.90908 20.5 3.89276 19.6055 3.73989 18.4114C3.24597 14.5534 3.2247 10.6495 3.67653 6.78632L3.73742 6.26575C3.8885 4.97395 4.983 4 6.28361 4H6.75C7.02614 4 7.25 4.22386 7.25 4.5V7.59998Z'
								fill='white'
							/>
							<Path
								d='M8.25 20C8.25 20.2761 8.47386 20.5 8.75 20.5H15.25C15.5261 20.5 15.75 20.2761 15.75 20V15C15.75 14.8619 15.6381 14.75 15.5 14.75H8.5C8.36193 14.75 8.25 14.8619 8.25 15V20Z'
								fill='white'
							/>
							<Path
								d='M15.25 4.5C15.25 4.22386 15.0261 4 14.75 4H9.25C8.97386 4 8.75 4.22386 8.75 4.5V7.59998C8.75 7.73805 8.86193 7.84998 9 7.84998H15C15.1381 7.84998 15.25 7.73805 15.25 7.59998V4.5Z'
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
							Export list
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}
