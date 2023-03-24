import { View, Text, Image } from 'react-native'
import { COLORS, FONTS } from '../../styles/theme'

export default function ClassCard({ cid,cname,students_qty }) {
	return (
		<View
			style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				paddingTop: 10,
				paddingBottom: 10,
				borderBottomColor: COLORS?.borderGrey,
				borderBottomWidth: 1,
			}}
		>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Image styles={{ height: 24, width: 24 }} source={require('./icons/book.png')} />
				<View style={{ paddingLeft: 10 }}>
					<Text style={{ fontFamily: FONTS?.light, fontSize: 14, lineHeight: 17 }}>
						<Text style={{ fontFamily: FONTS?.bold, fontSize: 14, lineHeight: 17 }}>{cid} </Text>
						{cname}
					</Text>
					<View style={{ flexDirection: 'row', paddingTop: 5, alignItems: 'center' }}>
						<Image styles={{ height: 12, width: 12 }} source={require('./icons/users.png')} />
						<Text
							style={{ fontFamily: FONTS?.regular, fontSize: 10, lineHeight: 12, paddingLeft: 4 }}
						>
							{students_qty} students
						</Text>
					</View>
				</View>
			</View>
			<Image style={{ height: 24, width: 24 }} source={require('./icons/arrowRight.png')} />
		</View>
	)
}
