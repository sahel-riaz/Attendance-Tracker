import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

//components
import ClassCard from '../components/home/ClassCard'
import HomeCard from '../components/home/HomeCard'
import Navbar from '../components/Navbar'

//themes
import { COLORS, FONTS } from '../styles/theme'
import { useEffect, useState } from 'react'
import { Path, Svg } from 'react-native-svg'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

export default function Home() {
	var [date, setDate] = useState(new Date())
	const navigation = useNavigation()

	const [courses, setCourses] = useState([])
	const [classes, setClasses] = useState([])

	const [name, setName] = useState(null)

	useEffect(() => {
		var timer = setInterval(() => setDate(new Date()), 1000)
		return function cleanup() {
			clearInterval(timer)
		}
	})

	/*=============================================
	=                fetchUserData                =
	=============================================*/
	useEffect(() => {
		async function fetch() {
			AsyncStorage.getItem('settings').then((res) => {
				setName(res)
			})
		}
		fetch()
	}, [])

	/*=============================================
	=            fetchCoursesAndClasses           =
	=============================================*/
	useEffect(() => {
		async function fetch() {
			AsyncStorage.getAllKeys().then((res) => {
				for (let i = 0; i < res.length; i++) {
					if (res[i] === 'settings') res.splice(i, 1)
				}
				if (res.length < 1) return
				setCourses(res)

				for (let i = 0; i < res.length; i++) {
					const course = res[i]
					AsyncStorage.getItem(res[i]).then((res) => {
						res = JSON.parse(res)
						const classList = Object.keys(res['classes'])
						for (let j = 0; j < classList.length; j++) {
							setClasses([
								...classes,
								[
									course,
									res['courseName'],
									classList[i],
									res.classes[classList[i]].students.length,
								],
							])
						}
					})
				}
			})
		}
		fetch()
	}, [])

	return (
		<SafeAreaView style={{ backgroundColor: COLORS?.bg, flex: 1 }}>
			<StatusBar />
			<View style={{ paddingTop: 80 }}>
				<View
					style={{
						paddingLeft: 30,
						paddingRight: 30,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<View>
						<Text style={{ fontSize: 32, lineHeight: 32, fontFamily: FONTS?.bold }}>
							{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
						</Text>
						<Text style={{ paddingTop: 6 }}>
							Good morning
							{name != null ? (
								<Text style={{ fontFamily: FONTS?.bold, fontSize: 16, lineHeight: 19 }}>
									,&nbsp;{name}&nbsp;👋
								</Text>
							) : (
								<></>
							)}
						</Text>
					</View>
					<TouchableOpacity
						style={{ padding: 8, borderRadius: 50, backgroundColor: COLORS?.white }}
						activeOpacity={0.7}
						onPress={() => {
							navigation.push('Settings')
						}}
					>
						<Svg
							width='20'
							height='21'
							viewBox='0 0 20 21'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<Path
								d='M10 13.625C8.275 13.625 6.875 12.225 6.875 10.5C6.875 8.775 8.275 7.375 10 7.375C11.725 7.375 13.125 8.775 13.125 10.5C13.125 12.225 11.725 13.625 10 13.625ZM10 8.625C8.96667 8.625 8.125 9.46667 8.125 10.5C8.125 11.5333 8.96667 12.375 10 12.375C11.0333 12.375 11.875 11.5333 11.875 10.5C11.875 9.46667 11.0333 8.625 10 8.625Z'
								fill='black'
							/>
							<Path
								d='M12.6748 18.9916C12.4998 18.9916 12.3248 18.9666 12.1498 18.925C11.6332 18.7833 11.1998 18.4583 10.9248 18L10.8248 17.8333C10.3332 16.9833 9.65817 16.9833 9.1665 17.8333L9.07484 17.9916C8.79984 18.4583 8.3665 18.7916 7.84984 18.925C7.32484 19.0666 6.78317 18.9916 6.32484 18.7166L4.8915 17.8916C4.63965 17.7473 4.41872 17.5548 4.24134 17.325C4.06397 17.0952 3.93363 16.8328 3.85778 16.5526C3.78193 16.2724 3.76206 15.98 3.7993 15.6922C3.83655 15.4043 3.93018 15.1266 4.07484 14.875C4.3165 14.45 4.38317 14.0666 4.2415 13.825C4.09984 13.5833 3.7415 13.4416 3.24984 13.4416C2.03317 13.4416 1.0415 12.45 1.0415 11.2333V9.76662C1.0415 8.54995 2.03317 7.55829 3.24984 7.55829C3.7415 7.55829 4.09984 7.41662 4.2415 7.17495C4.38317 6.93329 4.32484 6.54995 4.07484 6.12495C3.78317 5.61662 3.70817 5.01662 3.85817 4.44995C4.00817 3.87495 4.37484 3.39995 4.8915 3.10829L6.33317 2.28329C7.27484 1.72495 8.5165 2.04995 9.08317 3.00829L9.18317 3.17495C9.67484 4.02495 10.3498 4.02495 10.8415 3.17495L10.9332 3.01662C11.4998 2.04995 12.7415 1.72495 13.6915 2.29162L15.1248 3.11662C15.3767 3.26093 15.5976 3.45347 15.775 3.68323C15.9524 3.91299 16.0827 4.17547 16.1586 4.45565C16.2344 4.73583 16.2543 5.02821 16.217 5.31608C16.1798 5.60394 16.0862 5.88164 15.9415 6.13329C15.6998 6.55829 15.6332 6.94162 15.7748 7.18329C15.9165 7.42495 16.2748 7.56662 16.7665 7.56662C17.9832 7.56662 18.9748 8.55829 18.9748 9.77495V11.2416C18.9748 12.4583 17.9832 13.45 16.7665 13.45C16.2748 13.45 15.9165 13.5916 15.7748 13.8333C15.6332 14.075 15.6915 14.4583 15.9415 14.8833C16.2332 15.3916 16.3165 15.9916 16.1582 16.5583C16.0857 16.8402 15.9568 17.1045 15.7792 17.3351C15.6015 17.5658 15.3789 17.7579 15.1248 17.9L13.6832 18.725C13.3665 18.9 13.0248 18.9916 12.6748 18.9916ZM9.99984 15.9083C10.7415 15.9083 11.4332 16.375 11.9082 17.2L11.9998 17.3583C12.0998 17.5333 12.2665 17.6583 12.4665 17.7083C12.6665 17.7583 12.8665 17.7333 13.0332 17.6333L14.4748 16.8C14.6949 16.673 14.8559 16.4644 14.923 16.2195C14.9901 15.9745 14.9578 15.7129 14.8332 15.4916C14.3582 14.675 14.2998 13.8333 14.6665 13.1916C15.0332 12.55 15.7915 12.1833 16.7415 12.1833C17.2748 12.1833 17.6998 11.7583 17.6998 11.225V9.75829C17.6998 9.23329 17.2748 8.79995 16.7415 8.79995C15.7915 8.79995 15.0332 8.43329 14.6665 7.79162C14.2998 7.14995 14.3582 6.30829 14.8332 5.49162C14.9582 5.27495 14.9915 5.01662 14.9248 4.76662C14.8582 4.51662 14.6998 4.31662 14.4832 4.18329L13.0415 3.35829C12.9545 3.30729 12.8584 3.27395 12.7585 3.26017C12.6586 3.24639 12.557 3.25244 12.4595 3.27799C12.3619 3.30353 12.2704 3.34806 12.1901 3.40903C12.1098 3.47 12.0423 3.5462 11.9915 3.63329L11.8998 3.79162C11.4248 4.61662 10.7332 5.08329 9.9915 5.08329C9.24984 5.08329 8.55817 4.61662 8.08317 3.79162L7.9915 3.62495C7.88795 3.45465 7.72201 3.33149 7.52902 3.28168C7.33602 3.23187 7.13121 3.25936 6.95817 3.35829L5.5165 4.19162C5.29649 4.31853 5.13543 4.52714 5.06834 4.77211C5.00124 5.01709 5.03353 5.27864 5.15817 5.49995C5.63317 6.31662 5.6915 7.15829 5.32484 7.79995C4.95817 8.44162 4.19984 8.80829 3.24984 8.80829C2.7165 8.80829 2.2915 9.23329 2.2915 9.76662V11.2333C2.2915 11.7583 2.7165 12.1916 3.24984 12.1916C4.19984 12.1916 4.95817 12.5583 5.32484 13.2C5.6915 13.8416 5.63317 14.6833 5.15817 15.5C5.03317 15.7166 4.99984 15.975 5.0665 16.225C5.13317 16.475 5.2915 16.675 5.50817 16.8083L6.94984 17.6333C7.12484 17.7416 7.33317 17.7666 7.52484 17.7166C7.72484 17.6666 7.8915 17.5333 7.99984 17.3583L8.0915 17.2C8.5665 16.3833 9.25817 15.9083 9.99984 15.9083Z'
								fill='black'
							/>
						</Svg>
					</TouchableOpacity>
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
					<HomeCard count={courses.length} isCourse={true} />
					<HomeCard count={classes.length} />
				</View>
				<View
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
					{courses.length < 1 ? (
						<Text>Added classes in import tab!</Text>
					) : (
						<ScrollView>
							{classes.map((item, index) => (
								<View key={index}>
									<ClassCard
										courseId={item[0]}
										courseName={item[1]}
										className={item[2]}
										students_qty={item[3]}
									/>
								</View>
							))}
						</ScrollView>
					)}

					<View style={{ height: 400 }}></View>
				</View>
			</View>
			<Navbar />
		</SafeAreaView>
	)
}
