import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/core'
import { useEffect } from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Path, Svg } from 'react-native-svg'
import { COLORS, FONTS } from '../../styles/theme'

export default function ClassCard({ courseId, courseName, className, students_qty }) {
	const navigation = useNavigation()

	/*=============================================
	=                fetchMarkDate                =
	=============================================*/
	function handleCourseClick() {
		const jsDate = new Date()
		const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
		const [dotw, day, month, year, hours, minutes, seconds] = [
			weekday[jsDate.getDay()],
			jsDate.getDate(),
			jsDate.getMonth() + 1,
			jsDate.getFullYear(),
			jsDate.getHours(),
			jsDate.getMinutes(),
			jsDate.getSeconds(),
		]

		var date = String(
			dotw + ', ' + day + '/' + month + '/' + year + ' - ' + hours + ':' + minutes + ':' + seconds
		)

		AsyncStorage.getItem(courseId)
			.then((res) => {
				res = JSON.parse(res)
				/*=====  check if the selected date already exists  ======*/
				if (!Object.values(res.batches[className].date).includes(date)) {
					/*=====  insert selected date and time; push 3 into every students attendance  ======*/
					res.batches[className]['date'] = [...res.batches[className]['date'], date]
					for (let i = 0; i < res.batches[className].students.length; i++) {
						res.batches[className].students[i].attendance = [
							...res.batches[className].students[i].attendance,
							3,
						]
					}
				}
				res = JSON.stringify(res)
				AsyncStorage.setItem(courseId, res)
			})
			.then(() => {
				navigation.push('Students', {
					course: courseId,
					batch: className,
					date: date,
				})
			})
			.catch((e) => {
				console.log(e)
			})
	}

	return (
		<TouchableOpacity
			style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				paddingTop: 10,
				paddingBottom: 10,
				borderBottomColor: COLORS?.borderGrey,
				borderBottomWidth: 1,
				paddingLeft: 20,
				paddingRight: 20,
			}}
			onPress={() => handleCourseClick()}
		>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Svg
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<Path
						d='M21.091 6.98002C20.241 6.04002 18.821 5.57002 16.761 5.57002H16.521V5.53002C16.521 3.85002 16.521 1.77002 12.761 1.77002H11.241C7.48101 1.77002 7.48101 3.86002 7.48101 5.53002V5.58002H7.24101C5.17101 5.58002 3.76101 6.05002 2.91101 6.99002C1.92101 8.09002 1.95101 9.57002 2.05101 10.58L2.06101 10.65L2.13801 11.463C2.15301 11.613 2.23301 11.748 2.35901 11.83C2.59901 11.987 3.00001 12.246 3.24101 12.38C3.38101 12.47 3.53101 12.55 3.68101 12.63C5.39101 13.57 7.27101 14.2 9.18101 14.51C9.27101 15.45 9.68101 16.55 11.871 16.55C14.061 16.55 14.491 15.46 14.561 14.49C16.601 14.16 18.571 13.45 20.351 12.41C20.411 12.38 20.451 12.35 20.501 12.32C20.898 12.095 21.309 11.819 21.684 11.548C21.7398 11.5076 21.7866 11.4559 21.8212 11.3963C21.8558 11.3367 21.8776 11.2705 21.885 11.202L21.901 11.059L21.951 10.589C21.961 10.529 21.961 10.479 21.971 10.409C22.051 9.39902 22.031 8.02002 21.091 6.98002ZM13.091 13.83C13.091 14.89 13.091 15.05 11.861 15.05C10.631 15.05 10.631 14.86 10.631 13.84V12.58H13.091V13.83ZM8.91101 5.57002V5.53002C8.91101 3.83002 8.91101 3.20002 11.241 3.20002H12.761C15.091 3.20002 15.091 3.84002 15.091 5.53002V5.58002H8.91101V5.57002Z'
						fill='#294F82'
					/>
					<Path
						d='M20.8728 13.735C20.9537 13.6965 21.0432 13.6801 21.1324 13.6873C21.2217 13.6944 21.3074 13.725 21.3811 13.7759C21.4547 13.8269 21.5136 13.8963 21.5519 13.9773C21.5901 14.0582 21.6063 14.1478 21.5988 14.237L21.2388 18.191C21.0288 20.191 20.2088 22.231 15.8088 22.231H8.18982C3.78982 22.231 2.96982 20.191 2.75982 18.201L2.41982 14.453C2.41226 14.3647 2.42793 14.2759 2.46529 14.1955C2.50265 14.1152 2.56039 14.0459 2.63279 13.9948C2.70518 13.9436 2.7897 13.9123 2.87794 13.9039C2.96619 13.8955 3.0551 13.9104 3.13582 13.947C4.27582 14.463 6.37782 15.377 7.67682 15.717C7.7579 15.739 7.83311 15.7787 7.89707 15.8331C7.96104 15.8876 8.01217 15.9555 8.04682 16.032C8.65382 17.33 9.96982 18.021 11.8708 18.021C13.7528 18.021 15.0858 17.303 15.6948 16.002C15.7295 15.9255 15.7807 15.8576 15.8446 15.8032C15.9086 15.7487 15.9838 15.7091 16.0648 15.687C17.4438 15.324 19.6828 14.302 20.8748 13.735H20.8728Z'
						fill='#294F82'
					/>
				</Svg>
				<View style={{ paddingLeft: 10 }}>
					<Text style={{ fontFamily: FONTS?.light, fontSize: 14, lineHeight: 17 }}>
						<Text style={{ fontFamily: FONTS?.bold, fontSize: 14, lineHeight: 17 }}>
							{courseId}:&nbsp;
						</Text>
						{courseName}
					</Text>
					<View
						style={{
							flexDirection: 'row',
						}}
					>
						{/* batch name */}
						<View
							style={{
								flexDirection: 'row',
								paddingTop: 5,
								marginRight: 10,
							}}
						>
							<Svg
								width='12'
								height='12'
								viewBox='0 0 12 12'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<Path
									d='M10.5 3.5V8.5C10.5 10 9.75 11 8 11H4C2.25 11 1.5 10 1.5 8.5V3.5C1.5 2 2.25 1 4 1H8C9.75 1 10.5 2 10.5 3.5Z'
									stroke='#80848A'
									stroke-width='0.9'
									stroke-miterlimit='10'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
								<Path
									d='M6.625 7H8.75M4.5 9H8.75M7.75 1V4.93C7.75 5.15 7.49 5.26 7.33 5.115L6.17 4.045C6.12399 4.00169 6.06319 3.97757 6 3.97757C5.93681 3.97757 5.87601 4.00169 5.83 4.045L4.67 5.115C4.51 5.26 4.25 5.15 4.25 4.93V1H7.75Z'
									stroke='#80848A'
									stroke-width='0.9'
									stroke-miterlimit='10'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
							</Svg>

							<Text
								style={{ fontFamily: FONTS?.regular, fontSize: 10, lineHeight: 12, paddingLeft: 4 }}
							>
								{className}
							</Text>
						</View>
						{/* Student qty */}
						<View style={{ flexDirection: 'row', paddingTop: 5, alignItems: 'center' }}>
							<Svg
								width='12'
								height='12'
								viewBox='0 0 12 12'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<Path
									d='M8.5 10.5V9.5C8.5 8.96957 8.28929 8.46086 7.91421 8.08579C7.53914 7.71071 7.03043 7.5 6.5 7.5H2.5C1.96957 7.5 1.46086 7.71071 1.08579 8.08579C0.710714 8.46086 0.5 8.96957 0.5 9.5V10.5'
									stroke='#80848A'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
								<Path
									d='M4.5 5.5C5.60457 5.5 6.5 4.60457 6.5 3.5C6.5 2.39543 5.60457 1.5 4.5 1.5C3.39543 1.5 2.5 2.39543 2.5 3.5C2.5 4.60457 3.39543 5.5 4.5 5.5Z'
									stroke='#80848A'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
								<Path
									d='M11.5 10.5V9.5C11.4997 9.05687 11.3522 8.62639 11.0807 8.27616C10.8092 7.92593 10.4291 7.67579 10 7.565'
									stroke='#80848A'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
								<Path
									d='M8 1.565C8.43021 1.67515 8.81152 1.92535 9.08382 2.27616C9.35612 2.62696 9.50392 3.05842 9.50392 3.5025C9.50392 3.94659 9.35612 4.37804 9.08382 4.72885C8.81152 5.07965 8.43021 5.32985 8 5.44'
									stroke='#80848A'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
							</Svg>

							<Text
								style={{ fontFamily: FONTS?.regular, fontSize: 10, lineHeight: 12, paddingLeft: 4 }}
							>
								{students_qty} students
							</Text>
						</View>
					</View>
				</View>
			</View>
			<Svg
				width='24'
				height='24'
				viewBox='0 0 24 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<Path
					d='M13.4697 8.53033C13.1768 8.23744 13.1768 7.76256 13.4697 7.46967C13.7626 7.17678 14.2374 7.17678 14.5303 7.46967L18.5303 11.4697C18.8232 11.7626 18.8232 12.2374 18.5303 12.5303L14.5303 16.5303C14.2374 16.8232 13.7626 16.8232 13.4697 16.5303C13.1768 16.2374 13.1768 15.7626 13.4697 15.4697L16.1893 12.75H6.5C6.08579 12.75 5.75 12.4142 5.75 12C5.75 11.5858 6.08579 11.25 6.5 11.25H16.1893L13.4697 8.53033Z'
					fill='#80848A'
				/>
			</Svg>
		</TouchableOpacity>
	)
}
