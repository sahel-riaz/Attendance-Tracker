import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import Navbar from '../components/Navbar'
import { StyleSheet } from 'react-native'

import { COLORS, FONTS } from '../styles/theme'
import { useState } from 'react'
import { Path, Svg } from 'react-native-svg'

import { useNavigation } from '@react-navigation/native'

export default function Mark() {
	const navigation = useNavigation()

	const data = [
		{ label: 'Item 1', value: '1' },
		{ label: 'Item 2', value: '2' },
		{ label: 'Item 3', value: '3' },
		{ label: 'Item 4', value: '4' },
		{ label: 'Item 5', value: '5' },
		{ label: 'Item 6', value: '6' },
		{ label: 'Item 7', value: '7' },
		{ label: 'Item 8', value: '8' },
	]
	const [course, setCourse] = useState(null)
	const [classs, setClasss] = useState(null)

	return (
		<View style={{ flex: 1 }}>
			<View style={{ paddingTop: 80, flexDirection: 'row', padding: 20 }}>
				<Svg
					width='20'
					height='20'
					viewBox='0 0 16 17'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					onPress={() => navigation.navigate('Home')}
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
						data={data}
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
						data={data}
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
					onPress={() => {}}
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
