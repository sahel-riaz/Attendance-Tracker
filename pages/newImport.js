import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Navbar from '../components/Navbar'
import { StyleSheet } from 'react-native'

import { COLORS, FONTS } from '../styles/theme'
import { useEffect, useState } from 'react'
import { Path, Svg } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native'

import { EncodingType } from 'expo-file-system'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function newImport() {
    const navigation = useNavigation()
    return (
		<View style={{ flex:1 }}>
			{/* Back Arrow */}
			<View style={{ paddingTop:80, flexDirection:'row', padding:20 }}>
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
			{/* Import Data Title */}
			</View>
			<View style={{ alignItems:'center'}}>
				<Text style={
					{
						fontFamily: FONTS?.bold,
						fontSize:16,
						color:COLORS?.subHeading,
						lineHeight: 19
					}
				}>
					Import Data
					</Text>
			</View>
			{/* Full body */}
			<View style={{ alignItems:'center', marginTop:32 }}>
				{/* Import Logo svg */}
				<View style={
					{
						width:54,
						height:54,
						borderWidth:1,
						borderColor: COLORS.borderGrey,
						borderRadius:15,
						alignItems:'center',
						justifyContent:'center'

					}
				}>
					<Svg
						width='30'
						height='30'
						viewBox='0 0 30 30'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<Path
							d='M21 11.25H15.9375V19.0625C15.9375 19.575 15.5125 20 15 20C14.4875 20 14.0625 19.575 14.0625 19.0625V11.25H9C5 11.25 2.5 13.75 2.5 17.75V20.9875C2.5 25 5 27.5 9 27.5H20.9875C24.9875 27.5 27.4875 25 27.4875 21V17.75C27.5 13.75 25 11.25 21 11.25Z'
							fill='#294F82'
						/>
						<Path
							d='M15.9375 5.70128L18.525 8.28878C18.7125 8.47628 18.95 8.56378 19.1875 8.56378C19.425 8.56378 19.6625 8.47628 19.85 8.28878C20.2125 7.92628 20.2125 7.32628 19.85 6.96378L15.6625 2.77628C15.4861 2.60193 15.248 2.50415 15 2.50415C14.752 2.50415 14.5139 2.60193 14.3375 2.77628L10.15 6.96378C9.78749 7.32628 9.78749 7.92628 10.15 8.28878C10.5125 8.65128 11.1125 8.65128 11.475 8.28878L14.0625 5.70128V11.2513H15.9375V5.70128Z'
							fill='#294F82'
						/>
					</Svg>
				</View>
			</View>
		</View>
	)
}

