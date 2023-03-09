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
		<View style={{flex:1}}>
			{/* Back Arrow */}
			<View style={{paddingTop:80, flexDirection:'row', padding:20}}>
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
			</View>
		</View>
	)
}

