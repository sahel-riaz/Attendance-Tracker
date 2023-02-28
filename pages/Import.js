import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Navbar from '../components/Navbar'
import { StyleSheet } from 'react-native'

import { COLORS, FONTS } from '../styles/theme'
import { useEffect, useState } from 'react'
import { Path, Svg } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native'

import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'

import { EncodingType } from 'expo-file-system'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Mark() {
	const navigation = useNavigation()

	const [courseID, setCourseID] = useState('')
	const [courseName, setCourseName] = useState('')
	const [classs, setClasss] = useState('')
	const [path, setPath] = useState('')
	const [error, setError] = useState('')

	const pickDocument = async () => {
		const result = await DocumentPicker.getDocumentAsync({ type: 'text/*' })
		setPath(result.uri)
	}

	async function handlePress() {
		if (!courseID || !courseName || !classs) {
			setError('Please enter the details before uploading!')
			return
		}
		const dirInfo = await FileSystem.readAsStringAsync(path, EncodingType)
		const dirInfoSplit = dirInfo.split('\n')
		let info = []
		for (let i = 0; i < dirInfoSplit.length; i++) {
			const values = dirInfoSplit[i].split(',')
			if (values[0] != undefined || values[1] != undefined) {
				info.push({ studentName: values[0], rollNumber: values[1], attendance: [] })
			}
		}

		const dataToSet = {
			courseName: courseName,
			classes: {
				[classs]: {
					date: [],
					students: info,
				},
			},
		}

		/*
		 *
			check if courseID already exists using getAllKeys()
			if it does, push it
			if it doesnt, set new
		 *
		 */

		await AsyncStorage.getAllKeys()
			.then((allKeys) => {
				if (allKeys.includes(courseID)) {
					/*=====  key (courseID) already exists  ======*/
					AsyncStorage.getItem(courseID).then((fetchedData) => {
						fetchedData = JSON.parse(fetchedData)
						fetchedData['classes'][classs] = { date: [], students: info }
						fetchedData = JSON.stringify(fetchedData)
						AsyncStorage.setItem(courseID, fetchedData).then(() => {
							navigation.push('Home')
						})
					})
				} else {
					/*=====  key (courseID) does not exist  ======*/
					const temp_json = JSON.stringify(dataToSet)
					AsyncStorage.setItem(courseID, temp_json).then(() => {
						navigation.push('Home')
					})
				}
			})
			.catch((e) => {
				console.log(e)
			})
	}

	async function setCourseNameHandle() {
		await AsyncStorage.getItem(courseID)
			.then((res) => {
				res = JSON.parse(res)
				if (res != null) {
					setCourseName(res[0]?.courseName)
				}
			})
			.catch((e) => {
				console.log(e)
			})
	}

	// useEffect(() => {
	// 	async function handleDelete() {
	// 		// await AsyncStorage.getAllKeys().then((res) => {
	// 		// 	console.log(res)
	// 		// 	AsyncStorage.getItem(res[0]).then((res) => {
	// 		// 		res = JSON.parse(res)
	// 		// 		console.log(res)
	// 		// 	})
	// 		// })

	// 		await AsyncStorage.clear()
	// 		// await AsyncStorage.getItem(courseID).then((res) => {
	// 		// 	res = JSON.parse(res)
	// 		// 	console.log(res)
	// 		// 	// console.log(res['classes']['CS01']['students'][0]['attendance'])
	// 		// 	// console.log(res['CS02'])
	// 		// })
	// 	}
	// 	handleDelete()
	// }, [])

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
						Import data
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
						Course ID:
					</Text>
					<TextInput style={styles.dropdown} value={courseID} onChangeText={setCourseID} />
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
						Course name:
					</Text>
					<TextInput
						style={styles.dropdown}
						value={courseName}
						onChangeText={setCourseName}
						onPressIn={setCourseNameHandle}
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
					<TextInput style={styles.dropdown} value={classs} onChangeText={setClasss} />
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
						Add file:
					</Text>
					<TouchableOpacity style={styles.input} onPress={pickDocument}>
						<Svg
							width='17'
							height='18'
							viewBox='0 0 17 18'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<Path
								d='M4.25 9H12.75M8.5 13.25V4.75'
								stroke='#838383'
								stroke-width='1.5'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
						</Svg>
						<Text
							style={{
								paddingLeft: 10,
								fontFamily: FONTS?.regular,
								fontSize: 16,
								color: COLORS?.selectGrey,
							}}
						>
							Select file
						</Text>
					</TouchableOpacity>
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
						width='19'
						height='19'
						viewBox='0 0 19 19'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<Path
							d='M12.8171 1.58331H6.18293C3.30126 1.58331 1.58334 3.30123 1.58334 6.1829V12.8091C1.58334 15.6987 3.30126 17.4166 6.18293 17.4166H12.8092C15.6908 17.4166 17.4088 15.6987 17.4088 12.8171V6.1829C17.4167 3.30123 15.6988 1.58331 12.8171 1.58331ZM12.6667 10.0937H10.0938V12.6666C10.0938 12.9912 9.82459 13.2604 9.50001 13.2604C9.17543 13.2604 8.90626 12.9912 8.90626 12.6666V10.0937H6.33334C6.00876 10.0937 5.73959 9.82456 5.73959 9.49998C5.73959 9.1754 6.00876 8.90623 6.33334 8.90623H8.90626V6.33331C8.90626 6.00873 9.17543 5.73956 9.50001 5.73956C9.82459 5.73956 10.0938 6.00873 10.0938 6.33331V8.90623H12.6667C12.9913 8.90623 13.2604 9.1754 13.2604 9.49998C13.2604 9.82456 12.9913 10.0937 12.6667 10.0937Z'
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
						Import data
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
	input: {
		height: 50,
		borderColor: COLORS?.borderGrey,
		borderWidth: 1,
		width: 270,
		borderRadius: 7,
		borderStyle: 'dashed',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
