import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Navbar from '../components/Navbar'

import { COLORS, FONTS } from '../styles/theme'
import { useEffect, useState } from 'react'
import { Path, Svg } from 'react-native-svg'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Student({ route, navigation }) {
	const { course, classs, id, date, dateIndex } = route.params

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
		async function handleStatus() {
			var tempJson = res
			tempJson.classes[classs].students[id].attendance[dateIndex] = status
			tempJson = JSON.stringify(tempJson)
			AsyncStorage.setItem(course, tempJson).then(() => {
				if (id < studentsCount - 1) {
					navigation.push('Student', {
						course: course,
						classs: classs,
						id: id + 1,
						date: date,
						dateIndex: dateIndex,
					})
				} else {
					navigation.reset({
						index: 0,
						routes: [{ name: 'Students', params: { course: course, classs: classs, date: date } }],
					})
				}
			})
		}
		handleStatus()
	}, [status])

	useEffect(() => {
		if (!student) return
		var tempStats = [0, 0, 0]
		for (let i = 0; i < student.attendance.length; i++) {
			if (student.attendance[i] == 0) tempStats[0]++
			else if (student.attendance[i] == 1) tempStats[1]++
			else if (student.attendance[i] == 2) tempStats[2]++
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

	function handlePreviousStudent() {
		if (id > 0) {
			navigation.push('Student', {
				course: course,
				classs: classs,
				id: id - 1,
				date: date,
				dateIndex: dateIndex,
			})
		}
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
						Mark attendance
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
							Out of {student && student.attendance.length - 1} classes
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
			</View>
			<TouchableOpacity
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: COLORS?.green,
					borderRadius: 12,
					height: 43,
					marginLeft: 24,
					marginRight: 24,
					marginTop: 30,
					flexDirection: 'row',
				}}
				activeOpacity={0.4}
				onPress={() => setStatus(1)}
			>
				<Svg
					width='19'
					height='19'
					viewBox='0 0 19 19'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<Path
						d='M12.8171 1.58331H6.18296C3.30129 1.58331 1.58337 3.30123 1.58337 6.1829V12.8091C1.58337 15.6987 3.30129 17.4166 6.18296 17.4166H12.8092C15.6909 17.4166 17.4088 15.6987 17.4088 12.8171V6.1829C17.4167 3.30123 15.6988 1.58331 12.8171 1.58331ZM13.2842 7.67915L8.79546 12.1679C8.68413 12.2791 8.53322 12.3415 8.37587 12.3415C8.21853 12.3415 8.06762 12.2791 7.95629 12.1679L5.71587 9.92748C5.60545 9.81575 5.54353 9.66499 5.54353 9.5079C5.54353 9.35081 5.60545 9.20005 5.71587 9.08831C5.94546 8.85873 6.32546 8.85873 6.55504 9.08831L8.37587 10.9091L12.445 6.83998C12.6746 6.6104 13.0546 6.6104 13.2842 6.83998C13.5138 7.06956 13.5138 7.44165 13.2842 7.67915Z'
						fill='black'
					/>
				</Svg>
				<Text style={{ marginLeft: 10, fontFamily: FONTS?.bold, fontSize: 16 }}>Present</Text>
			</TouchableOpacity>
			<View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
				<TouchableOpacity
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: COLORS?.yellow,
						borderRadius: 12,
						height: 43,
						marginLeft: 24,
						flexDirection: 'row',
						flexGrow: 1,
					}}
					activeOpacity={0.4}
					onPress={() => setStatus(2)}
				>
					<Svg
						width='19'
						height='19'
						viewBox='0 0 19 19'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<Path
							d='M9.49998 3.67965C5.71581 3.67965 2.63623 6.75923 2.63623 10.5434C2.63623 14.3276 5.71581 17.4151 9.49998 17.4151C13.2841 17.4151 16.3637 14.3355 16.3637 10.5513C16.3637 6.76715 13.2841 3.67965 9.49998 3.67965ZM10.0937 10.2901C10.0937 10.6146 9.82456 10.8838 9.49998 10.8838C9.1754 10.8838 8.90623 10.6146 8.90623 10.2901V6.33173C8.90623 6.00715 9.1754 5.73798 9.49998 5.73798C9.82456 5.73798 10.0937 6.00715 10.0937 6.33173V10.2901ZM11.7879 2.73123H7.21206C6.8954 2.73123 6.64206 2.4779 6.64206 2.16123C6.64206 1.84456 6.8954 1.58331 7.21206 1.58331H11.7879C12.1046 1.58331 12.3579 1.83665 12.3579 2.15331C12.3579 2.46998 12.1046 2.73123 11.7879 2.73123Z'
							fill='black'
						/>
					</Svg>

					<Text style={{ marginLeft: 10, fontFamily: FONTS?.bold, fontSize: 16 }}>Late</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: COLORS?.lightRed,
						borderRadius: 12,
						height: 43,
						marginRight: 24,
						marginLeft: 15,
						flexDirection: 'row',
						flexGrow: 1,
					}}
					activeOpacity={0.4}
					onPress={() => setStatus(0)}
				>
					<Svg
						width='19'
						height='19'
						viewBox='0 0 19 19'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<Path
							d='M12.8171 1.58331H6.18296C3.30129 1.58331 1.58337 3.30123 1.58337 6.1829V12.8091C1.58337 15.6987 3.30129 17.4166 6.18296 17.4166H12.8092C15.6909 17.4166 17.4088 15.6987 17.4088 12.8171V6.1829C17.4167 3.30123 15.6988 1.58331 12.8171 1.58331ZM12.16 11.3208C12.3896 11.5504 12.3896 11.9304 12.16 12.16C12.0413 12.2787 11.8909 12.3341 11.7405 12.3341C11.59 12.3341 11.4396 12.2787 11.3209 12.16L9.50004 10.3391L7.67921 12.16C7.56046 12.2787 7.41004 12.3341 7.25962 12.3341C7.10921 12.3341 6.95879 12.2787 6.84004 12.16C6.72962 12.0482 6.66769 11.8975 6.66769 11.7404C6.66769 11.5833 6.72962 11.4325 6.84004 11.3208L8.66087 9.49998L6.84004 7.67915C6.72962 7.56741 6.66769 7.41665 6.66769 7.25956C6.66769 7.10247 6.72962 6.95171 6.84004 6.83998C7.06962 6.6104 7.44962 6.6104 7.67921 6.83998L9.50004 8.66081L11.3209 6.83998C11.5505 6.6104 11.9305 6.6104 12.16 6.83998C12.3896 7.06956 12.3896 7.44956 12.16 7.67915L10.3392 9.49998L12.16 11.3208Z'
							fill='black'
						/>
					</Svg>

					<Text style={{ marginLeft: 10, fontFamily: FONTS?.bold, fontSize: 16 }}>Absent</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					height: 43,
					borderWidth: 1,
					borderStyle: 'solid',
					borderColor: COLORS?.borderGrey,
					borderRadius: 10,
					marginTop: 15,
					marginLeft: 24,
					marginRight: 24,
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

				<Text style={{ fontFamily: FONTS?.bold, fontSize: 16, paddingLeft: 10 }}>
					Previous student
				</Text>
			</TouchableOpacity>
			<Navbar />
		</View>
	)
}
