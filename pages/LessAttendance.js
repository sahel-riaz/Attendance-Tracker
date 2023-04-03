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
					[
						students[i].rollNumber.trim(),
						students[i].studentName,
						(percentages[i] * 100).toFixed(2),
					],
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
								<Text
									style={{ fontSize: 18, fontFamily: FONTS?.regular, width: '80%' }}
									numberOfLines={1}
								>
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
							flex: 1 / 2,
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
							Email all
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
							flex: 1 / 2,
							marginLeft: 10,
						}}
						onPress={handleExport}
						activeOpacity={0.7}
					>
						<Svg
							width='20'
							height='19'
							viewBox='0 0 20 19'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<Path
								d='M16.729 8.06709H14.4411C12.5648 8.06709 11.0369 6.53918 11.0369 4.66293V2.37501C11.0369 1.93959 10.6807 1.58334 10.2453 1.58334H6.88859C4.45025 1.58334 2.479 3.16668 2.479 5.99293V13.0071C2.479 15.8333 4.45025 17.4167 6.88859 17.4167H13.1111C15.5494 17.4167 17.5207 15.8333 17.5207 13.0071V8.85876C17.5207 8.42334 17.1644 8.06709 16.729 8.06709ZM10.2215 12.4925L8.63817 14.0758C8.58275 14.1313 8.5115 14.1788 8.44025 14.2025C8.37072 14.2344 8.2951 14.251 8.21859 14.251C8.14207 14.251 8.06646 14.2344 7.99692 14.2025C7.93142 14.1751 7.87217 14.1347 7.82275 14.0838C7.81484 14.0758 7.80692 14.0758 7.80692 14.0679L6.22359 12.4846C6.11317 12.3729 6.05124 12.2221 6.05124 12.065C6.05124 11.9079 6.11317 11.7572 6.22359 11.6454C6.45317 11.4158 6.83317 11.4158 7.06275 11.6454L7.62484 12.2233V8.90626C7.62484 8.58168 7.894 8.31251 8.21859 8.31251C8.54317 8.31251 8.81234 8.58168 8.81234 8.90626V12.2233L9.38234 11.6533C9.61192 11.4238 9.99192 11.4238 10.2215 11.6533C10.4511 11.8829 10.4511 12.2629 10.2215 12.4925Z'
								fill='white'
							/>
							<Path
								d='M14.2987 6.9746C15.0507 6.98252 16.0957 6.98251 16.9903 6.98251C17.4416 6.98251 17.6791 6.4521 17.3624 6.13543C16.2224 4.98751 14.1799 2.92126 13.0082 1.7496C12.6837 1.42501 12.1216 1.64668 12.1216 2.09793V4.86085C12.1216 6.01668 13.1032 6.9746 14.2987 6.9746Z'
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
