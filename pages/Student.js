import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Navbar from '../components/Navbar'

import { COLORS, FONTS } from '../styles/theme'
import { useState } from 'react'
import { Path, Svg, Defs, G, Rect, ClipPath } from 'react-native-svg'

import { useNavigation } from '@react-navigation/native'

export default function Mark() {
	const navigation = useNavigation()

	return (
		<View style={{ flex: 1 }}>
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
						Mark attendance
					</Text>
				</View>
			</View>

			<View
				style={{
					marginLeft: 24,
					marginRight: 24,
					marginTop: 32,
					borderColor: COLORS?.borderGrey,
					borderWidth: 1,
					borderRadius: 15,
					height: 460,
					paddingTop: 50,
					paddingLeft: 24,
					paddingRight: 24,
				}}
			>
				<View style={{}}>
					<Text style={{ fontFamily: FONTS?.bold, color: COLORS?.selectGrey, fontSize: 16 }}>
						Student name:
					</Text>
					<Text style={{ marginTop: 5, fontFamily: FONTS?.bold, fontSize: 16 }}>
						Aadhavan Paavai Lenin
					</Text>
				</View>
				<View style={{ marginTop: 20 }}>
					<Text style={{ fontFamily: FONTS?.bold, color: COLORS?.selectGrey, fontSize: 16 }}>
						Roll no:
					</Text>
					<Text style={{ marginTop: 5, fontFamily: FONTS?.bold, fontSize: 16 }}>B200046CS</Text>
				</View>
				<View style={{ marginTop: 20 }}>
					<Text style={{ fontFamily: FONTS?.bold, color: COLORS?.selectGrey, fontSize: 16 }}>
						Stats:
					</Text>
					<View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: COLORS?.green,
								borderRadius: 7,
								width: 82,
								height: 70,
							}}
						>
							<Text style={{ fontFamily: FONTS?.bold, fontSize: 22 }}>7</Text>
							<Text style={{ fontFamily: FONTS?.bold, fontSize: 14 }}>Present</Text>
						</View>
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: COLORS?.lightRed,
								borderRadius: 7,
								width: 82,
								height: 70,
							}}
						>
							<Text style={{ fontFamily: FONTS?.bold, fontSize: 22 }}>3</Text>
							<Text style={{ fontFamily: FONTS?.bold, fontSize: 14 }}>Absent</Text>
						</View>
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: COLORS?.yellow,
								borderRadius: 7,
								width: 82,
								height: 70,
							}}
						>
							<Text style={{ fontFamily: FONTS?.bold, fontSize: 22 }}>2</Text>
							<Text style={{ fontFamily: FONTS?.bold, fontSize: 14 }}>Late</Text>
						</View>
					</View>
					<View
						style={{
							backgroundColor: COLORS?.borderGrey,
							marginTop: 10,
							justifyContent: 'center',
							borderRadius: 7,
							alignItems: 'center',
							height: 40,
						}}
					>
						<Text style={{ fontFamily: FONTS?.bold, fontSize: 14 }}>Out of 10 classes</Text>
					</View>
				</View>
				<View style={{ flexDirection: 'row', marginTop: 25 }}>
					<Svg
						width='17'
						height='17'
						viewBox='0 0 17 17'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<Path
							d='M8.50005 6.37495V9.91662M8.50005 15.1654H4.20755C1.74964 15.1654 0.722554 13.4087 1.91255 11.2624L4.12255 7.28162L6.20505 3.54162C7.46589 1.26787 9.53422 1.26787 10.7951 3.54162L12.8776 7.2887L15.0876 11.2695C16.2776 13.4158 15.2434 15.1724 12.7926 15.1724H8.50005V15.1654Z'
							stroke='#FF0000'
							stroke-width='1.5'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
						<Path
							d='M8.49646 12.0416H8.50283'
							stroke='#FF0000'
							stroke-width='2'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
					</Svg>

					<Text style={{ paddingLeft: 7, fontFamily: FONTS?.bold, color: COLORS?.red }}>
						Absent for 3 consecutive days
					</Text>
				</View>
			</View>
			<Navbar />
		</View>
	)
}
