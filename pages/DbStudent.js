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
	const [faculty, setFaculty] = useState('')
	const [studentId, setStudentId] = useState(id)
	const [avg, setAvg] = useState(0)

	useEffect(() => {
		if (course == null) return
		async function fetch() {
			AsyncStorage.getItem(course)
				.then((res) => {
					res = JSON.parse(res)
					setRes(res)
					setStudentsCount(res.classes[classs].students.length)
					setStudent(res.classes[classs].students[studentId])

					/*=====  calculateAvgAttendance  ======*/

					var tempCount = 0
					var totalCount = 0
					for (let i = 0; i < res['classes'][classs].students.length; i++) {
						for (let j = 0; j < res['classes'][classs].students[i].attendance.length; j++) {
							if (
								res['classes'][classs].students[i].attendance[j] == 1 || //present
								res['classes'][classs].students[i].attendance[j] == 2 //late
							)
								tempCount += 1
							totalCount += 1
						}
					}
					setAvg(((tempCount / totalCount) * 100).toFixed(2))
				})
				.catch((e) => {
					console.log(e)
				})
			AsyncStorage.getItem('settings').then((res) => {
				setFaculty(res)
			})
		}
		fetch()
	}, [studentId])

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
		let to = ''

		if (student.emailId != null) {
			to = student.emailId
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
		}

		MailComposer.composeAsync({
			recipients: [to],
			subject: `Low attendance in ${course} - ${classs}`,
			body: `Dear ${student.studentName}

				Your attendance in the course ${course} is noted to be low. Please attend the next class without fail.
				
				Regards
				${faculty}
				${course}
			`,
		})
	}

	function handlePreviousStudent() {
		if (studentId > 0) {
			setStudentId((currentId) => {
				return currentId - 1
			})
		} else {
			navigation.push('DbStudents', {
				course: course,
				classs: classs,
			})
		}
	}

	function handleNextStudent() {
		if (studentId < studentsCount - 1) {
			setStudentId((currentId) => {
				return currentId + 1
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
			avg={avg}
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
