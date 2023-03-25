import { useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Path, Svg } from 'react-native-svg'
import AsyncStorage from '@react-native-async-storage/async-storage'

//components
import ErrorPopUp from '../components/home/ErrorPopUp'
import Navbar from '../components/Navbar'
import StatCard from '../components/home/StatCard'

//themes
import { COLORS, FONTS } from '../styles/theme'

export default function Students({ route, navigation }) {
	const { course, classs, date } = route.params

	const [students, setStudents] = useState([])
	const [dateIndex, setDateIndex] = useState()
	const [stats, setStats] = useState([])
	const [status, setStatus] = useState([
		COLORS?.lightRed,
		COLORS?.green,
		COLORS?.yellow,
		COLORS?.borderGrey,
	])
	const [trigger, setTrigger] = useState(false)

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

	useEffect(() => {
		if (!students) return
		var tempStats = [0, 0, 0, 0]

		for (let i = 0; i < students.length; i++) {
			if (students[i].attendance[dateIndex] == 0) tempStats[2]++
			else if (students[i].attendance[dateIndex] == 1) tempStats[1]++
			else if (students[i].attendance[dateIndex] == 2) tempStats[3]++
			else tempStats[0]++
		}
		setStats(tempStats)
	}, [students])

	function handleDeleteSession() {
		AsyncStorage.getItem(course)
			.then((res) => {
				res = JSON.parse(res)
				res['classes'][classs]['date'].splice(dateIndex, 1)
				for (let i = 0; i < res['classes'][classs]['students'].length; i++) {
					res['classes'][classs]['students'][i]['attendance'].splice(dateIndex, 1)
				}
				res = JSON.stringify(res)
				AsyncStorage.setItem(course, res)
			})
			.then(() => {
				navigation.push('Mark')
			})
	}

	function onCancel() {
		setTrigger(false)
	}

	function onDelete() {
		handleDeleteSession()
		setTrigger(false)
	}

	return (
		<View style={{ flex: 1 }}>
			<StatusBar />
			<ErrorPopUp
				data='Are you sure you want to delete this session?'
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
			<View style={{ paddingLeft: 24, paddingRight: 24 }}>
				<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
							paddingTop: 13,
							paddingBottom: 13,
							width: 80,
							backgroundColor: COLORS?.borderGrey,
							borderRadius: 10,
							borderWidth: 3,
							borderStyle: 'solid',
							borderColor: '#E8E8E8',
						}}
					>
						<Svg
							width='19'
							height='20'
							viewBox='0 0 19 20'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<Path
								d='M9.50016 2.08337C5.13808 2.08337 1.5835 5.63796 1.5835 10C1.5835 14.3621 5.13808 17.9167 9.50016 17.9167C13.8622 17.9167 17.4168 14.3621 17.4168 10C17.4168 5.63796 13.8622 2.08337 9.50016 2.08337ZM12.9439 12.8263C12.9043 12.8938 12.8516 12.9527 12.789 12.9996C12.7264 13.0466 12.6551 13.0806 12.5793 13.0997C12.5034 13.1189 12.4245 13.1228 12.3471 13.1112C12.2697 13.0996 12.1954 13.0727 12.1285 13.0321L9.67433 11.5675C9.06475 11.2034 8.6135 10.4038 8.6135 9.69921V6.45337C8.6135 6.12879 8.88266 5.85962 9.20725 5.85962C9.53183 5.85962 9.801 6.12879 9.801 6.45337V9.69921C9.801 9.98421 10.0385 10.4038 10.2839 10.5463L12.7381 12.0109C13.0231 12.1771 13.1181 12.5413 12.9439 12.8263Z'
								fill='black'
							/>
						</Svg>
						<Text style={{ paddingLeft: 8, fontFamily: FONTS?.bold, fontSize: 16 }}>
							{stats[0]}
						</Text>
					</View>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
							paddingTop: 13,
							paddingBottom: 13,
							width: 80,
							backgroundColor: COLORS?.green,
							borderRadius: 10,
							borderWidth: 3,
							borderStyle: 'solid',
							borderColor: '#ABE2CB',
						}}
					>
						<Svg
							width='19'
							height='20'
							viewBox='0 0 19 20'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<Path
								d='M14.6776 3.76162L10.3235 2.13079C9.87221 1.96454 9.13596 1.96454 8.68471 2.13079L4.33055 3.76162C3.49138 4.07829 2.81055 5.05996 2.81055 5.95454V12.367C2.81055 13.0083 3.23013 13.8554 3.74471 14.2354L8.09888 17.4891C8.8668 18.067 10.1255 18.067 10.8935 17.4891L15.2476 14.2354C15.7622 13.8475 16.1818 13.0083 16.1818 12.367V5.95454C16.1897 5.05996 15.5089 4.07829 14.6776 3.76162ZM12.2551 8.19496L8.85096 11.5991C8.73221 11.7179 8.5818 11.7733 8.43138 11.7733C8.28096 11.7733 8.13055 11.7179 8.0118 11.5991L6.74513 10.3166C6.63471 10.2049 6.57278 10.0541 6.57278 9.89704C6.57278 9.73995 6.63471 9.58919 6.74513 9.47746C6.97471 9.24787 7.35471 9.24787 7.5843 9.47746L8.4393 10.3325L11.4239 7.34787C11.6535 7.11829 12.0335 7.11829 12.263 7.34787C12.4926 7.57746 12.4926 7.96537 12.2551 8.19496Z'
								fill='black'
							/>
						</Svg>

						<Text style={{ paddingLeft: 8, fontFamily: FONTS?.bold, fontSize: 16 }}>
							{stats[1]}
						</Text>
					</View>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
							paddingTop: 13,
							paddingBottom: 13,
							width: 80,
							backgroundColor: COLORS?.lightRed,
							borderRadius: 10,
							borderWidth: 3,
							borderStyle: 'solid',
							borderColor: '#FFA196',
						}}
					>
						<Svg
							width='19'
							height='20'
							viewBox='0 0 19 20'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<Path
								d='M14.6776 3.76162L10.3235 2.13079C9.87221 1.96454 9.13596 1.96454 8.68471 2.13079L4.33055 3.76162C3.49138 4.07829 2.81055 5.05996 2.81055 5.95454V12.367C2.81055 13.0083 3.23013 13.8554 3.74471 14.2354L8.09888 17.4891C8.8668 18.067 10.1255 18.067 10.8935 17.4891L15.2476 14.2354C15.7622 13.8475 16.1818 13.0083 16.1818 12.367V5.95454C16.1897 5.05996 15.5089 4.07829 14.6776 3.76162ZM11.6218 11.5595C11.503 11.6783 11.3526 11.7337 11.2022 11.7337C11.0518 11.7337 10.9014 11.6783 10.7826 11.5595L9.52388 10.3008L8.22555 11.5991C8.1068 11.7179 7.95638 11.7733 7.80596 11.7733C7.65555 11.7733 7.50513 11.7179 7.38638 11.5991C7.27596 11.4874 7.21403 11.3366 7.21403 11.1795C7.21403 11.0225 7.27596 10.8717 7.38638 10.76L8.68471 9.46162L7.41805 8.19496C7.30762 8.08322 7.2457 7.93246 7.2457 7.77537C7.2457 7.61828 7.30762 7.46753 7.41805 7.35579C7.64763 7.12621 8.02763 7.12621 8.25721 7.35579L9.51596 8.61454L10.743 7.38746C10.9726 7.15787 11.3526 7.15787 11.5822 7.38746C11.8118 7.61704 11.8118 7.99704 11.5822 8.22662L10.3551 9.45371L11.6139 10.7125C11.8514 10.95 11.8514 11.322 11.6218 11.5595Z'
								fill='black'
							/>
						</Svg>

						<Text style={{ paddingLeft: 8, fontFamily: FONTS?.bold, fontSize: 16 }}>
							{stats[2]}
						</Text>
					</View>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
							paddingTop: 13,
							paddingBottom: 13,
							width: 80,
							backgroundColor: COLORS?.yellow,
							borderRadius: 10,
							borderWidth: 3,
							borderStyle: 'solid',
							borderColor: '#FFEE93',
						}}
					>
						<Svg
							width='20'
							height='20'
							viewBox='0 0 20 20'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<Path
								d='M17.7267 13.1034L12.66 3.98337C11.9792 2.75629 11.0371 2.08337 10 2.08337C8.96296 2.08337 8.02088 2.75629 7.34004 3.98337L2.27338 13.1034C1.63213 14.2671 1.56088 15.3834 2.07546 16.2621C2.59004 17.1409 3.60338 17.6238 4.93338 17.6238H15.0667C16.3967 17.6238 17.41 17.1409 17.9246 16.2621C18.4392 15.3834 18.368 14.2592 17.7267 13.1034ZM9.40629 7.62504C9.40629 7.30046 9.67546 7.03129 10 7.03129C10.3246 7.03129 10.5938 7.30046 10.5938 7.62504V11.5834C10.5938 11.908 10.3246 12.1771 10 12.1771C9.67546 12.1771 9.40629 11.908 9.40629 11.5834V7.62504ZM10.5621 14.5205L10.4434 14.6155C10.3959 14.6471 10.3484 14.6709 10.3009 14.6867C10.2534 14.7105 10.2059 14.7263 10.1505 14.7342C10.103 14.7421 10.0475 14.75 10 14.75C9.95254 14.75 9.89713 14.7421 9.84171 14.7342C9.7921 14.7256 9.74407 14.7096 9.69921 14.6867C9.64875 14.6694 9.60083 14.6454 9.55671 14.6155L9.43796 14.5205C9.29546 14.37 9.20838 14.1642 9.20838 13.9584C9.20838 13.7525 9.29546 13.5467 9.43796 13.3963L9.55671 13.3013C9.60421 13.2696 9.65171 13.2459 9.69921 13.23C9.74671 13.2063 9.79421 13.1905 9.84171 13.1825C9.94463 13.1588 10.0555 13.1588 10.1505 13.1825C10.2059 13.1905 10.2534 13.2063 10.3009 13.23C10.3484 13.2459 10.3959 13.2696 10.4434 13.3013L10.5621 13.3963C10.7046 13.5467 10.7917 13.7525 10.7917 13.9584C10.7917 14.1642 10.7046 14.37 10.5621 14.5205Z'
								fill='black'
							/>
						</Svg>

						<Text style={{ paddingLeft: 8, fontFamily: FONTS?.bold, fontSize: 16 }}>
							{stats[3]}
						</Text>
					</View>
				</View>
				<View
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: 43,
						borderWidth: 1,
						borderStyle: 'solid',
						borderColor: COLORS?.borderGrey,
						borderRadius: 10,
						marginTop: 10,
					}}
				>
					<Text style={{ fontFamily: FONTS?.bold, fontSize: 16 }}>
						Total students: {students?.length}
					</Text>
				</View>
			</View>
			<Text style={{ fontFamily: FONTS?.bold, fontSize: 16, paddingLeft: 24, marginTop: 25 }}>
				Students:
			</Text>
			<View
				style={{
					paddingLeft: 24,
					paddingRight: 24,
					width: '100%',
					marginTop: 10,
				}}
			>
				{students.length > 1 && (
					<FlatList
						keyExtractor={(student) => student.rollNumber}
						data={students}
						renderItem={({ item, index }) => (
							<TouchableOpacity
								rollNumber={item.rollNumber}
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
						height: 43,
						width: '100%',
						backgroundColor: COLORS?.red,
						alignItems: 'center',
						borderRadius: 10,
						flexDirection: 'row',
						justifyContent: 'center',
						marginTop: 30,
					}}
					onPress={() => {
						setTrigger(true)
					}}
					activeOpacity={0.7}
				>
					<Svg
						width='19'
						height='19'
						viewBox='0 0 19 19'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<Path
							d='M16.6803 4.1404C15.4057 4.01373 14.1312 3.91873 12.8487 3.84748V3.83956L12.6745 2.8104C12.5557 2.08206 12.3816 0.989563 10.5291 0.989563H8.4549C6.61032 0.989563 6.43615 2.03456 6.30948 2.80248L6.14323 3.81581C5.40698 3.86331 4.67073 3.91081 3.93448 3.98206L2.31948 4.1404C1.98698 4.17206 1.74948 4.46498 1.78115 4.78956C1.81282 5.11415 2.09782 5.35165 2.43032 5.31998L4.04532 5.16165C8.19365 4.74998 12.3737 4.90831 16.5695 5.3279H16.6328C16.9337 5.3279 17.1949 5.09831 17.2266 4.78956C17.2385 4.63142 17.188 4.4749 17.0859 4.35355C16.9838 4.2322 16.8382 4.15568 16.6803 4.1404ZM15.2237 6.44415C15.0337 6.24623 14.7724 6.1354 14.5032 6.1354H4.49657C4.2274 6.1354 3.95823 6.24623 3.77615 6.44415C3.59407 6.64206 3.49115 6.91123 3.50698 7.18831L3.99782 15.3108C4.0849 16.5141 4.19573 18.0183 6.95865 18.0183H12.0412C14.8041 18.0183 14.9149 16.5221 15.002 15.3108L15.4928 7.19623C15.5087 6.91123 15.4057 6.64206 15.2237 6.44415ZM10.8141 14.0521H8.17782C7.85323 14.0521 7.58407 13.7829 7.58407 13.4583C7.58407 13.1337 7.85323 12.8646 8.17782 12.8646H10.8141C11.1387 12.8646 11.4078 13.1337 11.4078 13.4583C11.4078 13.7829 11.1387 14.0521 10.8141 14.0521ZM11.4791 10.8854H7.52073C7.19615 10.8854 6.92698 10.6162 6.92698 10.2916C6.92698 9.96706 7.19615 9.6979 7.52073 9.6979H11.4791C11.8037 9.6979 12.0728 9.96706 12.0728 10.2916C12.0728 10.6162 11.8037 10.8854 11.4791 10.8854Z'
							fill='white'
						/>
					</Svg>

					<Text
						style={{
							paddingLeft: 10,
							fontFamily: FONTS?.regular,
							fontSize: 16,
							color: COLORS?.white,
						}}
					>
						Delete session
					</Text>
				</TouchableOpacity>
			</View>
			<Navbar />
		</View>
	)
}
