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
import StudentDetails from '../components/StudentDetails'

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
		<StudentDetails
			student={student}
			stats={stats}
			warning={warning}
			course={course}
			classs={classs}
			handleNextStudent={handleNextStudent}
			handlePreviousStudent={handlePreviousStudent}
			mark={false}
			handleEmail={handleEmail}
		/>
	)
}
