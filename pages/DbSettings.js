import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Path, Svg } from 'react-native-svg'

//components
import ErrorPopUp from '../components/ErrorPopUp'

//themes
import { COLORS, FONTS } from '../styles/theme'

export default function DbSettings({ route, navigation }) {
	const { course, batch } = route.params

	const [trigger, setTrigger] = useState(false)

	function handleDeleteClass() {
		AsyncStorage.getItem(course)
			.then((res) => {
				res = JSON.parse(res)
				if (Object.keys(res['batches']).length == 1) {
					AsyncStorage.removeItem(course)
				} else {
					delete res['batches'][batch]
					res = JSON.stringify(res)
					AsyncStorage.setItem(course, res)
				}
			})
			.then(() => {
				navigation.push('Db')
			})
	}

	function onCancel() {
		setTrigger(false)
	}

	function onDelete() {
		handleDeleteClass()
		setTrigger(false)
	}

	/*=============================================
	=               preventGoingBack              =
	=============================================*/

	navigation.addListener(
		'beforeRemove',
		(e) => {
			e.preventDefault()
			navigation.push('DbStudents', { course: course, batch: batch })
		},
		[navigation]
	)

	return (
		<View style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}>
			<StatusBar style='dark' />
			<ErrorPopUp
				data='Are you sure you want to delete this batch?'
				trigger={trigger}
				onCancel={onCancel}
				onDelete={onDelete}
			/>
			<View style={{ paddingTop: 60, flexDirection: 'row' }}>
				<TouchableOpacity
					style={{ padding: 20, paddingLeft: 0 }}
					onPress={() => navigation.push('DbStudents', { course: course, batch: batch })}
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
						Batch Settings
					</Text>
				</View>
			</View>
			<TouchableOpacity
				style={{
					marginTop: 40,
					paddingBottom: 12,
					paddingTop: 12,
					borderColor: COLORS?.black,
					borderStyle: 'dashed',
					borderWidth: 1,
					borderRadius: 10,
					width: '100%',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
				}}
				activeOpacity={0.4}
				onPress={() => navigation.push('AddStudent', { course: course, batch: batch })}
			>
				<Svg
					width='25'
					height='24'
					viewBox='0 0 25 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<Path
						d='M6.5 12H18.5M12.5 18V6'
						stroke='black'
						stroke-width='1.5'
						stroke-linecap='round'
						stroke-linejoin='round'
					/>
				</Svg>

				<Text style={{ fontSize: 18, fontFamily: FONTS?.regular, marginLeft: 10 }}>
					Add student to batch
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={{
					height: 43,
					width: '100%',
					backgroundColor: COLORS?.red,
					alignItems: 'center',
					borderRadius: 10,
					flexDirection: 'row',
					justifyContent: 'center',
					marginTop: 20,
				}}
				onPress={() => {
					setTrigger(true)
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
						d='M16.6803 4.1404C15.4057 4.01373 14.1312 3.91873 12.8487 3.84748V3.83956L12.6745 2.8104C12.5557 2.08206 12.3816 0.989563 10.5291 0.989563H8.4549C6.61032 0.989563 6.43615 2.03456 6.30948 2.80248L6.14323 3.81581C5.40698 3.86331 4.67073 3.91081 3.93448 3.98206L2.31948 4.1404C1.98698 4.17206 1.74948 4.46498 1.78115 4.78956C1.81282 5.11415 2.09782 5.35165 2.43032 5.31998L4.04532 5.16165C8.19365 4.74998 12.3737 4.90831 16.5695 5.3279H16.6328C16.9337 5.3279 17.1949 5.09831 17.2266 4.78956C17.2385 4.63142 17.188 4.4749 17.0859 4.35355C16.9838 4.2322 16.8382 4.15568 16.6803 4.1404ZM15.2237 6.44415C15.0337 6.24623 14.7724 6.1354 14.5032 6.1354H4.49657C4.2274 6.1354 3.95823 6.24623 3.77615 6.44415C3.59407 6.64206 3.49115 6.91123 3.50698 7.18831L3.99782 15.3108C4.0849 16.5141 4.19573 18.0183 6.95865 18.0183H12.0412C14.8041 18.0183 14.9149 16.5221 15.002 15.3108L15.4928 7.19623C15.5087 6.91123 15.4057 6.64206 15.2237 6.44415ZM10.8141 14.0521H8.17782C7.85323 14.0521 7.58407 13.7829 7.58407 13.4583C7.58407 13.1337 7.85323 12.8646 8.17782 12.8646H10.8141C11.1387 12.8646 11.4078 13.1337 11.4078 13.4583C11.4078 13.7829 11.1387 14.0521 10.8141 14.0521ZM11.4791 10.8854H7.52073C7.19615 10.8854 6.92698 10.6162 6.92698 10.2916C6.92698 9.96706 7.19615 9.6979 7.52073 9.6979H11.4791C11.8037 9.6979 12.0728 9.96706 12.0728 10.2916C12.0728 10.6162 11.8037 10.8854 11.4791 10.8854Z'
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
					Delete batch
				</Text>
			</TouchableOpacity>
		</View>
	)
}
