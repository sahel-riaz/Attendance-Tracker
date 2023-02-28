import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import Navbar from '../components/Navbar'
import { StyleSheet } from 'react-native'

import { COLORS, FONTS } from '../styles/theme'
import { useEffect, useState } from 'react'
import { Path, Svg } from 'react-native-svg'

import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Mark() {
	const navigation = useNavigation()

	const [courses, setCourses] = useState([])
	const [classes, setClasses] = useState([])

	const [course, setCourse] = useState(null)
	const [classs, setClasss] = useState(null)

	useEffect(() => {
		async function fetch() {
			AsyncStorage.getAllKeys()
				.then((res) => {
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
					res = Object.keys(res['classes'])
					setClasses(res.map((item, index) => ({ label: item, value: item })))
				})
				.catch((e) => {
					console.log(e)
				})
		}
		fetch()
	}, [course])

	async function handleNavigate() {
		if (course && classs) {
			navigation.navigate('DbStudents', {
				course: course,
				classs: classs,
			})
		} else {
			//error
		}
	}

	return (
		<View style={{ flex: 1 }}>
			<View style={{ paddingTop: 80, flexDirection: 'row', padding: 20 }}>
				<Svg
					width='20'
					height='20'
					viewBox='0 0 16 17'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					onPress={() => navigation.goBack()}
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
						View data
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
						Class:
					</Text>
					<Dropdown
						style={styles.dropdown}
						placeholder='Select class'
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						data={classes}
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
						value={classs}
						onChange={(item) => {
							setClasss(item.value)
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
						width='25'
						height='24'
						viewBox='0 0 25 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<Path
							d='M21.22 18.24L20.28 17.3C20.77 16.56 21.06 15.67 21.06 14.71C21.06 12.11 18.95 10 16.35 10C13.75 10 11.64 12.11 11.64 14.71C11.64 17.31 13.75 19.42 16.35 19.42C17.31 19.42 18.19 19.13 18.94 18.64L19.88 19.58C20.07 19.77 20.31 19.86 20.56 19.86C20.81 19.86 21.05 19.77 21.24 19.58C21.59 19.22 21.59 18.62 21.22 18.24Z'
							fill='white'
						/>
						<Path
							d='M20.08 4.02V6.24C20.08 7.05 19.58 8.06 19.08 8.57L18.9 8.73C18.76 8.86 18.55 8.89 18.37 8.83C18.17 8.76 17.97 8.71 17.77 8.66C17.33 8.55 16.86 8.5 16.38 8.5C12.93 8.5 10.13 11.3 10.13 14.75C10.13 15.89 10.44 17.01 11.03 17.97C11.53 18.81 12.23 19.51 12.99 19.98C13.22 20.13 13.31 20.45 13.11 20.63C13.04 20.69 12.97 20.74 12.9 20.79L11.5 21.7C10.2 22.51 8.41 21.6 8.41 19.98V14.63C8.41 13.92 8.01 13.01 7.61 12.51L3.82 8.47C3.32 7.96 2.92 7.05 2.92 6.45V4.12C2.92 2.91 3.82 2 4.91 2H18.09C19.18 2 20.08 2.91 20.08 4.02Z'
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
		color: COLORS?.selectGrey,
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
