import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Navbar from '../components/Navbar'

import { COLORS, FONTS } from '../styles/theme'
import { useEffect, useState } from 'react'
import { Path, Svg } from 'react-native-svg'

import { useNavigation } from '@react-navigation/native'

export default function Test() {
	const navigation = useNavigation()
	return (
		<View>
			<View
				style={{
					width: 320,
					height: 436,
					paddingTop: 30,
					paddingBottom: 30,
					paddingLeft: 25,
					paddingRight: 25,
					marginTop: 50,
					marginLeft: 35,
					borderWidth: 1,
					borderColor: '#D8D8D8',
					borderRadius: 15,
				}}
			>
				<View
					style={{
						width: 270,
						height: 376,
						// borderWidth: 1,
					}}
				>
					<View>
						<Text
							style={{
								fontFamily: FONTS?.bold,
								color: COLORS?.selectGrey,
								fontWeight: 700,
								fontSize: 16,
								lineHeight: 19,
							}}
						>
							Student Name:
						</Text>
						<Text
							style={{
								fontFamily: FONTS?.bold,
								color: COLORS?.selectblack,
								fontWeight: 700,
								fontSize: 16,
								lineHeight: 19,
							}}
						>
							Pavanitha B
						</Text>
					</View>
					<View style={{ marginTop: 15 }}>
						<Text
							style={{
								fontFamily: FONTS?.bold,
								color: COLORS?.selectGrey,
								fontWeight: 700,
								fontSize: 16,
								lineHeight: 19,
							}}
						>
							Roll no:
						</Text>
						<Text
							style={{
								fontFamily: FONTS?.bold,
								color: COLORS?.selectblack,
								fontWeight: 700,
								fontSize: 16,
								lineHeight: 19,
							}}
						>
							B200702CS
						</Text>
					</View>
					<View style={{ marginTop: 15 }}>
						<Text
							style={{
								fontFamily: FONTS?.bold,
								color: COLORS?.selectGrey,
								fontWeight: 700,
								fontSize: 16,
								lineHeight: 19,
							}}
						>
							Stats:
						</Text>
						<View
							style={{
								width: 270,
								height: 70,
								marginTop: 5,
								flexDirection: 'row',
								justifyContent: 'space-between',
							}}
						>
							<View
								style={{
									width: 82,
									height: 70,
									padding: 12,
									borderwidth: 1,
									borderRadius: 7,
									borderColor: '#66DDAA',
									backgroundColor: '#66DDAA',
								}}
							>
								<View style={{ height: 46, width: 58, alignItems: 'center' }}>
									<View>
										<Text>7</Text>
									</View>
									<View style={{ marginTop: 3 }}>
										<Text>Present</Text>
									</View>
								</View>
							</View>
							<View
								style={{
									width: 82,
									height: 70,
									padding: 12,
									borderwidth: 1,
									borderRadius: 7,
									borderColor: '#FA8072',
									backgroundColor: '#FA8072',
								}}
							>
								<View style={{ height: 46, width: 58, alignItems: 'center' }}>
									<View>
										<Text>3</Text>
									</View>
									<View style={{ marginTop: 3 }}>
										<Text>Absent</Text>
									</View>
								</View>
							</View>
							<View
								style={{
									width: 82,
									height: 70,
									padding: 12,
									borderwidth: 1,
									borderRadius: 7,
									borderColor: '#FFD800',
									backgroundColor: '#FFD800',
								}}
							>
								<View style={{ height: 46, width: 58, alignItems: 'center' }}>
									<View>
										<Text>2</Text>
									</View>
									<View style={{ marginTop: 3 }}>
										<Text>Late</Text>
									</View>
								</View>
							</View>
						</View>
						<View
							style={{
								width: 270,
								height: 40,
								marginTop: 12,
								padding: 12,
								backgroundColor: '#D9D9D9',
								alignItems: 'center',
							}}
						>
							<Text
								style={{
									fontFamily: FONTS?.bold,
									color: COLORS?.selectblack,
									fontWeight: 600,
									fontSize: 14,
									lineHeight: 16.8,
								}}
							>
								Out of 10 Classes
							</Text>
						</View>
					</View>
					<View
						style={{
							width: 211,
							height: 17,
							marginTop: 19,
							flexDirection: 'row',
						}}
					>
						<View
							style={{
								marginRight: 7,
							}}
						>
							<Svg
								width='17'
								height='15'
								viewBox='0 0 17 15'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<Path
									d='M8.50005 5.37501V8.91668M8.50005 14.1654H4.20755C1.74964 14.1654 0.722554 12.4088 1.91255 10.2625L4.12255 6.28168L6.20505 2.54168C7.46589 0.267927 9.53422 0.267927 10.7951 2.54168L12.8776 6.28876L15.0876 10.2696C16.2776 12.4158 15.2434 14.1725 12.7926 14.1725H8.50005V14.1654Z'
									stroke='#FF0000'
									stroke-width='1.5'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
							</Svg>
						</View>
						<View
							style={{
								width: '100%',
								height: 17,
							}}
						>
							<Text
								style={{
									fontFamily: FONTS?.bold,
									color: COLORS?.red,
									fontWeight: 700,
									fontSize: 14,
									lineHeight: 16.8,
								}}
							>
								Absent for 3 consecutive days
							</Text>
						</View>
					</View>
					<View
						style={{
							width: 270,
							height: 43,
							marginTop: 30,
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<View
							style={{
								width: 185,
								height: 43,
								borderRadius: 10,
								paddingTop: 12,
								paddingRight: 30,
								paddingBottom: 12,
								paddingLeft: 12,
								backgroundColor: '#294F82',
								flexDirection: 'row',
							}}
						>
							<View
								style={{
									width: 19,
									height: 19,
									marginLeft: 30,
								}}
							>
								<Svg
									width='19'
									height='19'
									viewBox='0 0 19 19'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<Path
										d='M12.7775 2.34331L5.62872 4.71831C0.823304 6.32539 0.823304 8.94581 5.62872 10.545L7.75039 11.2496L8.45497 13.3712C10.0541 18.1766 12.6825 18.1766 14.2816 13.3712L16.6646 6.23039C17.7254 3.02414 15.9837 1.27456 12.7775 2.34331ZM13.0308 6.60247L10.0225 9.62664C9.90372 9.74539 9.7533 9.80081 9.60289 9.80081C9.45247 9.80081 9.30205 9.74539 9.1833 9.62664C9.07288 9.51491 9.01096 9.36415 9.01096 9.20706C9.01096 9.04997 9.07288 8.89921 9.1833 8.78747L12.1916 5.76331C12.4212 5.53372 12.8012 5.53372 13.0308 5.76331C13.2604 5.99289 13.2604 6.37289 13.0308 6.60247Z'
										fill='white'
									/>
								</Svg>
							</View>
							<View
								style={{
									width: 96,
									height: 19,
									marginLeft: 10,
								}}
							>
								<Text
									style={{
										fontFamily: FONTS?.bold,
										color: COLORS?.white,
										fontWeight: 500,
										fontSize: 16,
										lineHeight: 19.2,
									}}
								>
									Email student
								</Text>
							</View>
						</View>
						<View
							style={{
								width: 43,
								height: 43,
								marginLeft: 42,
								backgroundColor: '#FF0000',
								borderRadius: 10,
								paddingTop: 12,
								paddingRight: 0,
								paddingBottom: 12,
								paddingLeft: 0,
								alignItems: 'center',
							}}
						>
							<Svg
								width='17'
								height='19'
								viewBox='0 0 17 19'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<Path
									d='M15.6804 4.1404C14.4059 4.01373 13.1313 3.91873 11.8488 3.84748V3.83956L11.6746 2.8104C11.5559 2.08206 11.3817 0.989563 9.52919 0.989563H7.45502C5.61044 0.989563 5.43627 2.03456 5.30961 2.80248L5.14336 3.81581C4.40711 3.86331 3.67086 3.91081 2.93461 3.98206L1.31961 4.1404C0.987106 4.17206 0.749606 4.46498 0.781273 4.78956C0.81294 5.11415 1.09794 5.35165 1.43044 5.31998L3.04544 5.16165C7.19377 4.74998 11.3738 4.90831 15.5696 5.3279H15.6329C15.9338 5.3279 16.195 5.09831 16.2267 4.78956C16.2386 4.63142 16.1881 4.4749 16.086 4.35355C15.9839 4.2322 15.8383 4.15568 15.6804 4.1404ZM14.2238 6.44415C14.0338 6.24623 13.7725 6.1354 13.5034 6.1354H3.49669C3.22752 6.1354 2.95836 6.24623 2.77627 6.44415C2.59419 6.64206 2.49127 6.91123 2.50711 7.18831L2.99794 15.3108C3.08502 16.5141 3.19586 18.0183 5.95877 18.0183H11.0413C13.8042 18.0183 13.915 16.5221 14.0021 15.3108L14.4929 7.19623C14.5088 6.91123 14.4059 6.64206 14.2238 6.44415ZM9.81419 14.0521H7.17794C6.85336 14.0521 6.58419 13.7829 6.58419 13.4583C6.58419 13.1337 6.85336 12.8646 7.17794 12.8646H9.81419C10.1388 12.8646 10.4079 13.1337 10.4079 13.4583C10.4079 13.7829 10.1388 14.0521 9.81419 14.0521ZM10.4792 10.8854H6.52086C6.19627 10.8854 5.92711 10.6162 5.92711 10.2916C5.92711 9.96706 6.19627 9.6979 6.52086 9.6979H10.4792C10.8038 9.6979 11.0729 9.96706 11.0729 10.2916C11.0729 10.6162 10.8038 10.8854 10.4792 10.8854Z'
									fill='white'
								/>
							</Svg>
						</View>
					</View>
				</View>
			</View>
			<View
				style={{
					width: 320,
					height: 43,
					marginTop: 30,
					marginLeft: 35,
					// borderColor: '#D8D8D8',
					// borderWidth: 1,
					flexDirection: 'row',
				}}
			>
				<View
					style={{
						width: 150,
						height: 43,
						paddingTop: 12,
						paddingRight: 0,
						paddingBottom: 12,
						paddingLeft: 0,
						borderColor: '#D8D8D8',
						borderRadius: 12,
						borderwidth: 1,
						backgroundColor: '#FFFFFF',
						alignItems: 'center',
					}}
				>
					<Text>Previous</Text>
				</View>
				<View
					style={{
						width: 150,
						height: 43,
						paddingTop: 12,
						paddingRight: 0,
						paddingBottom: 12,
						paddingLeft: 0,
						borderColor: '#D8D8D8',
						borderRadius: 12,
						borderwidth: 1,
						backgroundColor: '#FFFFFF',
						marginLeft: 20,
						alignItems: 'center',
					}}
				>
					<Text>Next</Text>
				</View>
			</View>
		</View>
	)
}
