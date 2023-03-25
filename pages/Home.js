import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native'
import ClassCard from '../components/home/ClassCard'
import HomeCard from '../components/home/HomeCard'
import Navbar from '../components/Navbar'

import * as LocalAuthentication from 'expo-local-authentication'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

import { COLORS, FONTS } from '../styles/theme'

export default function Home() {

	const [courses, setCourses] = useState([])
	const [classes, setClasses] = useState([])

	const [res, setRes] = useState({})

	const [course, setCourse] = useState(null)
	const [classs, setClasss] = useState(null)

	const [coursename, setCourseName] = useState(null)
	const [studentcount, setStudentCount] = useState(0)

	/*=============================================
	=                fetchCourses                 =
	=============================================*/
	useEffect(() => {
		async function fetch() {
			AsyncStorage.getAllKeys()
				.then((res) => {
					setCourses(res)
					console.log(courses)
				})
				.catch((e) => {
					console.log(e)
				})
		}
		fetch()
	}, [])

	/*=============================================
	=                fetchClasses                 =
	=============================================*/
	useEffect(() => {
		if (courses.length == 0) return
		async function fetch() {
			AsyncStorage.getItem(courses[0])
				.then((res) => {
					res = JSON.parse(res)
					setRes(res)
					// console.log(res)
					res1 = Object.keys(res['classes'])
					setClasses(res1)
					console.log(classes)
					res2 = Object.keys(res['students'])
					setStudentCount(res2.length)
					console.log(studentcount)

				})
				.catch((e) => {
					console.log(e)
				})
		}
		fetch()
	}, [course])




	// for (let i=0; i<courses.length; i++) {
	// 	useEffect(() => {
	// 		if (courses.length == 0) return
	// 		async function fetch() 
	// 		{
	// 			AsyncStorage.getItem(courses[i])
	// 				.then((res) => {
	// 					res = JSON.parse(res)
	// 					setRes(res)
	// 					res = Object.keys(res['classes'])
	// 					setClasses(res)
	
	// 				})
	// 				.catch((e) => {
	// 					console.log(e)
	// 				})
	// 		}
	// 		fetch()
	// 	}, [course])
	// }


	return (
		<SafeAreaView style={{ backgroundColor: COLORS?.bg, flex: 1 }}>
			<View style={{ paddingTop: 80 }}>
				<View style={{ paddingLeft: 30, paddingRight: 30 }}>
					<Text style={{ fontSize: 32, lineHeight: 32, fontFamily: FONTS?.bold }}>09:12 am</Text>
					<Text style={{ paddingTop: 6 }}>
						Good morning,
						<Text style={{ fontFamily: FONTS?.bold, fontSize: 16, lineHeight: 19 }}>
							&nbsp;Sahel&nbsp;
						</Text>
						👋
					</Text>
				</View>
				<View
					style={{
						paddingTop: 30,
						paddingLeft: 30,
						paddingRight: 30,
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<HomeCard />
					<HomeCard />
				</View>
				<ScrollView
					style={{
						backgroundColor: COLORS?.white,
						marginTop: 28,
						borderRadius: 20,
						paddingTop: 40,
						paddingLeft: 30,
						paddingRight: 30,
					}}
				>
					<Text style={{ fontFamily: FONTS?.bold, fontSize: 18, lineHeight: 22, marginBottom: 22 }}>
						Courses 💼
					</Text>
					<ClassCard 
						courseId='CS2002D:'
						courseName='Software Engineering Lab'
						className='CS01'
						students_qty='160'	
					/>
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<View style={{ height: 400 }}></View>
				</ScrollView>
			</View>
			<Navbar />
		</SafeAreaView>
	)
}
