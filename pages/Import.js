import { useRef, useState } from 'react'
import {
	Text,
	TextInput,
	TouchableOpacity,
	View,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
} from 'react-native'
import { Path, Svg } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native'
import { EncodingType } from 'expo-file-system'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'

//components
import Navbar from '../components/Navbar'

//themes
import { COLORS, FONTS } from '../styles/theme'
import { ScrollView } from 'react-native-gesture-handler'

export default function Mark() {
	const navigation = useNavigation()

	const [courseID, setCourseID] = useState('')
	const [courseName, setCourseName] = useState('')
	const [batch, setBatch] = useState('')
	const [path, setPath] = useState('')
	const [error, setError] = useState('')
	const [docPicker, setDocPicker] = useState([true, ''])

	const courseNameRef = useRef()
	const classRef = useRef()

	const pickDocument = async () => {
		await DocumentPicker.getDocumentAsync({ type: 'text/*' }).then((res) => {
			if (res.type == 'success') {
				setPath(res.uri)
				setDocPicker([false, res.name])
			}
		})
	}

	async function handlePress() {
		if (!courseID || !courseName || !batch) {
			setError('Please enter the details before uploading!')
			return
		}
		const dirInfo = await FileSystem.readAsStringAsync(path, EncodingType)
		const dirInfoSplit = dirInfo.split('\n')
		let info = []
		for (let i = 0; i < dirInfoSplit.length; i++) {
			const values = dirInfoSplit[i].split(',')
			if (
				values[0] != undefined ||
				values[1] != undefined ||
				values[0] != ' ' ||
				values[1] != ' '
			) {
				info.push({
					rollNumber: values[0],
					studentName: values[1],
					emailId: values[2],
					attendance: [],
				})
			}
		}

		const dataToSet = {
			courseName: courseName,
			batches: {
				[batch]: {
					date: [],
					students: info,
				},
			},
		}

		/*
		 *
			check if courseID already exists using getAllKeys()
			if it does, push it
			if it doesn't, set new
		 *
		 */

		await AsyncStorage.getAllKeys()
			.then((allKeys) => {
				if (allKeys.includes(courseID.toUpperCase())) {
					/*=====  key (courseID) already exists  ======*/
					AsyncStorage.getItem(courseID.toUpperCase()).then((fetchedData) => {
						fetchedData = JSON.parse(fetchedData)
						fetchedData['batches'][batch] = { date: [], students: info }
						fetchedData = JSON.stringify(fetchedData)
						AsyncStorage.setItem(courseID.toUpperCase(), fetchedData).then(() => {
							navigation.push('Home')
						})
					})
				} else {
					/*=====  key (courseID) does not exist  ======*/
					const temp_json = JSON.stringify(dataToSet)
					AsyncStorage.setItem(courseID.toUpperCase(), temp_json).then(() => {
						navigation.push('Home')
					})
				}
			})
			.catch((e) => {
				console.log(e)
			})
	}

	async function setCourseNameHandle() {
		await AsyncStorage.getItem(courseID.toUpperCase())
			.then((res) => {
				res = JSON.parse(res)
				if (res != null) {
					setCourseName(res.courseName)
				}
			})
			.catch((e) => {
				console.log(e)
			})
	}

	/*=============================================
	=         Clear storage - for testing         =
	=============================================*/

	// useEffect(() => {
	// 	async function handleDelete() {
	// 		await AsyncStorage.clear()
	// 	}
	// 	handleDelete()
	// }, [])

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
		<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
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
						navigation.push('ImportInfo')
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
						Import student roll list
					</Text>
				</View>
			</View>

			<View style={{ alignItems: 'center', marginTop: 20, justifyContent: 'flex-end' }}>
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
							d='M21 11.25H15.9375V16.8L18.525 14.2125C18.7125 14.025 18.95 13.9375 19.1875 13.9375C19.425 13.9375 19.6625 14.025 19.85 14.2125C20.2125 14.575 20.2125 15.175 19.85 15.5375L15.6625 19.725C15.3 20.0875 14.7 20.0875 14.3375 19.725L10.15 15.5375C9.97565 15.3611 9.87787 15.123 9.87787 14.875C9.87787 14.627 9.97565 14.3889 10.15 14.2125C10.5125 13.85 11.1125 13.85 11.475 14.2125L14.0625 16.8V11.25H9C5 11.25 2.5 13.75 2.5 17.75V20.9875C2.5 25 5 27.5 9 27.5H20.9875C24.9875 27.5 27.4875 25 27.4875 21V17.75C27.5 13.75 25 11.25 21 11.25ZM15.9375 3.4375C15.9375 2.925 15.5125 2.5 15 2.5C14.4875 2.5 14.0625 2.925 14.0625 3.4375V11.25H15.9375V3.4375Z'
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
							marginTop: 60,
						}}
					>
						Course ID:
					</Text>
					<TextInput
						style={styles.dropdown}
						value={courseID}
						onChangeText={setCourseID}
						onSubmitEditing={() => {
							courseNameRef.current.focus()
						}}
						placeholder='eg: CS3004D'
						placeholderTextColor={COLORS?.placeholder}
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
						Course name:
					</Text>
					<TextInput
						style={styles.dropdown}
						value={courseName}
						onChangeText={setCourseName}
						onPressIn={setCourseNameHandle}
						onSubmitEditing={() => {
							classRef.current.focus()
						}}
						ref={courseNameRef}
						placeholder='eg: Software Engineering'
						placeholderTextColor={COLORS?.placeholder}
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
					<TextInput
						style={styles.dropdown}
						value={batch}
						onChangeText={setBatch}
						ref={classRef}
						placeholder='eg: CS01'
						placeholderTextColor={COLORS?.placeholder}
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
						Add file:
					</Text>
					<TouchableOpacity style={styles.input} onPress={pickDocument}>
						{docPicker[0] ? (
							<>
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
							</>
						) : (
							<>
								<Text
									style={{
										paddingLeft: 10,
										fontFamily: FONTS?.regular,
										fontSize: 16,
										color: COLORS?.selectGrey,
									}}
								>
									File selected: {docPicker[1]}
								</Text>
							</>
						)}
					</TouchableOpacity>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 12,
							color: COLORS?.selectGrey,
							alignSelf: 'center',
							marginTop: 6,
						}}
					>
						* Read instructions before importing
					</Text>
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
						marginTop: 24,
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
		</KeyboardAvoidingView>
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
		fontFamily: FONTS?.light,
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
