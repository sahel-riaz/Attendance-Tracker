import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import Navbar from '../components/Navbar'
import { StyleSheet } from 'react-native'

import { COLORS, FONTS } from '../styles/theme'
import { useEffect, useState } from 'react'
import { Path, Svg } from 'react-native-svg'

import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { jsonToCSV } from 'react-native-csv'

import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
import { StorageAccessFramework } from 'expo-file-system'
import { StatusBar } from 'expo-status-bar'

export default function Mark() {
	const navigation = useNavigation()

	const [courses, setCourses] = useState([])
	const [classes, setClasses] = useState([])

	const [course, setCourse] = useState(null)
	const [classs, setClasss] = useState(null)

	/*=============================================
	=                fetchCourses                 =
	=============================================*/
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

	/*=============================================
	=                fetchClasses                 =
	=============================================*/
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

	async function handlePress() {
		if (course && classs) {
			AsyncStorage.getItem(course).then((res) => {
				const results = JSON.parse(res)

				const jsDate = new Date()
				const weekday = [
					'Sunday',
					'Monday',
					'Tuesday',
					'Wednesday',
					'Thursday',
					'Friday',
					'Saturday',
				]
				const [dotw, day, month, year, hours, minutes, seconds] = [
					weekday[jsDate.getDay()],
					jsDate.getDate(),
					jsDate.getMonth() + 1,
					jsDate.getFullYear(),
					jsDate.getHours(),
					jsDate.getMinutes(),
					jsDate.getSeconds(),
				]

				const date = String(
					dotw + ', ' + day + '/' + month + '/' + year + '-' + hours + ':' + minutes + ':' + seconds
				)
				const fileName = course + '|' + classs + ' || ' + date

				var dates = ['Student Name', 'Student Roll Number']

				for (let i = 0; i < results['classes'][classs].date.length; i++) {
					dates = [...dates, results['classes'][classs].date[i]]
				}

				var student = []

				for (let i = 0; i < results['classes'][classs].students.length; i++) {
					let temp = []
					if (results['classes'][classs].students[i].studentName != '') {
						temp = [
							...temp,
							results['classes'][classs].students[i].studentName,
							results['classes'][classs].students[i].rollNumber,
							...results['classes'][classs].students[i].attendance,
						]
					}
					student = [...student, temp]
				}

				StorageAccessFramework.requestDirectoryPermissionsAsync()
					.then((res) => {
						const folderLocation = res['directoryUri']
						const results = jsonToCSV({
							fields: dates,
							data: student,
						})
						StorageAccessFramework.createFileAsync(folderLocation, fileName, 'text/csv').then(
							(res) => {
								StorageAccessFramework.writeAsStringAsync(res, results)
							}
						)
					})
					.catch((e) => {
						console.log(e)
					})
			})
		}
	}

	/**
	 *
	 * archive code
	 *
	 */

	// StorageAccessFramework.createFileAsync()

	// let fileUri = FileSystem.documentDirectory + 'savedFile.txt'
	// console.log(fileUri)
	// await FileSystem.writeAsStringAsync(fileUri, results, {
	// 	encoding: FileSystem.EncodingType.UTF8,
	// })

	// const preRes = MediaLibrary.requestPermissionsAsync()
	// console.log(preRes)

	// const albumRes = MediaLibrary.createAlbumAsync('download', fileUri)
	// console.log(albumRes)
	// }

	return (
		<View style={{ flex: 1 }}>
			<StatusBar />
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
						Export data
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
							d='M21 11.25H15.9375V19.0625C15.9375 19.575 15.5125 20 15 20C14.4875 20 14.0625 19.575 14.0625 19.0625V11.25H9C5 11.25 2.5 13.75 2.5 17.75V20.9875C2.5 25 5 27.5 9 27.5H20.9875C24.9875 27.5 27.4875 25 27.4875 21V17.75C27.5 13.75 25 11.25 21 11.25Z'
							fill='#294F82'
						/>
						<Path
							d='M15.9375 5.70128L18.525 8.28878C18.7125 8.47628 18.95 8.56378 19.1875 8.56378C19.425 8.56378 19.6625 8.47628 19.85 8.28878C20.2125 7.92628 20.2125 7.32628 19.85 6.96378L15.6625 2.77628C15.4861 2.60193 15.248 2.50415 15 2.50415C14.752 2.50415 14.5139 2.60193 14.3375 2.77628L10.15 6.96378C9.78749 7.32628 9.78749 7.92628 10.15 8.28878C10.5125 8.65128 11.1125 8.65128 11.475 8.28878L14.0625 5.70128V11.2513H15.9375V5.70128Z'
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
					onPress={handlePress}
					activeOpacity={0.7}
				>
					<Svg
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<Path
							d='M7.25 7.59998C7.25 8.56647 8.0335 9.34998 9 9.34998H15C15.9665 9.34998 16.75 8.56647 16.75 7.59998V4.27627C16.75 4.12369 16.8737 4 17.0263 4C17.1722 4 17.3108 4.06373 17.4058 4.17448L20.3685 7.62867C20.7791 8.1074 20.9936 8.72364 20.9689 9.35387L20.6273 18.0976C20.5749 19.4393 19.4719 20.5 18.1292 20.5H17.75C17.4739 20.5 17.25 20.2761 17.25 20V15C17.25 14.0335 16.4665 13.25 15.5 13.25H8.5C7.5335 13.25 6.75 14.0335 6.75 15V20C6.75 20.2761 6.52614 20.5 6.25 20.5H6.11291C4.90908 20.5 3.89276 19.6055 3.73989 18.4114C3.24597 14.5534 3.2247 10.6495 3.67653 6.78632L3.73742 6.26575C3.8885 4.97395 4.983 4 6.28361 4H6.75C7.02614 4 7.25 4.22386 7.25 4.5V7.59998Z'
							fill='white'
						/>
						<Path
							d='M8.25 20C8.25 20.2761 8.47386 20.5 8.75 20.5H15.25C15.5261 20.5 15.75 20.2761 15.75 20V15C15.75 14.8619 15.6381 14.75 15.5 14.75H8.5C8.36193 14.75 8.25 14.8619 8.25 15V20Z'
							fill='white'
						/>
						<Path
							d='M15.25 4.5C15.25 4.22386 15.0261 4 14.75 4H9.25C8.97386 4 8.75 4.22386 8.75 4.5V7.59998C8.75 7.73805 8.86193 7.84998 9 7.84998H15C15.1381 7.84998 15.25 7.73805 15.25 7.59998V4.5Z'
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
						Export data
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
