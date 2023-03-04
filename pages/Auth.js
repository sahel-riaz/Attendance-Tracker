import { Image, Text, TouchableOpacity, View } from 'react-native'

import * as LocalAuthentication from 'expo-local-authentication'

import { COLORS, FONTS } from '../styles/theme'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Path, Svg } from 'react-native-svg'

export default function Auth() {
	const navigation = useNavigation()

	const [isBiometricSupported, setIsBiometricSupported] = useState(false)
	const [isAuthenticated, setAuthenticated] = useState(false)

	async function localAuth() {
		LocalAuthentication.hasHardwareAsync()
			.then((res) => {
				setIsBiometricSupported(res)
				if (res) {
					LocalAuthentication.isEnrolledAsync().then((res) => {
						if (res) {
							LocalAuthentication.authenticateAsync().then((res) => {
								setAuthenticated(res.success)
								if (res.success) {
									navigation.navigate('Home')
								}
							})
						}
					})
				}
			})
			.catch((e) => {
				console.log(e)
			})
	}

	useEffect(() => {
		localAuth()
	}, [])

	return (
		<View style={{ flex: 1 }}>
			<View style={{ paddingTop: 80, flexDirection: 'row', padding: 20 }}>
				<View
					style={{
						position: 'absolute',
						top: 80,
						left: 0,
						right: 0,
						alignItems: 'center',
						marginBottom: 20,
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
						Authentication
					</Text>
				</View>
			</View>
			<View style={{ alignItems: 'center', marginTop: 52 }}>
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
							d='M27.5 12.1875C26.9875 12.1875 26.5625 11.7625 26.5625 11.25V8.75C26.5625 5.525 24.475 3.4375 21.25 3.4375H18.75C18.2375 3.4375 17.8125 3.0125 17.8125 2.5C17.8125 1.9875 18.2375 1.5625 18.75 1.5625H21.25C25.55 1.5625 28.4375 4.45 28.4375 8.75V11.25C28.4375 11.7625 28.0125 12.1875 27.5 12.1875ZM2.5 12.1875C1.9875 12.1875 1.5625 11.7625 1.5625 11.25V8.75C1.5625 4.45 4.45 1.5625 8.75 1.5625H11.25C11.7625 1.5625 12.1875 1.9875 12.1875 2.5C12.1875 3.0125 11.7625 3.4375 11.25 3.4375H8.75C5.525 3.4375 3.4375 5.525 3.4375 8.75V11.25C3.4375 11.7625 3.0125 12.1875 2.5 12.1875ZM21.25 28.4375H18.75C18.2375 28.4375 17.8125 28.0125 17.8125 27.5C17.8125 26.9875 18.2375 26.5625 18.75 26.5625H21.25C24.475 26.5625 26.5625 24.475 26.5625 21.25V18.75C26.5625 18.2375 26.9875 17.8125 27.5 17.8125C28.0125 17.8125 28.4375 18.2375 28.4375 18.75V21.25C28.4375 25.55 25.55 28.4375 21.25 28.4375ZM11.25 28.4375H8.75C4.45 28.4375 1.5625 25.55 1.5625 21.25V18.75C1.5625 18.2375 1.9875 17.8125 2.5 17.8125C3.0125 17.8125 3.4375 18.2375 3.4375 18.75V21.25C3.4375 24.475 5.525 26.5625 8.75 26.5625H11.25C11.7625 26.5625 12.1875 26.9875 12.1875 27.5C12.1875 28.0125 11.7625 28.4375 11.25 28.4375ZM15.0025 12.3388C14.39 12.3388 13.8775 12.8387 13.8775 13.4637V16.5513C13.8775 17.1763 14.3775 17.6762 15.0025 17.6762C15.6275 17.6762 16.1275 17.1763 16.1275 16.5513V13.4637C16.1275 12.8387 15.615 12.3388 15.0025 12.3388Z'
							fill='#294F82'
						/>
						<Path
							d='M19.415 9.24998C18.99 8.82498 18.5025 8.46248 17.9775 8.16248C17.8025 8.07498 17.615 7.98748 17.4275 7.89998C17.24 7.82498 17.0525 7.74998 16.8525 7.69998C16.6525 7.63748 16.4525 7.58748 16.2525 7.53748C16.24 7.53748 16.215 7.53748 16.2025 7.52498C15.815 7.44998 15.415 7.41248 15.015 7.41248H14.99C14.59 7.41248 14.2025 7.44998 13.815 7.52498C13.765 7.53748 13.715 7.53748 13.6775 7.56248C13.5025 7.59998 13.3275 7.63748 13.1525 7.69998C12.94 7.74998 12.7275 7.83748 12.515 7.92498C12.3525 7.99998 12.19 8.08748 12.04 8.16248C11.8525 8.26248 11.69 8.37498 11.515 8.48748C11.19 8.71248 10.8775 8.96248 10.59 9.24998C10.4525 9.38748 10.315 9.53748 10.19 9.68748C10.065 9.84998 9.94001 9.99998 9.82751 10.175C9.71501 10.3375 9.61501 10.5125 9.51501 10.6875C9.04001 11.575 8.76501 12.5875 8.76501 13.6625V16.3375C8.76501 18.5 9.86501 20.4 11.515 21.5125C11.665 21.625 11.8275 21.7125 11.99 21.8125L12.6775 22.1375C13.0275 22.275 13.39 22.3875 13.7525 22.4625C14.1525 22.5375 14.565 22.5875 14.99 22.5875H15.015C15.44 22.5875 15.8525 22.5375 16.2525 22.4625C16.6275 22.3875 16.99 22.275 17.34 22.1375C18.4936 21.6688 19.4811 20.8665 20.1759 19.8332C20.8707 18.7999 21.2412 17.5827 21.24 16.3375V13.6625C21.24 11.9375 20.54 10.375 19.415 9.24998ZM18.0025 16.55C18.0025 18.2 16.6525 19.55 15.0025 19.55C13.3525 19.55 12.0025 18.2 12.0025 16.55V13.4625C12.0025 11.8125 13.3525 10.4625 15.0025 10.4625C16.6525 10.4625 18.0025 11.8125 18.0025 13.4625V16.55Z'
							fill='#294F82'
						/>
					</Svg>
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
						alignSelf: 'center',
					}}
					onPress={() => {
						localAuth()
					}}
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
							d='M12 7.94995C10.21 7.94995 8.75 9.40995 8.75 11.2V12.8C8.75 14.59 10.21 16.05 12 16.05C13.79 16.05 15.25 14.59 15.25 12.8V11.2C15.25 9.40995 13.79 7.94995 12 7.94995ZM12.9 13.24C12.9 13.74 12.5 14.14 12 14.14C11.5 14.14 11.1 13.74 11.1 13.24V10.77C11.1 10.28 11.5 9.86995 12 9.86995C12.5 9.86995 12.9 10.27 12.9 10.77V13.24Z'
							fill='white'
						/>
						<Path
							d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.75 12.8C16.75 15.42 14.62 17.55 12 17.55C9.38 17.55 7.25 15.42 7.25 12.8V11.2C7.25 8.58 9.38 6.45 12 6.45C14.62 6.45 16.75 8.58 16.75 11.2V12.8Z'
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
						Try again!
					</Text>
				</TouchableOpacity>
			</View>
			{/* <Navbar /> */}
		</View>
	)
}
