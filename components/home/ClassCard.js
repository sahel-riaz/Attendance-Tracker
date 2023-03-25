import { View, Text, Image } from 'react-native'
import { Path, Svg } from 'react-native-svg'
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
				<Svg
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<Path
						fill-rule='evenodd'
						clip-rule='evenodd'
						d='M4 8C4 5.51472 6.01472 3.5 8.5 3.5H18.5C19.3284 3.5 20 4.17157 20 5V20C20 20.5523 19.5523 21 19 21H7.5C5.73676 21 4.27806 19.6961 4.03544 18H4V8ZM18.5 15.5H7.5C6.39543 15.5 5.5 16.3954 5.5 17.5C5.5 18.6046 6.39543 19.5 7.5 19.5H18.5V15.5ZM8.25 8C8.25 7.58579 8.58579 7.25 9 7.25H16C16.4142 7.25 16.75 7.58579 16.75 8C16.75 8.41421 16.4142 8.75 16 8.75H9C8.58579 8.75 8.25 8.41421 8.25 8ZM9 10.25C8.58579 10.25 8.25 10.5858 8.25 11C8.25 11.4142 8.58579 11.75 9 11.75H14C14.4142 11.75 14.75 11.4142 14.75 11C14.75 10.5858 14.4142 10.25 14 10.25H9Z'
						fill='#294F82'
					/>
				</Svg>
				<View style={{ paddingLeft: 10 }}>
					<Text style={{ fontFamily: FONTS?.light, fontSize: 14, lineHeight: 17 }}>
						<Text style={{ fontFamily: FONTS?.bold, fontSize: 14, lineHeight: 17 }}>{cid} </Text>
						{cname}
					</Text>
					<View style={{ flexDirection: 'row', paddingTop: 5, alignItems: 'center' }}>
						<Svg
							width='12'
							height='12'
							viewBox='0 0 12 12'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<Path
								d='M8.5 10.5V9.5C8.5 8.96957 8.28929 8.46086 7.91421 8.08579C7.53914 7.71071 7.03043 7.5 6.5 7.5H2.5C1.96957 7.5 1.46086 7.71071 1.08579 8.08579C0.710714 8.46086 0.5 8.96957 0.5 9.5V10.5'
								stroke='#80848A'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
							<Path
								d='M4.5 5.5C5.60457 5.5 6.5 4.60457 6.5 3.5C6.5 2.39543 5.60457 1.5 4.5 1.5C3.39543 1.5 2.5 2.39543 2.5 3.5C2.5 4.60457 3.39543 5.5 4.5 5.5Z'
								stroke='#80848A'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
							<Path
								d='M11.5 10.5V9.5C11.4997 9.05687 11.3522 8.62639 11.0807 8.27616C10.8092 7.92593 10.4291 7.67579 10 7.565'
								stroke='#80848A'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
							<Path
								d='M8 1.565C8.43021 1.67515 8.81152 1.92535 9.08382 2.27616C9.35612 2.62696 9.50392 3.05842 9.50392 3.5025C9.50392 3.94659 9.35612 4.37804 9.08382 4.72885C8.81152 5.07965 8.43021 5.32985 8 5.44'
								stroke='#80848A'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
						</Svg>

						<Text
							style={{ fontFamily: FONTS?.regular, fontSize: 10, lineHeight: 12, paddingLeft: 4 }}
						>
							{students_qty} students
						</Text>
					</View>
				</View>
			</View>
			<Svg
				width='24'
				height='24'
				viewBox='0 0 24 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<Path
					d='M13.4697 8.53033C13.1768 8.23744 13.1768 7.76256 13.4697 7.46967C13.7626 7.17678 14.2374 7.17678 14.5303 7.46967L18.5303 11.4697C18.8232 11.7626 18.8232 12.2374 18.5303 12.5303L14.5303 16.5303C14.2374 16.8232 13.7626 16.8232 13.4697 16.5303C13.1768 16.2374 13.1768 15.7626 13.4697 15.4697L16.1893 12.75H6.5C6.08579 12.75 5.75 12.4142 5.75 12C5.75 11.5858 6.08579 11.25 6.5 11.25H16.1893L13.4697 8.53033Z'
					fill='#80848A'
				/>
			</Svg>
		</View>
	)
}
