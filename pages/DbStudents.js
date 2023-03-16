import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Navbar from '../components/Navbar'

import { COLORS, FONTS } from '../styles/theme'
import { useEffect, useState } from 'react'
import { Path, Svg } from 'react-native-svg'

import AsyncStorage from '@react-native-async-storage/async-storage'

export default function DbStudents({ route, navigation }) {
	const { course, classs } = route.params

	const [students, setStudents] = useState([])

	useEffect(() => {
		if (course == null) return
		async function fetch() {
			AsyncStorage.getItem(course)
				.then((res) => {
					res = JSON.parse(res)
					setStudents(res.classes[classs].students)
				})
				.catch((e) => {
					console.log(e)
				})
		}
		fetch()
	}, [])

	return (
		<View style={{ flex: 1 }}>
			<View style={{ paddingTop: 80, flexDirection: 'row', padding: 20 }}>
				<Svg
					width='20'
					height='20'
					viewBox='0 0 16 17'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					onPress={() => navigation.navigate('Home')}
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
						View details
					</Text>
				</View>
			</View>
			<Text style={{ fontFamily: FONTS?.bold, fontSize: 16, paddingLeft: 24, marginTop: 25 }}>
				Students:
			</Text>
			<ScrollView
				style={{ paddingLeft: 24, paddingRight: 24, marginTop: 10, marginBottom: 120 }}
				contentContainerStyle={{ alignItems: 'center' }}
			>
				{!students.length < 1 &&
					students.map((student, id) => (
						<TouchableOpacity
							key={id}
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
							activeOpacity={0.4}
							onPress={() =>
								navigation.push('DbStudent', {
									course: course,
									classs: classs,
									id: id,
								})
							}
						>
							<Text style={{ fontSize: 18, fontFamily: FONTS?.regular }}>
								{student.studentName}
							</Text>
							<Svg
								width='24'
								height='26'
								viewBox='0 0 24 26'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<Path
									d='M6.00751 13.1777V10.5077C6.00751 7.19766 8.35751 5.83766 11.2275 7.49766L13.5375 8.83766L15.8475 10.1777C18.7175 11.8377 18.7175 14.5477 15.8475 16.2077L13.5375 17.5477L11.2275 18.8877C8.35751 20.5177 6.00751 19.1677 6.00751 15.8477V13.1777Z'
									stroke='black'
									stroke-width='1.5'
									stroke-miterlimit='10'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
							</Svg>
						</TouchableOpacity>
					))}
				<TouchableOpacity
					style={{
						marginTop: 20,
						paddingBottom: 12,
						paddingTop: 12,
						borderColor: COLORS?.black,
						borderStyle: 'dashed',
						borderWidth: 1,
						borderRadius: 10,
						width: '100%',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
					}}
					activeOpacity={0.4}
					onPress={() => navigation.navigate('AddStudent')}
				>
					<Svg
						width='25'
						height='24'
						viewBox='0 0 25 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<Path
							d='M6.5 12H18.5M12.5 18V6'
							stroke='black'
							stroke-width='1.5'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
					</Svg>

					<Text style={{ fontSize: 18, fontFamily: FONTS?.regular, marginLeft: 10 }}>
						Add student to class
					</Text>
				</TouchableOpacity>
			</ScrollView>
			<Navbar />
		</View>
	)
}
