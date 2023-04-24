import { useState } from 'react'
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
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'

//components
import Navbar from '../components/Navbar'

//themes
import { COLORS, FONTS } from '../styles/theme'

export default function Mark({ route, navigation }) {
	const { course, batch } = route.params

	const [studentName, setStudentName] = useState()
	const [studentID, setStudentID] = useState()
	const [studentEmailID, setStudentEmailID] = useState()

	async function handlePress() {
		if (studentName && studentID) {
			AsyncStorage.getItem(course)
				.then((res) => {
					res = JSON.parse(res)
					const numberOfDays = res.batches[batch].date.length
					const fillAttendance = []
					for (let i = 0; i < numberOfDays; i++) {
						fillAttendance.push(3)
					}
					const student = {
						attendance: fillAttendance,
						rollNumber: studentID,
						studentName: studentName,
						emailId: studentEmailID,
					}
					res.batches[batch].students = [...res.batches[batch].students, student]
					res = JSON.stringify(res)
					AsyncStorage.setItem(course, res)
				})
				.then(() => {
					navigation.push('DbStudents', {
						course: course,
						batch: batch,
					})
				})
		}
	}

	/*=============================================
	=               preventGoingBack              =
	=============================================*/

	navigation.addListener(
		'beforeRemove',
		(e) => {
			e.preventDefault()
			navigation.push('DbStudents', {
				course: course,
				batch: batch,
			})
		},
		[navigation]
	)

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
			<StatusBar style='dark' />
			<View style={{ paddingTop: 60, flexDirection: 'row' }}>
				<TouchableOpacity
					style={{ padding: 20 }}
					onPress={() =>
						navigation.push('DbStudents', {
							course: course,
							batch: batch,
						})
					}
				>
					<Svg
						width='20'
						height='20'
						viewBox='0 0 16 17'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
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
						Add student
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
							d='M27.4625 2.91254C26.9976 2.38726 26.4259 1.96724 25.7857 1.68055C25.1455 1.39385 24.4515 1.24708 23.75 1.25004C23.0932 1.24922 22.4426 1.37799 21.8356 1.62897C21.2286 1.87995 20.6771 2.24822 20.2126 2.71268C19.7482 3.17713 19.3799 3.72865 19.1289 4.33565C18.8779 4.94265 18.7492 5.5932 18.75 6.25004C18.75 7.18754 19.0125 8.07504 19.475 8.82504C19.725 9.25004 20.05 9.63754 20.425 9.96254C21.3 10.7625 22.4625 11.25 23.75 11.25C24.3 11.25 24.825 11.1625 25.3125 10.9875C26.4625 10.625 27.425 9.83754 28.025 8.82504C28.2875 8.40004 28.4875 7.91254 28.6 7.41254C28.7 7.03754 28.75 6.65004 28.75 6.25004C28.75 4.97504 28.2625 3.80004 27.4625 2.91254ZM25.6125 7.16254H24.6875V8.13754C24.6875 8.65004 24.2625 9.07504 23.75 9.07504C23.2375 9.07504 22.8125 8.65004 22.8125 8.13754V7.16254H21.8875C21.375 7.16254 20.95 6.73754 20.95 6.22504C20.95 5.71254 21.375 5.28754 21.8875 5.28754H22.8125V4.40004C22.8125 3.88754 23.2375 3.46254 23.75 3.46254C24.2625 3.46254 24.6875 3.88754 24.6875 4.40004V5.28754H25.6125C25.8611 5.28754 26.0996 5.38632 26.2754 5.56213C26.4512 5.73795 26.55 5.9764 26.55 6.22504C26.55 6.47368 26.4512 6.71214 26.2754 6.88796C26.0996 7.06377 25.8611 7.16254 25.6125 7.16254Z'
							fill='#294F82'
						/>
						<Path
							d='M27.5 15.0001C27.5 13.3626 27.1875 11.7876 26.6 10.3501C26.2125 10.6251 25.775 10.8376 25.3125 10.9876C25.175 11.0376 25.0375 11.0751 24.8875 11.1126C25.6416 13.0271 25.8221 15.1198 25.407 17.1353C24.992 19.1507 23.9992 21.0017 22.55 22.4626C22.1875 22.0001 21.725 21.5751 21.175 21.2126C17.7875 18.9376 12.2375 18.9376 8.825 21.2126C8.275 21.5751 7.825 22.0001 7.45 22.4626C5.48102 20.4779 4.3758 17.7957 4.375 15.0001C4.375 9.13755 9.1375 4.37505 15 4.37505C16.3625 4.37505 17.675 4.63755 18.875 5.11255C18.9125 4.96255 18.95 4.82505 19 4.67505C19.15 4.21255 19.3625 3.78755 19.65 3.40005C18.1731 2.80103 16.5937 2.49534 15 2.50005C8.1125 2.50005 2.5 8.11255 2.5 15.0001C2.5 18.6251 4.0625 21.8876 6.5375 24.1751C6.5375 24.1876 6.5375 24.1876 6.525 24.2001C6.65 24.3251 6.8 24.4251 6.925 24.5376C7 24.6001 7.0625 24.6626 7.1375 24.7126C7.3625 24.9001 7.6125 25.0751 7.85 25.2501L8.1 25.4251C8.3375 25.5876 8.5875 25.7376 8.85 25.8751C8.9375 25.9251 9.0375 25.9876 9.125 26.0376C9.375 26.1751 9.6375 26.3001 9.9125 26.4126C10.0125 26.4626 10.1125 26.5126 10.2125 26.5501C10.4875 26.6626 10.7625 26.7626 11.0375 26.8501C11.1375 26.8876 11.2375 26.9251 11.3375 26.9501C11.6375 27.0376 11.9375 27.1126 12.2375 27.1876C12.325 27.2126 12.4125 27.2376 12.5125 27.2501C12.8625 27.3251 13.2125 27.3751 13.575 27.4126C13.625 27.4126 13.675 27.4251 13.725 27.4376C14.15 27.4751 14.575 27.5001 15 27.5001C15.425 27.5001 15.85 27.4751 16.2625 27.4376C16.3125 27.4376 16.3625 27.4251 16.4125 27.4126C16.775 27.3751 17.125 27.3251 17.475 27.2501C17.5625 27.2376 17.65 27.2001 17.75 27.1876C18.05 27.1126 18.3625 27.0501 18.65 26.9501C18.75 26.9126 18.85 26.8751 18.95 26.8501C19.225 26.7501 19.5125 26.6626 19.775 26.5501C19.875 26.5126 19.975 26.4626 20.075 26.4126C20.3375 26.3001 20.6 26.1751 20.8625 26.0376C20.9625 25.9876 21.05 25.9251 21.1375 25.8751C21.3875 25.7251 21.6375 25.5876 21.8875 25.4251C21.975 25.3751 22.05 25.3126 22.1375 25.2501C22.3875 25.0751 22.625 24.9001 22.85 24.7126C22.925 24.6501 22.9875 24.5876 23.0625 24.5376C23.2 24.4251 23.3375 24.3126 23.4625 24.2001C23.4625 24.1876 23.4625 24.1876 23.45 24.1751C25.9375 21.8876 27.5 18.6251 27.5 15.0001Z'
							fill='#294F82'
						/>
						<Path
							d='M15 8.66248C12.4125 8.66248 10.3125 10.7625 10.3125 13.35C10.3125 15.8875 12.3 17.95 14.9375 18.025H15.1625C16.3759 17.9851 17.5263 17.4751 18.3706 16.6028C19.215 15.7304 19.6872 14.564 19.6875 13.35C19.6875 10.7625 17.5875 8.66248 15 8.66248Z'
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
						* Student Name:
					</Text>
					<TextInput
						style={styles.dropdown}
						value={studentName}
						onChangeText={setStudentName}
						placeholder='Enter student name'
						placeholderTextColor={COLORS?.placeholder}
					/>
					<Text
						style={{
							fontFamily: FONTS?.bold,
							fontSize: 16,
							lineHeight: 19,
							marginBottom: 6,
							marginTop: 15,
						}}
					>
						* Student Roll no:
					</Text>
					<TextInput
						style={styles.dropdown}
						value={studentID}
						onChangeText={setStudentID}
						placeholder='Enter student roll number'
						placeholderTextColor={COLORS?.placeholder}
					/>
					<Text
						style={{
							fontFamily: FONTS?.bold,
							fontSize: 16,
							lineHeight: 19,
							marginBottom: 6,
							marginTop: 15,
						}}
					>
						Student Email ID:
					</Text>
					<TextInput
						style={styles.dropdown}
						value={studentEmailID}
						onChangeText={setStudentEmailID}
						placeholder='Enter student email ID'
						placeholderTextColor={COLORS?.placeholder}
					/>
					<View style={{ flexDirection: 'row' }}>
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
								Course:
							</Text>
							<TextInput style={styles.smallDropdown} value={course} editable={false} />
						</View>
						<View style={{ marginLeft: 20 }}>
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
							<TextInput style={styles.smallDropdown} value={batch} editable={false} />
						</View>
					</View>
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
						handlePress()
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
						Add student
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
		fontFamily: FONTS?.regular,
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
	smallDropdown: {
		height: 50,
		borderColor: COLORS?.borderGrey,
		borderWidth: 1,
		width: 125,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 7,
		fontFamily: FONTS?.regular,
	},
})
