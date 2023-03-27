import { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, Linking } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import email from 'react-native-email'
import { StatusBar } from 'expo-status-bar'
import * as MailComposer from 'expo-mail-composer'

//components
import ErrorPopUp from '../components/home/ErrorPopUp'
import Navbar from '../components/Navbar'

//themes
import { COLORS, FONTS } from '../styles/theme'

export default function DbStudent({ route, navigation }) {
	const { course, classs, id } = route.params

	const [studentsCount, setStudentsCount] = useState(0)
	const [student, setStudent] = useState()
	const [stats, setStats] = useState([])
	const [warning, setWarning] = useState(0)
	const [res, setRes] = useState({})
	const [trigger, setTrigger] = useState(false)
	const [faculty, setFaculty] = useState('')

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
			AsyncStorage.getItem('settings').then((res) => {
				setFaculty(res)
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
		/*
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
				to =
					names[1].toLowerCase().trim() +
					'_' +
					student.rollNumber.toLowerCase().trim() +
					'@nitc.ac.in'
			}
		} else {
			to =
				names[0].toLowerCase().trim() +
				'_' +
				student.rollNumber.toLowerCase().trim() +
				'@nitc.ac.in'
		}
		// console.log(to)
		MailComposer.composeAsync({
			recipients: [to],
			subject: `Low attendance in ${course} - ${classs}`,
			body: `Dear ${student.studentName},

				Your attendance in the course ${course} is noted to be low. Please attend the next class without fail.
				
				Regards
				${faculty}
				${course}
			`,
		})
	}

	async function handleDeleteStudent() {
		AsyncStorage.getItem(course)
			.then((res) => {
				res = JSON.parse(res)

				const toRemove = String(student.rollNumber)
				let temp = []

				for (let i = 0; i < res.classes[classs].students.length; i++) {
					if (res.classes[classs].students[i].rollNumber !== toRemove) {
						temp = [...temp, res.classes[classs].students[i]]
					}
				}

				res.classes[classs].students = temp

				res = JSON.stringify(res)
				AsyncStorage.setItem(course, res)
			})
			.then(() => {
				navigation.push('DbStudents', {
					course: course,
					classs: classs,
				})
			})
	}

	function onCancel() {
		setTrigger(false)
	}

	function onDelete() {
		handleDeleteStudent()
		setTrigger(false)
	}

	function handlePreviousStudent() {
		if (id > 0) {
			navigation.push('DbStudent', {
				course: course,
				classs: classs,
				id: id - 1,
			})
		} else {
			navigation.push('DbStudents', {
				course: course,
				classs: classs,
			})
		}
	}

	function handleNextStudent() {
		if (id < studentsCount - 1) {
			navigation.push('DbStudent', {
				course: course,
				classs: classs,
				id: id + 1,
			})
		} else {
			navigation.push('DbStudents', {
				course: course,
				classs: classs,
			})
		}
	}

	/*=============================================
	=               preventGoingBack              =
	=============================================*/

	navigation.addListener(
		'beforeRemove',
		(e) => {
			e.preventDefault()
			navigation.push('DbStudents', {
				course: course,
				classs: classs,
			})
		},
		[navigation]
	)

	return (
		<View style={{ flex: 1 }}>
			<StatusBar style='dark' />
			<ErrorPopUp
				data='Are you sure you want to delete this student?'
				trigger={trigger}
				onCancel={onCancel}
				onDelete={onDelete}
			/>
			<View style={{ paddingTop: 60, flexDirection: 'row' }}>
				<TouchableOpacity
					style={{ padding: 20 }}
					onPress={() =>
						navigation.push('DbStudents', {
							course: course,
							classs: classs,
						})
					}
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
				<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
					<TouchableOpacity
						style={{
							height: 43,
							width: 190,
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
							Email student
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							height: 43,
							width: 43,
							backgroundColor: COLORS?.red,
							alignItems: 'center',
							borderRadius: 10,
							flexDirection: 'row',
							justifyContent: 'center',
							marginTop: 40,
							alignSelf: 'center',
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
								d='M16.6804 4.1404C15.4059 4.01373 14.1313 3.91873 12.8488 3.84748V3.83956L12.6746 2.8104C12.5559 2.08206 12.3817 0.989563 10.5292 0.989563H8.45502C6.61044 0.989563 6.43627 2.03456 6.30961 2.80248L6.14336 3.81581C5.40711 3.86331 4.67086 3.91081 3.93461 3.98206L2.31961 4.1404C1.98711 4.17206 1.74961 4.46498 1.78127 4.78956C1.81294 5.11415 2.09794 5.35165 2.43044 5.31998L4.04544 5.16165C8.19377 4.74998 12.3738 4.90831 16.5696 5.3279H16.6329C16.9338 5.3279 17.195 5.09831 17.2267 4.78956C17.2386 4.63142 17.1881 4.4749 17.086 4.35355C16.9839 4.2322 16.8383 4.15568 16.6804 4.1404ZM15.2238 6.44415C15.0338 6.24623 14.7725 6.1354 14.5034 6.1354H4.49669C4.22752 6.1354 3.95836 6.24623 3.77627 6.44415C3.59419 6.64206 3.49127 6.91123 3.50711 7.18831L3.99794 15.3108C4.08502 16.5141 4.19586 18.0183 6.95877 18.0183H12.0413C14.8042 18.0183 14.915 16.5221 15.0021 15.3108L15.4929 7.19623C15.5088 6.91123 15.4059 6.64206 15.2238 6.44415ZM10.8142 14.0521H8.17794C7.85336 14.0521 7.58419 13.7829 7.58419 13.4583C7.58419 13.1337 7.85336 12.8646 8.17794 12.8646H10.8142C11.1388 12.8646 11.4079 13.1337 11.4079 13.4583C11.4079 13.7829 11.1388 14.0521 10.8142 14.0521ZM11.4792 10.8854H7.52086C7.19627 10.8854 6.92711 10.6162 6.92711 10.2916C6.92711 9.96706 7.19627 9.6979 7.52086 9.6979H11.4792C11.8038 9.6979 12.0729 9.96706 12.0729 10.2916C12.0729 10.6162 11.8038 10.8854 11.4792 10.8854Z'
								fill='white'
							/>
						</Svg>
					</TouchableOpacity>
				</View>
			</View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginLeft: 24,
					marginRight: 24,
				}}
			>
				<TouchableOpacity
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						height: 43,
						borderWidth: 1,
						borderStyle: 'solid',
						borderColor: COLORS?.borderGrey,
						borderRadius: 10,
						marginTop: 30,
						width: 150,
					}}
					onPress={() => handlePreviousStudent()}
				>
					<Svg
						width='19'
						height='19'
						viewBox='0 0 19 19'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<Path
							d='M12.817 1.58331H6.18284C3.30117 1.58331 1.58325 3.30123 1.58325 6.1829V12.8091C1.58325 15.6987 3.30117 17.4166 6.18284 17.4166H12.8091C15.6908 17.4166 17.4087 15.6987 17.4087 12.8171V6.1829C17.4166 3.30123 15.6987 1.58331 12.817 1.58331ZM11.0199 12.7696H7.12492C6.80033 12.7696 6.53117 12.5004 6.53117 12.1758C6.53117 11.8512 6.80033 11.5821 7.12492 11.5821H11.0199C12.0333 11.5821 12.8645 10.7587 12.8645 9.73748C12.8645 8.71623 12.0412 7.8929 11.0199 7.8929H7.00617L7.212 8.09873C7.44158 8.33623 7.44159 8.70831 7.20409 8.94581C7.08534 9.06456 6.93492 9.11998 6.7845 9.11998C6.63408 9.11998 6.48367 9.06456 6.36492 8.94581L5.122 7.69498C5.01158 7.58325 4.94965 7.43249 4.94965 7.2754C4.94965 7.11831 5.01158 6.96755 5.122 6.85581L6.36492 5.6129C6.5945 5.38331 6.9745 5.38331 7.20409 5.6129C7.43367 5.84248 7.43367 6.22248 7.20409 6.45206L6.94284 6.71331H11.0199C12.6903 6.71331 14.052 8.07498 14.052 9.7454C14.052 11.4158 12.6903 12.7696 11.0199 12.7696Z'
							fill='black'
						/>
					</Svg>

					<Text style={{ fontFamily: FONTS?.bold, fontSize: 16, paddingLeft: 10 }}>Previous</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						height: 43,
						borderWidth: 1,
						borderStyle: 'solid',
						borderColor: COLORS?.borderGrey,
						borderRadius: 10,
						marginTop: 30,
						width: 150,
					}}
					onPress={() => handleNextStudent()}
				>
					<Svg
						width='19'
						height='19'
						viewBox='0 0 19 19'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<Path
							d='M12.817 1.58331H6.18284C3.30117 1.58331 1.58325 3.30123 1.58325 6.1829V12.8091C1.58325 15.6987 3.30117 17.4166 6.18284 17.4166H12.8091C15.6908 17.4166 17.4087 15.6987 17.4087 12.8171V6.1829C17.4166 3.30123 15.6987 1.58331 12.817 1.58331ZM13.8778 7.69498L12.6349 8.9379C12.5162 9.05665 12.3658 9.11206 12.2153 9.11206C12.0649 9.11206 11.9145 9.05665 11.7958 8.9379C11.6853 8.82616 11.6234 8.6754 11.6234 8.51831C11.6234 8.36122 11.6853 8.21046 11.7958 8.09873L12.0016 7.8929H7.97992C6.96658 7.8929 6.13534 8.71623 6.13534 9.73748C6.13534 10.7587 6.95867 11.5821 7.97992 11.5821H11.8749C12.1995 11.5821 12.4687 11.8512 12.4687 12.1758C12.4687 12.5004 12.1995 12.7696 11.8749 12.7696H7.97992C6.3095 12.7696 4.94784 11.4079 4.94784 9.73748C4.94784 8.06706 6.3095 6.7054 7.97992 6.7054H12.057L11.7958 6.45206C11.6853 6.34033 11.6234 6.18957 11.6234 6.03248C11.6234 5.87539 11.6853 5.72463 11.7958 5.6129C12.0253 5.38331 12.4053 5.38331 12.6349 5.6129L13.8778 6.85581C14.1074 7.09331 14.1074 7.4654 13.8778 7.69498Z'
							fill='black'
						/>
					</Svg>

					<Text style={{ fontFamily: FONTS?.bold, fontSize: 16, paddingLeft: 10 }}>Next</Text>
				</TouchableOpacity>
			</View>
			<Navbar />
		</View>
	)
}
