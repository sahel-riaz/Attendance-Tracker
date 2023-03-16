import { View, Text, Image } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import { COLORS, FONTS } from '../../styles/theme'

export default function StatCard({ val, border_color, back_color, path_d, fill }) {
	return (
		<View
			style={{
				width: 74,
				height: 52,
				borderWidth: 3,
				borderColor: border_color,
				borderRadius: 10,
				backgroundColor: back_color,
				alignItems: 'center',
				flexDirection: 'row',
				gap: 8,
				justifyContent: 'center',
			}}
		>
            <Svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d={path_d} fill={fill} />
            </Svg>

			<Text
				style={{
					fontFamily: FONTS?.regular,
					fontWeight: 500,
					fontSize: 16,
					lineHeight: 19.2,
					marginLeft: 8,
				}}
			>
				{val}
			</Text>
		</View>
	)
}
