import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Navbar from '../components/Navbar'

import { COLORS, FONTS } from '../styles/theme'
import { useEffect, useState } from 'react'
import { Path, Svg } from 'react-native-svg'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import ErrorPopUp from '../components/home/ErrorPopUp'

export default function DbStudents({ route, navigation }) {
	const { course, classs } = route.params

	const [students, setStudents] = useState([])
	const [trigger, setTrigger] = useState(false)

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

	function handleDeleteClass() {
		AsyncStorage.getItem(course)
			.then((res) => {
				res = JSON.parse(res)
				if (Object.keys(res['classes']).length == 1) {
					AsyncStorage.removeItem(course)
				} else {
					delete res['classes'][classs]
					res = JSON.stringify(res)
					AsyncStorage.setItem(course, res)
				}
			})
			.then(() => {
				navigation.push('Db')
			})
	}

	function onCancel() {
		setTrigger(false)
	}

	function onDelete() {
		handleDeleteClass()
		setTrigger(false)
	}

	return (
		<View style={{ flex: 1 }}>
			<StatusBar />
			<ErrorPopUp
				data='Are you sure you want to delete this class?'
				trigger={trigger}
				onCancel={onCancel}
				onDelete={onDelete}
			/>
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
					onPress={() => navigation.push('AddStudent', { course: course, classs: classs })}
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
				{/* Delete button */}
				<View
					style={{
						width: '100%',
						height: 43,
						backgroundColor: 'red',
						marginTop: 30,
						borderRadius: 10,
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'row',
					}}
				>
					<View
						style={{
							marginRight: 10,
						}}
					>
						<Svg
							width='17'
							height='19'
							viewBox='0 0 17 19'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<Path
								d='M15.6803 4.1404C14.4057 4.01373 13.1312 3.91873 11.8487 3.84748V3.83956L11.6745 2.8104C11.5557 2.08206 11.3816 0.989563 9.52907 0.989563H7.4549C5.61032 0.989563 5.43615 2.03456 5.30948 2.80248L5.14323 3.81581C4.40698 3.86331 3.67073 3.91081 2.93448 3.98206L1.31948 4.1404C0.986984 4.17206 0.749484 4.46498 0.781151 4.78956C0.812818 5.11415 1.09782 5.35165 1.43032 5.31998L3.04532 5.16165C7.19365 4.74998 11.3737 4.90831 15.5695 5.3279H15.6328C15.9337 5.3279 16.1949 5.09831 16.2266 4.78956C16.2385 4.63142 16.188 4.4749 16.0859 4.35355C15.9838 4.2322 15.8382 4.15568 15.6803 4.1404ZM14.2237 6.44415C14.0337 6.24623 13.7724 6.1354 13.5032 6.1354H3.49657C3.2274 6.1354 2.95823 6.24623 2.77615 6.44415C2.59407 6.64206 2.49115 6.91123 2.50698 7.18831L2.99782 15.3108C3.0849 16.5141 3.19573 18.0183 5.95865 18.0183H11.0412C13.8041 18.0183 13.9149 16.5221 14.002 15.3108L14.4928 7.19623C14.5087 6.91123 14.4057 6.64206 14.2237 6.44415ZM9.81407 14.0521H7.17782C6.85323 14.0521 6.58407 13.7829 6.58407 13.4583C6.58407 13.1337 6.85323 12.8646 7.17782 12.8646H9.81407C10.1387 12.8646 10.4078 13.1337 10.4078 13.4583C10.4078 13.7829 10.1387 14.0521 9.81407 14.0521ZM10.4791 10.8854H6.52073C6.19615 10.8854 5.92698 10.6162 5.92698 10.2916C5.92698 9.96706 6.19615 9.6979 6.52073 9.6979H10.4791C10.8037 9.6979 11.0728 9.96706 11.0728 10.2916C11.0728 10.6162 10.8037 10.8854 10.4791 10.8854Z'
								fill='white'
							/>
						</Svg>
					</View>

					<Text
						style={{
							fontFamily: FONTS?.regular,
							color: COLORS?.white,
							fontWeight: 500,
							fontSize: 16,
							lineHeight: 19,
						}}
					>
						Delete Class
					</Text>
				</View>
			</ScrollView>
			<Navbar />
		</View>
	)
}
