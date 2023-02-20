import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Navbar from '../components/Navbar'

import { COLORS, FONTS } from '../styles/theme'
import { useState } from 'react'
import { Path, Svg } from 'react-native-svg'

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
			<Text style={{ fontFamily: FONTS?.bold, fontSize: 16, paddingLeft: 24, marginTop: 25 }}>
				Students:
			</Text>
			<View style={{ alignItems: 'center', paddingLeft: 24, paddingRight: 24, marginTop: 10 }}>
				<TouchableOpacity
					style={{
						marginTop: 8,
						paddingLeft: 16,
						paddingBottom: 12,
						paddingTop: 12,
						borderColor: COLORS?.borderGrey,
						borderWidth: 1,
						borderRadius: 10,
						width: '100%',
					}}
					activeOpacity={0.4}
					onPress={() => navigation.navigate('Student')}
				>
					<Text style={{ fontSize: 18, fontFamily: FONTS?.regular }}>Aadhavan Paavai Lenin</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						marginTop: 8,
						paddingLeft: 16,
						paddingBottom: 12,
						paddingTop: 12,
						borderRadius: 10,
						backgroundColor: COLORS?.yellow,
						width: '100%',
					}}
					activeOpacity={0.4}
					onPress={() => navigation.navigate('Student')}
				>
					<Text style={{ fontSize: 18, fontFamily: FONTS?.regular }}>Aadhavan Paavai Lenin</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						marginTop: 8,
						paddingLeft: 16,
						paddingBottom: 12,
						paddingTop: 12,
						borderRadius: 10,
						backgroundColor: COLORS?.lightRed,
						width: '100%',
					}}
					activeOpacity={0.4}
					onPress={() => navigation.navigate('Student')}
				>
					<Text style={{ fontSize: 18, fontFamily: FONTS?.regular }}>Aadhavan Paavai Lenin</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						marginTop: 8,
						paddingLeft: 16,
						paddingBottom: 12,
						paddingTop: 12,
						borderRadius: 10,
						backgroundColor: COLORS?.green,
						width: '100%',
					}}
					activeOpacity={0.4}
					onPress={() => navigation.navigate('Student')}
				>
					<Text style={{ fontSize: 18, fontFamily: FONTS?.regular }}>Aadhavan Paavai Lenin</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						marginTop: 20,
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
					onPress={() => navigation.navigate('AddStudent')}
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
						Add student to class
					</Text>
				</TouchableOpacity>
			</View>
			<Navbar />
		</View>
	)
}
