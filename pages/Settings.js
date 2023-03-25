import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, TextInput, StyleSheet, Text } from 'react-native'
import { COLORS, FONTS } from '../styles/theme'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Path, Svg } from 'react-native-svg'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Settings() {
	const navigation = useNavigation()

	const [name, setName] = useState(null)

	useEffect(() => {
		async function fetch() {
			AsyncStorage.getItem('settings').then((res) => {
				setName(res)
			})
		}
		fetch()
	}, [])

	async function handlePress() {
		AsyncStorage.setItem('settings', name).then(() => {
			navigation.push('Home')
		})
	}

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
						Settings
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
							d='M25.125 11.5263C22.8625 11.5263 21.9375 9.92626 23.0625 7.96376C23.7125 6.82626 23.325 5.37626 22.1875 4.72626L20.025 3.48876C19.0375 2.90126 17.7625 3.25126 17.175 4.23876L17.0375 4.47626C15.9125 6.43876 14.0625 6.43876 12.925 4.47626L12.7875 4.23876C12.6528 4.00249 12.4724 3.79537 12.2568 3.62947C12.0413 3.46356 11.7949 3.34218 11.532 3.27239C11.2691 3.2026 10.995 3.18578 10.7255 3.22293C10.4561 3.26008 10.1967 3.35044 9.9625 3.48876L7.8 4.72626C6.6625 5.37626 6.275 6.83876 6.925 7.97626C8.0625 9.92626 7.1375 11.5263 4.875 11.5263C3.575 11.5263 2.5 12.5888 2.5 13.9013V16.1013C2.5 17.4013 3.5625 18.4763 4.875 18.4763C7.1375 18.4763 8.0625 20.0763 6.925 22.0388C6.275 23.1763 6.6625 24.6263 7.8 25.2763L9.9625 26.5138C10.95 27.1013 12.225 26.7513 12.8125 25.7638L12.95 25.5263C14.075 23.5638 15.925 23.5638 17.0625 25.5263L17.2 25.7638C17.7875 26.7513 19.0625 27.1013 20.05 26.5138L22.2125 25.2763C23.35 24.6263 23.7375 23.1638 23.0875 22.0388C21.95 20.0763 22.875 18.4763 25.1375 18.4763C26.4375 18.4763 27.5125 17.4138 27.5125 16.1013V13.9013C27.5059 13.2712 27.2519 12.6691 26.8052 12.2247C26.3585 11.7804 25.755 11.5295 25.125 11.5263ZM15 19.0638C12.7625 19.0638 10.9375 17.2388 10.9375 15.0013C10.9375 12.7638 12.7625 10.9388 15 10.9388C17.2375 10.9388 19.0625 12.7638 19.0625 15.0013C19.0625 17.2388 17.2375 19.0638 15 19.0638Z'
							fill='#294F82'
						/>
					</Svg>
				</View>
				<View style={{ marginBottom: 40 }}>
					<Text
						style={{
							fontFamily: FONTS?.bold,
							fontSize: 16,
							lineHeight: 19,
							marginBottom: 6,
							marginTop: 70,
						}}
					>
						Name of faculty:
					</Text>
					<TextInput
						style={styles.dropdown}
						value={name}
						onChangeText={setName}
						placeholder='Enter your name'
						placeholderTextColor={COLORS?.placeholder}
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
						Save
					</Text>
				</TouchableOpacity>
			</View>
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
