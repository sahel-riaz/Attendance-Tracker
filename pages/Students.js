import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Navbar from '../components/Navbar'
import StatCard from '../components/home/StatCard'

import { COLORS, FONTS } from '../styles/theme'
import { useEffect, useState } from 'react'
import { Path, Svg } from 'react-native-svg'

import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Students({ route, navigation }) {
	const { course, classs, date } = route.params

	const [students, setStudents] = useState([])
	const [dateIndex, setDateIndex] = useState()

	const [status, setStatus] = useState([
		COLORS?.lightRed,
		COLORS?.green,
		COLORS?.yellow,
		COLORS?.borderGrey,
	])

	useEffect(() => {
		if (course == null) return
		async function fetch() {
			AsyncStorage.getItem(course)
				.then((res) => {
					res = JSON.parse(res)
					setDateIndex(res.classes[classs]['date'].indexOf(date))
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
						Mark attendance
					</Text>
				</View>
				
			{/* cards on top */}
			<View>
				<View style = {{
					marginTop : 52, 
					flexDirection : 'row',
					justifyContent : 'space-between'
				}}>
					<StatCard 
						val='13'
						border_color='#E8E8E8'
						back_color='#D8D8D8'
						path_d="M9.50004 2.08337C5.13796 2.08337 1.58337 5.63796 1.58337 10C1.58337 14.3621 5.13796 17.9167 9.50004 17.9167C13.8621 17.9167 17.4167 14.3621 17.4167 10C17.4167 5.63796 13.8621 2.08337 9.50004 2.08337ZM12.9438 12.8263C12.9042 12.8938 12.8515 12.9527 12.7889 12.9996C12.7263 13.0466 12.655 13.0806 12.5791 13.0997C12.5033 13.1189 12.4243 13.1228 12.347 13.1112C12.2696 13.0996 12.1953 13.0727 12.1284 13.0321L9.67421 11.5675C9.06462 11.2034 8.61337 10.4038 8.61337 9.69921V6.45337C8.61337 6.12879 8.88254 5.85962 9.20712 5.85962C9.53171 5.85962 9.80087 6.12879 9.80087 6.45337V9.69921C9.80087 9.98421 10.0384 10.4038 10.2838 10.5463L12.738 12.0109C13.023 12.1771 13.118 12.5413 12.9438 12.8263Z"
						fill="black"
						/>
					<StatCard 
						val='13'	
						border_color='#ABE2CB'
						back_color='#66DDAA'
						path_d="M14.6775 3.76162L10.3233 2.13079C9.87209 1.96454 9.13584 1.96454 8.68459 2.13079L4.33042 3.76162C3.49126 4.07829 2.81042 5.05996 2.81042 5.95454V12.367C2.81042 13.0083 3.23001 13.8554 3.74459 14.2354L8.09876 17.4891C8.86667 18.067 10.1254 18.067 10.8933 17.4891L15.2475 14.2354C15.7621 13.8475 16.1817 13.0083 16.1817 12.367V5.95454C16.1896 5.05996 15.5088 4.07829 14.6775 3.76162ZM12.255 8.19496L8.85084 11.5991C8.73209 11.7179 8.58167 11.7733 8.43126 11.7733C8.28084 11.7733 8.13042 11.7179 8.01167 11.5991L6.74501 10.3166C6.63459 10.2049 6.57266 10.0541 6.57266 9.89704C6.57266 9.73995 6.63459 9.58919 6.74501 9.47746C6.97459 9.24787 7.35459 9.24787 7.58417 9.47746L8.43917 10.3325L11.4238 7.34787C11.6533 7.11829 12.0333 7.11829 12.2629 7.34787C12.4925 7.57746 12.4925 7.96537 12.255 8.19496Z" 
						fill="black"
						/>
					<StatCard 
						val='13'
						border_color='#FFA196'
						back_color='#FA8072'
						path_d="M14.6775 3.76162L10.3233 2.13079C9.87209 1.96454 9.13584 1.96454 8.68459 2.13079L4.33042 3.76162C3.49126 4.07829 2.81042 5.05996 2.81042 5.95454V12.367C2.81042 13.0083 3.23001 13.8554 3.74459 14.2354L8.09876 17.4891C8.86667 18.067 10.1254 18.067 10.8933 17.4891L15.2475 14.2354C15.7621 13.8475 16.1817 13.0083 16.1817 12.367V5.95454C16.1896 5.05996 15.5088 4.07829 14.6775 3.76162ZM11.6217 11.5595C11.5029 11.6783 11.3525 11.7337 11.2021 11.7337C11.0517 11.7337 10.9013 11.6783 10.7825 11.5595L9.52376 10.3008L8.22543 11.5991C8.10668 11.7179 7.95626 11.7733 7.80584 11.7733C7.65542 11.7733 7.50501 11.7179 7.38626 11.5991C7.27584 11.4874 7.21391 11.3366 7.21391 11.1795C7.21391 11.0225 7.27584 10.8717 7.38626 10.76L8.68459 9.46162L7.41792 8.19496C7.3075 8.08322 7.24558 7.93246 7.24558 7.77537C7.24558 7.61828 7.3075 7.46753 7.41792 7.35579C7.64751 7.12621 8.02751 7.12621 8.25709 7.35579L9.51584 8.61454L10.7429 7.38746C10.9725 7.15787 11.3525 7.15787 11.5821 7.38746C11.8117 7.61704 11.8117 7.99704 11.5821 8.22662L10.355 9.45371L11.6138 10.7125C11.8513 10.95 11.8513 11.322 11.6217 11.5595Z"
						fill="black"
						/>
					<StatCard 
						val='13'
						border_color='#FFEE93'
						back_color='#FFD800'
						path_d="M17.7267 13.1034L12.66 3.98337C11.9792 2.75629 11.0371 2.08337 10 2.08337C8.96296 2.08337 8.02088 2.75629 7.34004 3.98337L2.27338 13.1034C1.63213 14.2671 1.56088 15.3834 2.07546 16.2621C2.59004 17.1409 3.60338 17.6238 4.93338 17.6238H15.0667C16.3967 17.6238 17.41 17.1409 17.9246 16.2621C18.4392 15.3834 18.368 14.2592 17.7267 13.1034ZM9.40629 7.62504C9.40629 7.30046 9.67546 7.03129 10 7.03129C10.3246 7.03129 10.5938 7.30046 10.5938 7.62504V11.5834C10.5938 11.908 10.3246 12.1771 10 12.1771C9.67546 12.1771 9.40629 11.908 9.40629 11.5834V7.62504ZM10.5621 14.5205L10.4434 14.6155C10.3959 14.6471 10.3484 14.6709 10.3009 14.6867C10.2534 14.7105 10.2059 14.7263 10.1505 14.7342C10.103 14.7421 10.0475 14.75 10 14.75C9.95254 14.75 9.89713 14.7421 9.84171 14.7342C9.7921 14.7256 9.74407 14.7096 9.69921 14.6867C9.64875 14.6694 9.60083 14.6454 9.55671 14.6155L9.43796 14.5205C9.29546 14.37 9.20838 14.1642 9.20838 13.9584C9.20838 13.7525 9.29546 13.5467 9.43796 13.3963L9.55671 13.3013C9.60421 13.2696 9.65171 13.2459 9.69921 13.23C9.74671 13.2063 9.79421 13.1905 9.84171 13.1825C9.94463 13.1588 10.0555 13.1588 10.1505 13.1825C10.2059 13.1905 10.2534 13.2063 10.3009 13.23C10.3484 13.2459 10.3959 13.2696 10.4434 13.3013L10.5621 13.3963C10.7046 13.5467 10.7917 13.7525 10.7917 13.9584C10.7917 14.1642 10.7046 14.37 10.5621 14.5205Z"
						fill="black"
						/>
						
					
				</View>
				<View
					style={{
						width : 320,
						height : 43,
						borderWidth : 1,
						borderColor : '#D8D8D8',
						borderRadius : 10,
						marginTop : 10,
						alignItems : 'center',
						paddingTop : 12,
						paddingBottom : 12,
						paddingLeft : 93,
						paddingRight : 93
					}}>
					<Text style ={{
						fontFamily: FONTS?.regular,
						fontWeight : 500,
						fontSize : 16,
						lineHeight : 19,
						
					}}>
					Total students: 97
					</Text>
				</View>
			</View>

			</View>
			<Text style={{ fontFamily: FONTS?.bold, fontSize: 16, paddingLeft: 24, marginTop: 25 }}>
				Students:
			</Text>

			{students.length > 1 && (
				<FlatList
					keyExtractor={(student) => student.rollNumber}
					data={students}
					style={{
						width: '100%',
						paddingLeft: 24,
						paddingRight: 24,
						marginTop: 10,
					}}
					renderItem={({ item, index }) => (
						<TouchableOpacity
							style={{
								marginTop: 8,
								paddingLeft: 16,
								paddingBottom: 12,
								paddingTop: 12,
								borderColor: `${status[item.attendance[dateIndex]]}`,
								backgroundColor: `${status[item.attendance[dateIndex]]}`,
								borderWidth: 1,
								borderRadius: 10,
								width: '100%',
							}}
							activeOpacity={0.4}
							onPress={() =>
								navigation.navigate('Student', {
									course: course,
									classs: classs,
									id: index,
									date: date,
									dateIndex: dateIndex,
								})
							}
						>
							<Text style={{ fontSize: 18, fontFamily: FONTS?.regular }}>{item.studentName}</Text>
						</TouchableOpacity>
					)}
				/>
			)}
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
				onPress={() =>
					navigation.push('AddStudent', { course: course, classs: classs, date: date })
				}
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
			<Navbar />
		</View>
	)
}
