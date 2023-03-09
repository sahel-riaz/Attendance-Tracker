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
	const [courseID, setCourseID] = useState ('')
	const [courseName, setCourseName] = useState ('')
	const [classs, setClasss] = useState ('')
	
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
					New Import Data
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
				{/* Course ID */}
				<View>
					<Text style={
						{
							fontFamily:FONTS?.bold,
							fontSize:16,
							lineHeight:19,
							marginTop:70,
							marginBottom:6
						}
					}>
						Course ID:
					</Text>
					<TextInput style={styles.dropdown} value={courseID} onChangeText={setCourseID}/>
				</View>
				<View>
					<Text style={
						{
							fontFamily:FONTS?.bold,
							fontSize:16,
							lineHeight:19,
							marginTop:15,
							marginBottom:6
						}
					}>
						Course Name:
					</Text>
					<TextInput style={styles.dropdown} value={courseName} onChangeText={setCourseName}/>
				</View>
				<View>
					<Text style={
						{
							fontFamily:FONTS?.bold,
							fontSize:16,
							lineHeight:19,
							marginTop:15,
							marginBottom:6
						}
					}>
						Class:
					</Text>
					<TextInput style={styles.dropdown} value={classs} onChangeText={setClasss}/>
				</View>
				{/* Import Button */}
				<View>
					<View style={
						{
							marginTop:40,
							flexDirection:'row',
							backgroundColor:'#294F82',
							borderRadius:10,
							padding:45,
							paddingTop:12,
							paddingBottom:12,
							
						}
					}>
						<Svg
							width='19'
							height='19'
							viewBox='0 0 19 19'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<Path
								d='M12.8171 1.58331H6.18293C3.30126 1.58331 1.58334 3.30123 1.58334 6.1829V12.8091C1.58334 15.6987 3.30126 17.4166 6.18293 17.4166H12.8092C15.6908 17.4166 17.4088 15.6987 17.4088 12.8171V6.1829C17.4167 3.30123 15.6988 1.58331 12.8171 1.58331ZM12.6667 10.0937H10.0938V12.6666C10.0938 12.9912 9.82459 13.2604 9.50001 13.2604C9.17543 13.2604 8.90626 12.9912 8.90626 12.6666V10.0937H6.33334C6.00876 10.0937 5.73959 9.82456 5.73959 9.49998C5.73959 9.1754 6.00876 8.90623 6.33334 8.90623H8.90626V6.33331C8.90626 6.00873 9.17543 5.73956 9.50001 5.73956C9.82459 5.73956 10.0938 6.00873 10.0938 6.33331V8.90623H12.6667C12.9913 8.90623 13.2604 9.1754 13.2604 9.49998C13.2604 9.82456 12.9913 10.0937 12.6667 10.0937Z'
								fill='white'
							/>
						</Svg>
						<Text style={
							{
								fontFamily:FONTS?.bold,
								fontSize:16,
								fontWeight:500,
								lineHeight:19,
								color:'white',
								marginLeft:10,

							}
						}>
							Import Data
						</Text>
					</View>
				</View>
			</View>
		</View>
	)
}

const styles=StyleSheet.create({
	dropdown: {
		height:50,
		width:270,
		paddingLeft:10,
		paddingRight:10,
		borderColor:COLORS?.borderGrey,
		borderWidth:1,
		borderRadius:7,
	}
})
