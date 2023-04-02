import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

//components
import StudentDetails from '../components/StudentDetails'

export default function Student({ route, navigation }) {
	const { course, batch, id, date, dateIndex } = route.params

	const [studentsCount, setStudentsCount] = useState(0)
	const [student, setStudent] = useState()
	const [stats, setStats] = useState([])
	const [warning, setWarning] = useState(0)
	const [res, setRes] = useState({})
	const [studentId, setStudentId] = useState(id)
	const [avg, setAvg] = useState(0)
	const [marked, setMarked] = useState(false)

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
					setStudentsCount(res.batches[batch].students.length)
					setStudent(res.batches[batch].students[studentId])
				})
				.catch((e) => {
					console.log(e)
				})
		}
		fetch()
	}, [studentId])

	/*=============================================
	=              CalculateStats&Avg             =
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

		/*=====  check if attendace is already marked for this date  ======*/

		if (student.attendance[dateIndex] != 3) setMarked(true)
		else setMarked(false)

		/*=====  calculateAvgAttendance  ======*/

		let tempCount = 0

		if (student.attendance[dateIndex] != 3) {
			//if attendance is marked
			for (let i = 0; i < student.attendance.length; i++) {
				if (student.attendance[i] == 1 || student.attendance[i] == 2) tempCount += 1
			}
			setAvg(((tempCount / student.attendance.length) * 100).toFixed(2))
		} else {
			//if attendance is not marked yet
			for (let i = 0; i < student.attendance.length - 1; i++) {
				if (student.attendance[i] == 1 || student.attendance[i] == 2) tempCount += 1
			}
			setAvg(((tempCount / (student.attendance.length - 1)) * 100).toFixed(2))
		}
	}, [student])

	/*=============================================
	=                handleRoutinig               =
	=============================================*/

	async function handlePresent() {
		var tempJson = res
		tempJson.batches[batch].students[studentId].attendance[dateIndex] = 1
		tempJson = JSON.stringify(tempJson)
		AsyncStorage.setItem(course, tempJson)

		if (studentId < studentsCount - 1)
			setStudentId((currentId) => {
				return currentId + 1
			})
		else {
			navigation.push('Students', {
				course: course,
				batch: batch,
				date: date,
			})
		}
	}

	async function handleAbsent() {
		var tempJson = res
		tempJson.batches[batch].students[studentId].attendance[dateIndex] = 0
		tempJson = JSON.stringify(tempJson)
		AsyncStorage.setItem(course, tempJson)

		if (studentId < studentsCount - 1)
			setStudentId((currentId) => {
				return currentId + 1
			})
		else {
			navigation.push('Students', {
				course: course,
				batch: batch,
				date: date,
			})
		}
	}

	async function handleLate() {
		var tempJson = res
		tempJson.batches[batch].students[studentId].attendance[dateIndex] = 2
		tempJson = JSON.stringify(tempJson)
		AsyncStorage.setItem(course, tempJson)

		if (studentId < studentsCount - 1)
			setStudentId((currentId) => {
				return currentId + 1
			})
		else {
			navigation.push('Students', {
				course: course,
				batch: batch,
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
				batch: batch,
				date: date,
			})
		}
	}

	function handleNextStudent() {
		if (studentId < studentsCount - 1) {
			setStudentId((currentId) => {
				return currentId + 1
			})
		} else {
			navigation.push('Students', {
				course: course,
				batch: batch,
				date: date,
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
			navigation.push('Students', {
				course: course,
				batch: batch,
				date: date,
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
			batch={batch}
			date={date}
			marked={marked} //check if attendance is already marked for that date
			handlePresent={handlePresent}
			handleAbsent={handleAbsent}
			handleLate={handleLate}
			handleNextStudent={handleNextStudent}
			handlePreviousStudent={handlePreviousStudent}
			mark={true} //mark mode - display present, absent and late buttons
		/>
	)
}
