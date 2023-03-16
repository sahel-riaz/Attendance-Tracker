import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Navbar from '../components/Navbar'

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
					
				}}>
					<View 
						style ={{
							width : 74,
							height : 52,
							borderWidth : 3,
							borderColor : '#E8E8E8',
							borderRadius : 	10,
							backgroundColor : '#D8D8D8',
							alignItems : 'center',
							flexDirection : 'row',
							gap : 8,
							justifyContent : 'center',
							
						}}>

						<Svg 
							width="19" 
							height="20" 
							viewBox="0 0 19 20" 
							fill="none" 
							xmlns="http://www.w3.org/2000/svg">
							<Path 
								d="M9.50004 2.08337C5.13796 2.08337 1.58337 5.63796 1.58337 10C1.58337 14.3621 5.13796 17.9167 9.50004 17.9167C13.8621 17.9167 17.4167 14.3621 17.4167 10C17.4167 5.63796 13.8621 2.08337 9.50004 2.08337ZM12.9438 12.8263C12.9042 12.8938 12.8515 12.9527 12.7889 12.9996C12.7263 13.0466 12.655 13.0806 12.5791 13.0997C12.5033 13.1189 12.4243 13.1228 12.347 13.1112C12.2696 13.0996 12.1953 13.0727 12.1284 13.0321L9.67421 11.5675C9.06462 11.2034 8.61337 10.4038 8.61337 9.69921V6.45337C8.61337 6.12879 8.88254 5.85962 9.20712 5.85962C9.53171 5.85962 9.80087 6.12879 9.80087 6.45337V9.69921C9.80087 9.98421 10.0384 10.4038 10.2838 10.5463L12.738 12.0109C13.023 12.1771 13.118 12.5413 12.9438 12.8263Z" fill="black"/>
						</Svg>

						<Text style = {{
							fontFamily: FONTS?.regular,
							fontWeight : 500,
							fontSize : 16,
							lineHeight : 19.2,
						}}>
							13
						</Text>
					</View>
					<View 
						style ={{
							width : 74,
							height : 52,
							borderWidth : 3,
							borderColor : '#E8E8E8',
							borderRadius : 	10,
							backgroundColor : '#D8D8D8',
							alignItems : 'center',
							flexDirection : 'row',
							gap : 8,
							justifyContent : 'center',
							
						}}>

						<Svg 
							width="19" 
							height="20" 
							viewBox="0 0 19 20" 
							fill="none" 
							xmlns="http://www.w3.org/2000/svg">
							<Path 
								d="M9.50004 2.08337C5.13796 2.08337 1.58337 5.63796 1.58337 10C1.58337 14.3621 5.13796 17.9167 9.50004 17.9167C13.8621 17.9167 17.4167 14.3621 17.4167 10C17.4167 5.63796 13.8621 2.08337 9.50004 2.08337ZM12.9438 12.8263C12.9042 12.8938 12.8515 12.9527 12.7889 12.9996C12.7263 13.0466 12.655 13.0806 12.5791 13.0997C12.5033 13.1189 12.4243 13.1228 12.347 13.1112C12.2696 13.0996 12.1953 13.0727 12.1284 13.0321L9.67421 11.5675C9.06462 11.2034 8.61337 10.4038 8.61337 9.69921V6.45337C8.61337 6.12879 8.88254 5.85962 9.20712 5.85962C9.53171 5.85962 9.80087 6.12879 9.80087 6.45337V9.69921C9.80087 9.98421 10.0384 10.4038 10.2838 10.5463L12.738 12.0109C13.023 12.1771 13.118 12.5413 12.9438 12.8263Z" fill="black"/>
						</Svg>

						<Text style = {{
							fontFamily: FONTS?.regular,
							fontWeight : 500,
							fontSize : 16,
							lineHeight : 19.2,
						}}>
							13
						</Text>
					</View>

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
