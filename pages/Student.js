import { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'

//components
import Navbar from '../components/Navbar'

//themes
import { COLORS, FONTS } from '../styles/theme'
import StudentDetails from '../components/StudentDetails'

export default function Student({ route, navigation }) {
	const { course, classs, id, date, dateIndex } = route.params

	const [studentsCount, setStudentsCount] = useState(0)
	const [student, setStudent] = useState()
	const [status, setStatus] = useState()
	const [stats, setStats] = useState([])
	const [warning, setWarning] = useState(0)
	const [res, setRes] = useState({})
	const [studentId, setStudentId] = useState(id)

	/*=============================================
	=                 InitalFetch                 =
	=============================================*/

	useEffect(() => {
		if (course == null) return
		async function fetch() {
			AsyncStorage.getItem(course)
				.then((res) => {
					res = JSON.parse(res)
					setRes(res)
					setStudentsCount(res.classes[classs].students.length)
					setStudent(res.classes[classs].students[studentId])
				})
				.catch((e) => {
					console.log(e)
				})
		}
		fetch()
	}, [studentId])

	/*=============================================
	=                CalculateStats               =
	=============================================*/

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

	/*=============================================
	=                handleRoutinig               =
	=============================================*/

	async function handlePresent() {
		var tempJson = res
		tempJson.classes[classs].students[studentId].attendance[dateIndex] = 1
		tempJson = JSON.stringify(tempJson)
		AsyncStorage.setItem(course, tempJson)

		if (studentId < studentsCount - 1)
			setStudentId((currentId) => {
				return currentId + 1
			})
		else {
			navigation.push('Students', {
				course: course,
				classs: classs,
				date: date,
			})
		}
	}

	async function handleAbsent() {
		var tempJson = res
		tempJson.classes[classs].students[studentId].attendance[dateIndex] = 0
		tempJson = JSON.stringify(tempJson)
		AsyncStorage.setItem(course, tempJson)

		if (studentId < studentsCount - 1)
			setStudentId((currentId) => {
				return currentId + 1
			})
		else {
			navigation.push('Students', {
				course: course,
				classs: classs,
				date: date,
			})
		}
	}

	async function handleLate() {
		var tempJson = res
		tempJson.classes[classs].students[studentId].attendance[dateIndex] = 2
		tempJson = JSON.stringify(tempJson)
		AsyncStorage.setItem(course, tempJson)

		if (studentId < studentsCount - 1)
			setStudentId((currentId) => {
				return currentId + 1
			})
		else {
			navigation.push('Students', {
				course: course,
				classs: classs,
				date: date,
			})
		}
	}

	function handlePreviousStudent() {
		if (studentId > 0) {
			setStudentId((currentId) => {
				return currentId - 1
			})
		} else {
			navigation.push('Students', {
				course: course,
				classs: classs,
				date: date,
			})
		}
	}

	function handleNextStudent() {
		if (id < studentsCount - 1) {
			setStudentId((currentId) => {
				return currentId + 1
			})
		} else {
			navigation.push('Students', {
				course: course,
				classs: classs,
				date: date,
			})
		}
	}

	/*=========  End of HandleRouting  ==========*/

	/*=============================================
	=               preventGoingBack              =
	=============================================*/

	navigation.addListener(
		'beforeRemove',
		(e) => {
			e.preventDefault()
			navigation.push('Students', {
				course: course,
				classs: classs,
				date: date,
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
			date={date}
			handlePresent={handlePresent}
			handleAbsent={handleAbsent}
			handleLate={handleLate}
			handleNextStudent={handleNextStudent}
			handlePreviousStudent={handlePreviousStudent}
		/>
	)
}
