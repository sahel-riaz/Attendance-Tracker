import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Navbar from '../components/Navbar'

import { COLORS, FONTS } from '../styles/theme'
import { useEffect, useState } from 'react'
import { Path, Svg } from 'react-native-svg'

import { useNavigation } from '@react-navigation/native'

export default function Test() {
	const navigation = useNavigation()
	return (
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
					borderWidth: 1,
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
				</View>
			</View>
		</View>
	)
}
