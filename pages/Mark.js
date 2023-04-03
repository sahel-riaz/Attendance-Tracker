import { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { Path, Svg } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'

//components
import Navbar from '../components/Navbar'

//themes
import { COLORS, FONTS } from '../styles/theme'

export default function Mark() {
	const navigation = useNavigation()

	const [courses, setCourses] = useState([])
	const [batches, setBatches] = useState([])
	const [dates, setDates] = useState([])

	const [res, setRes] = useState({})

	const [course, setCourse] = useState(null)
	const [batch, setBatch] = useState(null)
	const [date, setDate] = useState(null)

	/*=============================================
	=                fetchCourses                 =
	=============================================*/
	useEffect(() => {
		async function fetch() {
			AsyncStorage.getAllKeys()
				.then((res) => {
					for (let i = 0; i < res.length; i++) {
						if (res[i] === 'settings') res.splice(i, 1)
					}
					setCourses(res.map((item, index) => ({ label: item, value: item })))
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
		if (course == null) return
		async function fetch() {
			AsyncStorage.getItem(course)
				.then((res) => {
					res = JSON.parse(res)
					setRes(res)
					res = Object.keys(res['batches'])
					setBatches(res.map((item, index) => ({ label: item, value: item })))
				})
				.catch((e) => {
					console.log(e)
				})
		}
		fetch()
	}, [course])

	/*=============================================
	=                 fetchDates                  =
	=============================================*/
	useEffect(() => {
		if (batch == null) return

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

		let tempDates = Object.values(res.batches[batch].date)
		tempDates.push(date)
		setDate(date)
		setDates(tempDates.map((item, index) => ({ label: item, value: item })))
	}, [batch])

	/*=============================================
	=         Apply button functionality          =
	=============================================*/
	async function handleNavigate() {
		if (course && batch) {
			AsyncStorage.getItem(course)
				.then((res) => {
					res = JSON.parse(res)
					/*=====  check if the selected date already exists  ======*/
					if (!Object.values(res.batches[batch].date).includes(date)) {
						/*=====  insert selected date and time; push 3 into every students attendance  ======*/
						res.batches[batch]['date'] = [...res.batches[batch]['date'], date]
						for (let i = 0; i < res.batches[batch].students.length; i++) {
							res.batches[batch].students[i].attendance = [
								...res.batches[batch].students[i].attendance,
								3,
							]
						}
					}
					res = JSON.stringify(res)
					AsyncStorage.setItem(course, res)
				})
				.then(() => {
					navigation.push('Students', {
						course: course,
						batch: batch,
						date: date,
					})
				})
				.catch((e) => {
					console.log(e)
				})
		} else {
			//error
		}
	}

	/*=============================================
	=               preventGoingBack              =
	=============================================*/

	navigation.addListener(
		'beforeRemove',
		(e) => {
			e.preventDefault()
			navigation.push('Home')
		},
		[navigation]
	)

	return (
		<View style={{ flex: 1 }}>
			<StatusBar style='dark' />
			<View
				style={{
					paddingTop: 60,
					flexDirection: 'row',
					paddingRight: 20,
					justifyContent: 'flex-end',
					alignItems: 'center',
				}}
			>
				<TouchableOpacity
					style={{
						padding: 8,
						borderRadius: 50,
						backgroundColor: COLORS?.white,
						elevation: 3,
						marginTop: 10,
					}}
					activeOpacity={0.7}
					onPress={() => {
						navigation.push('MarkInfo')
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
							d='M10 9.45834C10.3452 9.45834 10.625 9.73818 10.625 10.0833V14.25C10.625 14.5952 10.3452 14.875 10 14.875C9.65483 14.875 9.375 14.5952 9.375 14.25V10.0833C9.375 9.73818 9.65483 9.45834 10 9.45834Z'
							fill='black'
						/>
						<Path
							d='M10 8.5C10.4602 8.5 10.8332 7.62691 10.8332 7.16668C10.8332 6.70644 10.4601 6.33334 9.99984 6.33334C9.53959 6.33334 9.1665 6.70644 9.1665 7.16668C9.1665 7.62691 9.53975 8.5 10 8.5Z'
							fill='black'
						/>
						<Path
							fill-rule='evenodd'
							clip-rule='evenodd'
							d='M2.7085 10.5C2.7085 6.47294 5.97309 3.20834 10.0002 3.20834C14.0272 3.20834 17.2918 6.47294 17.2918 10.5C17.2918 14.5271 14.0272 17.7917 10.0002 17.7917C5.97309 17.7917 2.7085 14.5271 2.7085 10.5ZM10.0002 4.45834C6.66345 4.45834 3.9585 7.16329 3.9585 10.5C3.9585 13.8368 6.66345 16.5417 10.0002 16.5417C13.3369 16.5417 16.0418 13.8368 16.0418 10.5C16.0418 7.16329 13.3369 4.45834 10.0002 4.45834Z'
							fill='black'
						/>
					</Svg>
				</TouchableOpacity>

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
			</View>
			<View style={{ alignItems: 'center', marginTop: 32 }}>
				<View
					style={{
						height: 54,
						width: 54,
						justifyContent: 'center',
						alignItems: 'center',
						borderWidth: 1,
						borderColor: COLORS.borderGrey,
						borderRadius: 15,
					}}
				>
					<Svg
						width='30'
						height='30'
						viewBox='0 0 30 30'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<Path
							d='M20.9375 4.45V2.5C20.9375 1.9875 20.5125 1.5625 20 1.5625C19.4875 1.5625 19.0625 1.9875 19.0625 2.5V4.375H10.9375V2.5C10.9375 1.9875 10.5125 1.5625 10 1.5625C9.48754 1.5625 9.06254 1.9875 9.06254 2.5V4.45C5.68754 4.7625 4.05004 6.775 3.80004 9.7625C3.77504 10.125 4.07504 10.425 4.42504 10.425H25.575C25.9375 10.425 26.2375 10.1125 26.2 9.7625C25.95 6.775 24.3125 4.7625 20.9375 4.45ZM23.75 18.75C20.9875 18.75 18.75 20.9875 18.75 23.75C18.75 24.6875 19.0125 25.575 19.475 26.325C19.9157 27.0656 20.5416 27.6787 21.2912 28.1039C22.0408 28.5291 22.8882 28.7518 23.75 28.75C25.575 28.75 27.1625 27.775 28.025 26.325C28.4875 25.575 28.75 24.6875 28.75 23.75C28.75 20.9875 26.5125 18.75 23.75 18.75ZM26.3375 23.2125L23.675 25.675C23.5 25.8375 23.2625 25.925 23.0375 25.925C22.8 25.925 22.5625 25.8375 22.375 25.65L21.1375 24.4125C20.9632 24.2361 20.8654 23.998 20.8654 23.75C20.8654 23.502 20.9632 23.2639 21.1375 23.0875C21.5 22.725 22.1 22.725 22.4625 23.0875L23.0625 23.6875L25.0625 21.8375C25.4375 21.4875 26.0375 21.5125 26.3875 21.8875C26.7375 22.2625 26.7125 22.85 26.3375 23.2125Z'
							fill='#294F82'
						/>
						<Path
							d='M25 12.3H5C4.3125 12.3 3.75 12.8625 3.75 13.55V21.25C3.75 25 5.625 27.5 10 27.5H16.1625C17.025 27.5 17.625 26.6625 17.35 25.85C17.1 25.125 16.8875 24.325 16.8875 23.75C16.8875 19.9625 19.975 16.875 23.7625 16.875C24.125 16.875 24.4875 16.9 24.8375 16.9625C25.5875 17.075 26.2625 16.4875 26.2625 15.7375V13.5625C26.2592 13.2287 26.1252 12.9095 25.8891 12.6734C25.6531 12.4374 25.3338 12.3033 25 12.3ZM11.5125 22.7625C11.275 22.9875 10.95 23.125 10.625 23.125C10.3 23.125 9.975 22.9875 9.7375 22.7625C9.5125 22.525 9.375 22.2 9.375 21.875C9.375 21.55 9.5125 21.225 9.7375 20.9875C9.8625 20.875 9.9875 20.7875 10.15 20.725C10.6125 20.525 11.1625 20.6375 11.5125 20.9875C11.7375 21.225 11.875 21.55 11.875 21.875C11.875 22.2 11.7375 22.525 11.5125 22.7625ZM11.5125 18.3875L11.325 18.5375C11.25 18.5875 11.175 18.625 11.1 18.65C11.025 18.6875 10.95 18.7125 10.875 18.725C10.7875 18.7375 10.7 18.75 10.625 18.75C10.3 18.75 9.975 18.6125 9.7375 18.3875C9.5125 18.15 9.375 17.825 9.375 17.5C9.375 17.175 9.5125 16.85 9.7375 16.6125C10.025 16.325 10.4625 16.1875 10.875 16.275C10.95 16.2875 11.025 16.3125 11.1 16.35C11.175 16.375 11.25 16.4125 11.325 16.4625L11.5125 16.6125C11.7375 16.85 11.875 17.175 11.875 17.5C11.875 17.825 11.7375 18.15 11.5125 18.3875ZM15.8875 18.3875C15.65 18.6125 15.325 18.75 15 18.75C14.675 18.75 14.35 18.6125 14.1125 18.3875C13.8875 18.15 13.75 17.825 13.75 17.5C13.75 17.175 13.8875 16.85 14.1125 16.6125C14.5875 16.15 15.425 16.15 15.8875 16.6125C16.1125 16.85 16.25 17.175 16.25 17.5C16.25 17.825 16.1125 18.15 15.8875 18.3875Z'
							fill='#294F82'
						/>
					</Svg>
				</View>
				<View>
					<Text
						style={{
							fontFamily: FONTS?.bold,
							fontSize: 16,
							lineHeight: 19,
							marginBottom: 6,
							marginTop: 70,
						}}
					>
						Course:
					</Text>
					<Dropdown
						style={styles.dropdown}
						placeholder='Select course'
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						data={courses}
						autoScroll={false}
						maxHeight={300}
						containerStyle={{ marginTop: -50, borderRadius: 7 }}
						itemTextStyle={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							marginLeft: -5,
						}}
						labelField='label'
						valueField='value'
						value={course}
						onChange={(item) => {
							setCourse(item.value)
						}}
						renderRightIcon={() => (
							<Svg
								width='16'
								height='16'
								viewBox='0 0 16 16'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<Path
									d='M13.28 5.96667L8.9333 10.3133C8.41997 10.8267 7.57997 10.8267 7.06664 10.3133L2.71997 5.96667'
									stroke='#838383'
									stroke-width='1.5'
									stroke-miterlimit='10'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
							</Svg>
						)}
					/>
				</View>
				<View>
					<Text
						style={{
							fontFamily: FONTS?.bold,
							fontSize: 16,
							lineHeight: 19,
							marginBottom: 6,
							marginTop: 15,
						}}
					>
						Batch:
					</Text>
					<Dropdown
						style={styles.dropdown}
						placeholder='Select batch'
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						data={batches}
						autoScroll={false}
						maxHeight={300}
						containerStyle={{ marginTop: -50, borderRadius: 7 }}
						itemTextStyle={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							marginLeft: -5,
						}}
						labelField='label'
						valueField='value'
						value={batch}
						onChange={(item) => {
							setBatch(item.value)
						}}
						renderRightIcon={() => (
							<Svg
								width='16'
								height='16'
								viewBox='0 0 16 16'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<Path
									d='M13.28 5.96667L8.9333 10.3133C8.41997 10.8267 7.57997 10.8267 7.06664 10.3133L2.71997 5.96667'
									stroke='#838383'
									stroke-width='1.5'
									stroke-miterlimit='10'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
							</Svg>
						)}
					/>
				</View>
				<View>
					<Text
						style={{
							fontFamily: FONTS?.bold,
							fontSize: 16,
							lineHeight: 19,
							marginBottom: 6,
							marginTop: 15,
						}}
					>
						Date / Time:
					</Text>
					<Dropdown
						style={styles.dropdown}
						placeholder='Select date/time'
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						data={dates}
						autoScroll={false}
						maxHeight={300}
						containerStyle={{ marginTop: -50, borderRadius: 7 }}
						itemTextStyle={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							marginLeft: -5,
						}}
						labelField='label'
						valueField='value'
						value={date}
						onChange={(item) => {
							setDate(item.value)
						}}
						renderRightIcon={() => (
							<Svg
								width='16'
								height='16'
								viewBox='0 0 16 16'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<Path
									d='M13.28 5.96667L8.9333 10.3133C8.41997 10.8267 7.57997 10.8267 7.06664 10.3133L2.71997 5.96667'
									stroke='#838383'
									stroke-width='1.5'
									stroke-miterlimit='10'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
							</Svg>
						)}
					/>
				</View>
				<TouchableOpacity
					style={{
						height: 43,
						width: 160,
						backgroundColor: COLORS?.blue,
						alignItems: 'center',
						borderRadius: 10,
						flexDirection: 'row',
						justifyContent: 'center',
						marginTop: 40,
					}}
					onPress={() => {
						handleNavigate()
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
							d='M5.14579 1.58331C4.30662 1.58331 3.53079 1.87623 2.92121 2.36706C2.50199 2.69837 2.16366 3.12074 1.93186 3.60218C1.70006 4.08361 1.58086 4.61149 1.58329 5.14581C1.58329 5.81081 1.77329 6.44415 2.09787 6.98248C2.52537 7.69498 3.19829 8.24915 4.00579 8.51831C4.36204 8.64498 4.74204 8.70831 5.14579 8.70831C6.04829 8.70831 6.86371 8.37581 7.48912 7.82165C8.01263 7.36566 8.38992 6.7653 8.57371 6.09581C8.66079 5.79498 8.70829 5.4704 8.70829 5.14581C8.70829 3.17456 7.11704 1.58331 5.14579 1.58331ZM6.45996 5.73956H5.75537V6.47581C5.75537 6.63329 5.69282 6.78431 5.58147 6.89566C5.47012 7.00701 5.31909 7.06956 5.16162 7.06956C5.00415 7.06956 4.85313 7.00701 4.74178 6.89566C4.63043 6.78431 4.56787 6.63329 4.56787 6.47581V5.73956H3.79996C3.47537 5.73956 3.20621 5.4704 3.20621 5.14581C3.20621 4.82123 3.47537 4.55206 3.79996 4.55206H4.56787V3.81581C4.56787 3.73784 4.58323 3.66063 4.61307 3.58859C4.64291 3.51656 4.68664 3.4511 4.74178 3.39597C4.79691 3.34083 4.86237 3.2971 4.9344 3.26726C5.00644 3.23742 5.08365 3.22206 5.16162 3.22206C5.23959 3.22206 5.3168 3.23742 5.38884 3.26726C5.46088 3.2971 5.52633 3.34083 5.58147 3.39597C5.6366 3.4511 5.68034 3.51656 5.71018 3.58859C5.74001 3.66063 5.75537 3.73784 5.75537 3.81581V4.55206H6.45996C6.61743 4.55206 6.76845 4.61462 6.8798 4.72597C6.99115 4.83732 7.05371 4.98834 7.05371 5.14581C7.05371 5.30329 6.99115 5.45431 6.8798 5.56566C6.76845 5.67701 6.61743 5.73956 6.45996 5.73956Z'
							fill='white'
						/>
						<Path
							d='M12.6666 16.8546L5.25661 17.7254C4.74203 17.7888 4.28286 17.7096 3.89494 17.5196C3.4848 17.3192 3.15327 16.9876 2.95286 16.5775C2.76286 16.1896 2.69161 15.7383 2.74703 15.2317L3.41994 9.57126C3.48328 9.59501 3.54661 9.61876 3.60994 9.63459C4.09286 9.80876 4.60744 9.89584 5.14578 9.89584C6.30161 9.89584 7.41786 9.47626 8.26494 8.72418C9.13271 7.97058 9.6957 6.92624 9.84828 5.78709C9.85619 5.74751 9.85619 5.70793 9.85619 5.66834L9.99078 5.67626L14.8041 10.4975L15.0099 13.9967C15.2079 15.96 14.527 16.6408 12.6666 16.8546ZM17.4166 8.13993L15.7779 9.17701C15.4691 9.36701 15.0733 9.32743 14.8199 9.06617L11.3129 5.55909C11.1893 5.4352 11.1111 5.27323 11.091 5.09939C11.0709 4.92556 11.11 4.75002 11.202 4.60118L12.2391 2.96243C12.8724 1.96493 14.1391 1.91743 15.0812 2.84368L17.5433 5.30576C18.4062 6.18451 18.3508 7.54618 17.4166 8.13993Z'
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
						Apply
					</Text>
				</TouchableOpacity>
			</View>
			<Navbar />
		</View>
	)
}

const styles = StyleSheet.create({
	dropdown: {
		height: 50,
		borderColor: COLORS?.borderGrey,
		borderWidth: 1,
		width: 270,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 7,
	},
	placeholderStyle: {
		fontFamily: FONTS?.regular,
		fontSize: 14,
		color: COLORS?.placeholder,
	},
	selectedTextStyle: {
		fontFamily: FONTS?.regular,
		fontSize: 14,
		color: COLORS?.black,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
})
