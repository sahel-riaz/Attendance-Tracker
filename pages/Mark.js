import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import Navbar from '../components/Navbar'
import { StyleSheet } from 'react-native'

import { COLORS, FONTS } from '../styles/theme'
import { useState } from 'react'
import { Path, Svg } from 'react-native-svg'

export default function Mark() {
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

	var date = new Date().getDate()
	var month = new Date().getMonth() + 1
	var year = new Date().getFullYear()

	return (
		<View style={{ flex: 1 }}>
			<View style={{ paddingTop: 80, flexDirection: 'row', padding: 20 }}>
				<Image style={{}} source={require('./icons/arrowLeft.png')} />
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
						Mark attendance
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
						renderRightIcon={() => <Image source={require('./icons/arrowDown.png')} />}
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
						renderRightIcon={() => <Image source={require('./icons/arrowDown.png')} />}
					/>
				</View>
				<TouchableOpacity //apply button -> send date also
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
						console.log(date + '/' + month + '/' + year)
					}}
					activeOpacity={0.7}
				>
					<Image style={{ height: 19, width: 19 }} source={require('./icons/penAdd.png')} />
					<Text
						style={{
							paddingLeft: 10,
							fontFamily: FONTS?.regular,
							fontSize: 16,
							color: COLORS?.white,
						}}
					>
						Apply
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
