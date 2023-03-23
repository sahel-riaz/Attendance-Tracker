import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native'
import ClassCard from '../components/home/ClassCard'
import HomeCard from '../components/home/HomeCard'
import Navbar from '../components/Navbar'

import * as LocalAuthentication from 'expo-local-authentication'

import { COLORS, FONTS } from '../styles/theme'
import { StatusBar } from 'expo-status-bar'

export default function Home() {
	return (
		<SafeAreaView style={{ backgroundColor: COLORS?.bg, flex: 1 }}>
			<StatusBar />
			<View style={{ paddingTop: 80 }}>
				<View style={{ paddingLeft: 30, paddingRight: 30 }}>
					<Text style={{ fontSize: 32, lineHeight: 32, fontFamily: FONTS?.bold }}>09:12 am</Text>
					<Text style={{ paddingTop: 6 }}>
						Good morning,
						<Text style={{ fontFamily: FONTS?.bold, fontSize: 16, lineHeight: 19 }}>
							&nbsp;Aadhavan&nbsp;
						</Text>
						👋
					</Text>
				</View>
				<View
					style={{
						paddingTop: 30,
						paddingLeft: 30,
						paddingRight: 30,
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<HomeCard />
					<HomeCard />
				</View>
				<ScrollView
					style={{
						backgroundColor: COLORS?.white,
						marginTop: 28,
						borderRadius: 20,
						paddingTop: 40,
						paddingLeft: 30,
						paddingRight: 30,
					}}
				>
					<Text style={{ fontFamily: FONTS?.bold, fontSize: 18, lineHeight: 22, marginBottom: 22 }}>
						Courses 💼
					</Text>
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<ClassCard />
					<View style={{ height: 400 }}></View>
				</ScrollView>
			</View>
			<Navbar />
		</SafeAreaView>
	)
}
