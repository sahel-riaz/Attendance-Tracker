import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Path, Svg } from 'react-native-svg'
import { COLORS, FONTS } from '../styles/theme'
import { useNavigation } from '@react-navigation/native'
import { jsonToCSV } from 'react-native-csv'
import { StorageAccessFramework } from 'expo-file-system'

export default function ImportInfo() {
	const navigation = useNavigation()

	async function handlePress() {
		const fileName = 'importFileFormat'

		var student = [
			['B200046CS', 'Aadhavan Paavai Lenin', 'aadhavan_b200046cs@nitc.ac.in'],
			['B200048CS', 'Anagh Deepak', 'anagh_b200048cs@nitc.ac.in'],
			['B200052CS', 'Nandita Menon', 'nandita_b200052cs@nitc.ac.in'],
			['B200702CS', 'Pavanitha B', 'pavanitha_b200702cs@nitc.ac.in'],
			['B200056CS', 'Sahel Nadalackal Riaz', 'sahel_b200056cs@nitc.ac.in'],
		]

		StorageAccessFramework.requestDirectoryPermissionsAsync()
			.then((res) => {
				const folderLocation = res['directoryUri']
				const results = jsonToCSV({
					data: student,
				})
				StorageAccessFramework.createFileAsync(folderLocation, fileName, 'text/csv').then((res) => {
					StorageAccessFramework.writeAsStringAsync(res, results)
				})
			})
			.catch((e) => {
				console.log(e)
			})
	}

	return (
		<View style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}>
			<StatusBar style='dark' />

			<View style={{ paddingTop: 60, flexDirection: 'row' }}>
				<TouchableOpacity
					style={{ padding: 20, paddingLeft: 0 }}
					onPress={() => navigation.push('Import')}
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
						How to import roll list?
					</Text>
				</View>
			</View>
			<ScrollView style={{ marginTop: 30, marginBottom: 20 }}>
				<View>
					<Text
						style={{
							fontFamily: FONTS?.bold,
							fontSize: 16,
							lineHeight: 19,
						}}
					>
						Course ID:
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 8,
						}}
					>
						Enter the course ID for the particular course.{'\n'}
						eg. CS4012D
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
						}}
					>
						If you want to add another class to the same course, make sure to enter the course ID
						correctly.
					</Text>
				</View>

				<View style={{ marginTop: 30 }}>
					<Text
						style={{
							fontFamily: FONTS?.bold,
							fontSize: 16,
							lineHeight: 19,
						}}
					>
						Course name:
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 8,
						}}
					>
						Enter the course name for the particular course.{'\n'}
						eg. Software Engineering
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
						}}
					>
						If you are adding a class to a pre-existing course, this field will be filled
						automatically when the course ID is entered.
					</Text>
				</View>

				<View style={{ marginTop: 30 }}>
					<Text
						style={{
							fontFamily: FONTS?.bold,
							fontSize: 16,
							lineHeight: 19,
						}}
					>
						Class name:
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 8,
						}}
					>
						Enter the class name for the particular course.{'\n'}
						eg. CS01
					</Text>
				</View>

				<View style={{ marginTop: 30 }}>
					<Text
						style={{
							fontFamily: FONTS?.bold,
							fontSize: 16,
							lineHeight: 19,
						}}
					>
						Add file:
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 8,
						}}
					>
						Supported file format: CSV{'\n'}
						Content of the CSV file should be of format mentioned below:
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 12,
						}}
					>
						|&nbsp;&nbsp;&nbsp;&nbsp;Roll
						no.&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;Student
						Name&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;Email ID&nbsp;&nbsp;&nbsp;&nbsp;|
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 12,
						}}
					>
						Make sure the CSV file has no headers. It should just be a list of students' details.
					</Text>
					<Text
						style={{
							fontFamily: FONTS?.regular,
							fontSize: 14,
							lineHeight: 20,
							marginTop: 6,
							// marginBottom: 20,
						}}
					>
						The file above contains the template that is supported by the app.
					</Text>
				</View>
			</ScrollView>
			<TouchableOpacity
				style={{
					height: 43,
					width: '100%',
					backgroundColor: COLORS?.blue,
					alignItems: 'center',
					borderRadius: 10,
					flexDirection: 'row',
					justifyContent: 'center',
					alignSelf: 'center',
					marginBottom: 20,
				}}
				onPress={handlePress}
				activeOpacity={0.7}
			>
				<Svg
					width='20'
					height='19'
					viewBox='0 0 20 19'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<Path
						d='M16.729 8.06709H14.4411C12.5648 8.06709 11.0369 6.53918 11.0369 4.66293V2.37501C11.0369 1.93959 10.6807 1.58334 10.2453 1.58334H6.88859C4.45025 1.58334 2.479 3.16668 2.479 5.99293V13.0071C2.479 15.8333 4.45025 17.4167 6.88859 17.4167H13.1111C15.5494 17.4167 17.5207 15.8333 17.5207 13.0071V8.85876C17.5207 8.42334 17.1644 8.06709 16.729 8.06709ZM10.2215 12.4925L8.63817 14.0758C8.58275 14.1313 8.5115 14.1788 8.44025 14.2025C8.37072 14.2344 8.2951 14.251 8.21859 14.251C8.14207 14.251 8.06646 14.2344 7.99692 14.2025C7.93142 14.1751 7.87217 14.1347 7.82275 14.0838C7.81484 14.0758 7.80692 14.0758 7.80692 14.0679L6.22359 12.4846C6.11317 12.3729 6.05124 12.2221 6.05124 12.065C6.05124 11.9079 6.11317 11.7572 6.22359 11.6454C6.45317 11.4158 6.83317 11.4158 7.06275 11.6454L7.62484 12.2233V8.90626C7.62484 8.58168 7.894 8.31251 8.21859 8.31251C8.54317 8.31251 8.81234 8.58168 8.81234 8.90626V12.2233L9.38234 11.6533C9.61192 11.4238 9.99192 11.4238 10.2215 11.6533C10.4511 11.8829 10.4511 12.2629 10.2215 12.4925Z'
						fill='white'
					/>
					<Path
						d='M14.2987 6.9746C15.0507 6.98252 16.0957 6.98251 16.9903 6.98251C17.4416 6.98251 17.6791 6.4521 17.3624 6.13543C16.2224 4.98751 14.1799 2.92126 13.0082 1.7496C12.6837 1.42501 12.1216 1.64668 12.1216 2.09793V4.86085C12.1216 6.01668 13.1032 6.9746 14.2987 6.9746Z'
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
					Sample File
				</Text>
			</TouchableOpacity>
		</View>
	)
}
