import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
	const [data, setData] = useState()

	async function handlePress() {
		let temp = data
		temp[0]['CS3004D'][0]['classes'][0]['CS01'][0]['date'].push('23/01/23')
		setData(temp)
		const temp_json = JSON.stringify(temp)
		await AsyncStorage.setItem('data', temp_json)
	}

	// async function test() {
	// 	try {
	// 		const temp = [
	// 			{
	// 				CS3004D: [
	// 					{
	// 						course_name: 'Software Enginnering',
	// 						classes: [
	// 							{
	// 								CS01: [
	// 									{
	// 										date: ['17/01/2023', '18/02/2023'],
	// 									},
	// 								],
	// 							},
	// 						],
	// 					},
	// 				],
	// 			},
	// 		]
	// 		const temp_json = JSON.stringify(temp)
	// 		await AsyncStorage.setItem('data', temp_json)
	// 	} catch (error) {
	// 		//
	// 	}
	// }

	async function yes() {
		try {
			const hug = await AsyncStorage.getItem('data')
			// console.log(JSON.parse(hug))
			setData(JSON.parse(hug))
			console.log(data[0]?.['CS3004D'][0]['classes'][0]['CS01'][0]['date'])
		} catch (error) {
			//
		}
	}

	return (
		<View style={styles.container}>
			<Text>Open up App.js to start working on your app!</Text>
			<StatusBar style='auto' />
			{/* <TextInput
				style={styles.input}
				onChange={(newText) => setText(newText)}
				value={text}
				placeholder='useless placeholder'
			/> */}
			{/* <Text>{data[0]?.CS3004D[0].course_name}</Text> */}
			{/* <Button onPress={test} title='press' /> */}
			<Button onPress={yes} title='press' />
			<Button onPress={handlePress} title='press' />

			{[...Array(2)].map((e, i) => (
				<View style={styles.card}>
					<Text>Aadhavan Paavai Lenin</Text>
				</View>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
	card: {
		width: 320,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#D8D8D8',
		paddingTop: 12,
		paddingBottom: 12,
		paddingLeft: 16,
	},
})

// [
// 	{
// 		CS3004D: [
// 			{
// 				course_name: 'Software Enginnering',
// 				classes: {
// 					CS01: [
// 						{
// 							date: ['17/02/2023', '18/02/2023', '19/02/2023', '20/02/2023', '21/02/2023'],
// 							students: [
// 								{
// 									name: 'Aadhavan Paavai Lenin',
// 									roll_number: 'B200046CS',
// 									attendance: [0, 0, 0, 0, 0],
// 								},
// 								{ name: 'Anagh Deepak', roll_number: 'B200048CS', attendance: [0, 0, 0, 0, 0] },
// 								{ name: 'Chacko James', roll_number: 'B200017CS', attendance: [0, 0, 0, 0, 0] },
// 							],
// 						},
// 					],
// 				},
// 			},
// 		],
// 	},
// 	{
// 		CS3002D: [
// 			{
// 				course_name: 'Compiler Design',
// 				classes: {
// 					CS01: [
// 						{
// 							date: ['17/02/2023', '18/02/2023', '19/02/2023', '20/02/2023', '21/02/2023'],
// 							students: [
// 								{
// 									name: 'Aadhavan Paavai Lenin',
// 									roll_number: 'B200046CS',
// 									attendance: [0, 0, 0, 0, 0],
// 								},
// 								{ name: 'Anagh Deepak', roll_number: 'B200048CS', attendance: [0, 0, 0, 0, 0] },
// 								{ name: 'Chacko James', roll_number: 'B200017CS', attendance: [0, 0, 0, 0, 0] },
// 							],
// 						},
// 					],
// 				},
// 			},
// 		],
// 	},
// ],
