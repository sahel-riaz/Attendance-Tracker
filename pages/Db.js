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
	const [course, setCourse] = useState(null)
	const [batch, setBatch] = useState(null)

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

	useEffect(() => {
		if (course == null) return
		async function fetch() {
			AsyncStorage.getItem(course)
				.then((res) => {
					res = JSON.parse(res)
					res = Object.keys(res['batches'])
					setBatches(res.map((item, index) => ({ label: item, value: item })))
				})
				.catch((e) => {
					console.log(e)
				})
		}
		fetch()
	}, [course])

	async function handleNavigate() {
		if (course && batch) {
			navigation.push('DbStudents', {
				course: course,
				batch: batch,
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
			<View style={{ paddingTop: 80, flexDirection: 'row', padding: 20 }}>
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
						View student database
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
							d='M24.15 2.5H5.85C4.0125 2.5 2.5 4.0125 2.5 5.85V9.1375C2.5 10.9875 4.0125 12.5 5.85 12.5H24.1375C25.9875 12.5 27.5 10.9875 27.5 9.15V5.85C27.5 4.0125 25.9875 2.5 24.15 2.5ZM8.4375 8.75C8.4375 9.2625 8.0125 9.6875 7.5 9.6875C6.9875 9.6875 6.5625 9.2625 6.5625 8.75V6.25C6.5625 5.7375 6.9875 5.3125 7.5 5.3125C8.0125 5.3125 8.4375 5.7375 8.4375 6.25V8.75ZM13.4375 8.75C13.4375 9.2625 13.0125 9.6875 12.5 9.6875C11.9875 9.6875 11.5625 9.2625 11.5625 8.75V6.25C11.5625 5.7375 11.9875 5.3125 12.5 5.3125C13.0125 5.3125 13.4375 5.7375 13.4375 6.25V8.75ZM22.5 8.4375H17.5C16.9875 8.4375 16.5625 8.0125 16.5625 7.5C16.5625 6.9875 16.9875 6.5625 17.5 6.5625H22.5C23.0125 6.5625 23.4375 6.9875 23.4375 7.5C23.4375 8.0125 23.0125 8.4375 22.5 8.4375ZM24.15 17.5H5.85C4.0125 17.5 2.5 19.0125 2.5 20.85V24.1375C2.5 25.9875 4.0125 27.5 5.85 27.5H24.1375C25.9875 27.5 27.4875 25.9875 27.4875 24.15V20.8625C27.4891 20.4226 27.4041 19.9866 27.2373 19.5796C27.0705 19.1725 26.8251 18.8023 26.5152 18.49C26.2052 18.1778 25.8369 17.9296 25.431 17.7598C25.0252 17.5899 24.5899 17.5016 24.15 17.5ZM8.4375 23.75C8.4375 24.2625 8.0125 24.6875 7.5 24.6875C6.9875 24.6875 6.5625 24.2625 6.5625 23.75V21.25C6.5625 20.7375 6.9875 20.3125 7.5 20.3125C8.0125 20.3125 8.4375 20.7375 8.4375 21.25V23.75ZM13.4375 23.75C13.4375 24.2625 13.0125 24.6875 12.5 24.6875C11.9875 24.6875 11.5625 24.2625 11.5625 23.75V21.25C11.5625 20.7375 11.9875 20.3125 12.5 20.3125C13.0125 20.3125 13.4375 20.7375 13.4375 21.25V23.75ZM22.5 23.4375H17.5C16.9875 23.4375 16.5625 23.0125 16.5625 22.5C16.5625 21.9875 16.9875 21.5625 17.5 21.5625H22.5C23.0125 21.5625 23.4375 21.9875 23.4375 22.5C23.4375 23.0125 23.0125 23.4375 22.5 23.4375Z'
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
							d='M16.4033 14.44L15.6591 13.6959C16.047 13.11 16.2766 12.4054 16.2766 11.6454C16.2766 9.5871 14.6062 7.91669 12.5478 7.91669C10.4895 7.91669 8.81909 9.5871 8.81909 11.6454C8.81909 13.7038 10.4895 15.3742 12.5478 15.3742C13.3078 15.3742 14.0045 15.1446 14.5983 14.7567L15.3424 15.5009C15.4928 15.6513 15.6828 15.7225 15.8808 15.7225C16.0787 15.7225 16.2687 15.6513 16.4191 15.5009C16.6962 15.2159 16.6962 14.7409 16.4033 14.44Z'
							fill='white'
						/>
						<Path
							d='M15.5008 3.18248V4.93998C15.5008 5.58123 15.1049 6.38081 14.7091 6.78456L14.5666 6.91123C14.4558 7.01415 14.2895 7.0379 14.147 6.9904C13.9887 6.93498 13.8304 6.8954 13.672 6.85581C13.3237 6.76873 12.9516 6.72915 12.5716 6.72915C9.84036 6.72915 7.62369 8.94581 7.62369 11.6771C7.62369 12.5796 7.8691 13.4662 8.33619 14.2262C8.73202 14.8912 9.28619 15.4454 9.88785 15.8175C10.0699 15.9362 10.1412 16.1896 9.98285 16.3321C9.92744 16.3796 9.87202 16.4191 9.8166 16.4587L8.70827 17.1791C7.6791 17.8204 6.26202 17.1 6.26202 15.8175V11.5821C6.26202 11.02 5.94535 10.2996 5.62869 9.90373L2.62827 6.7054C2.23244 6.30165 1.91577 5.58123 1.91577 5.10623V3.26165C1.91577 2.30373 2.62827 1.58331 3.49119 1.58331H13.9254C14.7883 1.58331 15.5008 2.30373 15.5008 3.18248Z'
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
						View data
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
