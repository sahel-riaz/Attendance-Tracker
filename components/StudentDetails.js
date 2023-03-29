import { Text, TouchableOpacity, View } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import { StatusBar } from 'expo-status-bar'

//components
import Navbar from '../components/Navbar'

//themes
import { COLORS, FONTS } from '../styles/theme'
import { useNavigation } from '@react-navigation/core'

export default function StudentDetails({
	student,
	stats,
	warning,
	course,
	classs,
	date,
	handlePresent,
	handleAbsent,
	handleLate,
	handleNextStudent,
	handlePreviousStudent,
}) {
	const navigation = useNavigation()

	return (
		<View style={{ flex: 1 }}>
			<StatusBar style='dark' />
			<View style={{ paddingTop: 60, flexDirection: 'row' }}>
				<TouchableOpacity
					style={{ padding: 20 }}
					onPress={() =>
						navigation.push('Students', {
							course: course,
							classs: classs,
							date: date,
						})
					}
				>
					<Svg
						width='20'
						height='20'
						viewBox='0 0 16 17'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
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
				</TouchableOpacity>
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
					paddingBottom: 24,
					paddingTop: 24,
					paddingLeft: 24,
					paddingRight: 24,
				}}
			>
				<View style={{}}>
					<Text
						style={{
							fontFamily: FONTS?.bold,
							color: COLORS?.selectGrey,
							fontSize: 16,
						}}
					>
						Student name:
					</Text>
					<Text
						style={{
							marginTop: 5,
							fontFamily: FONTS?.bold,
							fontSize: 26,
							height: 34,
						}}
						numberOfLines={1}
					>
						{student && student.studentName}
					</Text>
				</View>
				<View style={{ marginTop: 20 }}>
					<Text style={{ fontFamily: FONTS?.bold, color: COLORS?.selectGrey, fontSize: 16 }}>
						Roll no:
					</Text>
					<Text
						style={{
							marginTop: 5,
							fontFamily: FONTS?.bold,
							fontSize: 26,
							height: 34,
						}}
					>
						{student && student.rollNumber}
					</Text>
				</View>
				<View style={{ marginTop: 20 }}>
					<View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: COLORS?.green,
								borderRadius: 7,
								height: 60,
								flex: 1,
							}}
						>
							<Text style={{ fontFamily: FONTS?.bold, fontSize: 22 }}>{stats[1]}</Text>
							<Text style={{ fontFamily: FONTS?.bold, fontSize: 14 }}>Present</Text>
						</View>
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: COLORS?.lightRed,
								borderRadius: 7,
								height: 60,
								flex: 1,
								marginLeft: 10,
							}}
						>
							<Text style={{ fontFamily: FONTS?.bold, fontSize: 22 }}>{stats[0]}</Text>
							<Text style={{ fontFamily: FONTS?.bold, fontSize: 14 }}>Absent</Text>
						</View>
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: COLORS?.yellow,
								borderRadius: 7,
								height: 60,
								flex: 1,
								marginLeft: 10,
							}}
						>
							<Text style={{ fontFamily: FONTS?.bold, fontSize: 22 }}>{stats[2]}</Text>
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
						<Text style={{ fontFamily: FONTS?.bold, fontSize: 14 }}>
							Out of {student && student.attendance.length - 1} classes
						</Text>
					</View>
				</View>
				<View style={{ flexDirection: 'row', marginTop: 25, height: 20 }}>
					{warning > 2 ? (
						<View style={{ flexDirection: 'row' }}>
							<Svg
								width='22'
								height='22'
								viewBox='0 0 22 22'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<Path
									d='M9.43246 3.53834L1.66829 16.5C1.50821 16.7772 1.42351 17.0915 1.42261 17.4116C1.42172 17.7318 1.50466 18.0465 1.66318 18.3247C1.82171 18.6028 2.05029 18.8345 2.32619 18.9969C2.60209 19.1592 2.91569 19.2465 3.23579 19.25H18.7641C19.0842 19.2465 19.3978 19.1592 19.6737 18.9969C19.9496 18.8345 20.1782 18.6028 20.3367 18.3247C20.4953 18.0465 20.5782 17.7318 20.5773 17.4116C20.5764 17.0915 20.4917 16.7772 20.3316 16.5L12.5675 3.53834C12.404 3.26894 12.174 3.0462 11.8994 2.89161C11.6248 2.73703 11.315 2.65582 11 2.65582C10.6849 2.65582 10.3751 2.73703 10.1005 2.89161C9.82596 3.0462 9.59587 3.26894 9.43246 3.53834Z'
									stroke='#FF0000'
									stroke-width='2'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
								<Path
									d='M11 8.25V11.9167'
									stroke='#FF0000'
									stroke-width='2'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
								<Path
									d='M11 15.5833H11.01'
									stroke='#FF0000'
									stroke-width='2'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
							</Svg>

							<Text
								style={{
									paddingLeft: 7,
									fontFamily: FONTS?.bold,
									color: COLORS?.red,
									fontSize: 18,
								}}
							>
								Absent for {warning} consecutive days
							</Text>
						</View>
					) : (
						<></>
					)}
				</View>
			</View>
			<TouchableOpacity
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: COLORS?.green,
					borderRadius: 12,
					height: 80,
					marginLeft: 24,
					marginRight: 24,
					marginTop: 30,
					flexDirection: 'row',
				}}
				activeOpacity={0.4}
				onPress={handlePresent}
			>
				<Svg
					width='19'
					height='19'
					viewBox='0 0 19 19'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<Path
						d='M12.8171 1.58331H6.18296C3.30129 1.58331 1.58337 3.30123 1.58337 6.1829V12.8091C1.58337 15.6987 3.30129 17.4166 6.18296 17.4166H12.8092C15.6909 17.4166 17.4088 15.6987 17.4088 12.8171V6.1829C17.4167 3.30123 15.6988 1.58331 12.8171 1.58331ZM13.2842 7.67915L8.79546 12.1679C8.68413 12.2791 8.53322 12.3415 8.37587 12.3415C8.21853 12.3415 8.06762 12.2791 7.95629 12.1679L5.71587 9.92748C5.60545 9.81575 5.54353 9.66499 5.54353 9.5079C5.54353 9.35081 5.60545 9.20005 5.71587 9.08831C5.94546 8.85873 6.32546 8.85873 6.55504 9.08831L8.37587 10.9091L12.445 6.83998C12.6746 6.6104 13.0546 6.6104 13.2842 6.83998C13.5138 7.06956 13.5138 7.44165 13.2842 7.67915Z'
						fill='black'
					/>
				</Svg>
				<Text style={{ marginLeft: 10, fontFamily: FONTS?.bold, fontSize: 16 }}>Present</Text>
			</TouchableOpacity>
			<View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
				<TouchableOpacity
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: COLORS?.yellow,
						borderRadius: 12,
						height: 60,
						marginLeft: 24,
						flexDirection: 'row',
						width: 150,
						flex: 3 / 8,
					}}
					activeOpacity={0.4}
					onPress={handleLate}
				>
					<Svg
						width='19'
						height='19'
						viewBox='0 0 19 19'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<Path
							d='M9.49998 3.67965C5.71581 3.67965 2.63623 6.75923 2.63623 10.5434C2.63623 14.3276 5.71581 17.4151 9.49998 17.4151C13.2841 17.4151 16.3637 14.3355 16.3637 10.5513C16.3637 6.76715 13.2841 3.67965 9.49998 3.67965ZM10.0937 10.2901C10.0937 10.6146 9.82456 10.8838 9.49998 10.8838C9.1754 10.8838 8.90623 10.6146 8.90623 10.2901V6.33173C8.90623 6.00715 9.1754 5.73798 9.49998 5.73798C9.82456 5.73798 10.0937 6.00715 10.0937 6.33173V10.2901ZM11.7879 2.73123H7.21206C6.8954 2.73123 6.64206 2.4779 6.64206 2.16123C6.64206 1.84456 6.8954 1.58331 7.21206 1.58331H11.7879C12.1046 1.58331 12.3579 1.83665 12.3579 2.15331C12.3579 2.46998 12.1046 2.73123 11.7879 2.73123Z'
							fill='black'
						/>
					</Svg>

					<Text style={{ marginLeft: 10, fontFamily: FONTS?.bold, fontSize: 16 }}>Late</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: COLORS?.lightRed,
						borderRadius: 12,
						height: 60,
						marginRight: 24,
						marginLeft: 15,
						flexDirection: 'row',
						width: 150,
						flex: 5 / 8,
					}}
					activeOpacity={0.4}
					onPress={handleAbsent}
				>
					<Svg
						width='19'
						height='19'
						viewBox='0 0 19 19'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<Path
							d='M12.8171 1.58331H6.18296C3.30129 1.58331 1.58337 3.30123 1.58337 6.1829V12.8091C1.58337 15.6987 3.30129 17.4166 6.18296 17.4166H12.8092C15.6909 17.4166 17.4088 15.6987 17.4088 12.8171V6.1829C17.4167 3.30123 15.6988 1.58331 12.8171 1.58331ZM12.16 11.3208C12.3896 11.5504 12.3896 11.9304 12.16 12.16C12.0413 12.2787 11.8909 12.3341 11.7405 12.3341C11.59 12.3341 11.4396 12.2787 11.3209 12.16L9.50004 10.3391L7.67921 12.16C7.56046 12.2787 7.41004 12.3341 7.25962 12.3341C7.10921 12.3341 6.95879 12.2787 6.84004 12.16C6.72962 12.0482 6.66769 11.8975 6.66769 11.7404C6.66769 11.5833 6.72962 11.4325 6.84004 11.3208L8.66087 9.49998L6.84004 7.67915C6.72962 7.56741 6.66769 7.41665 6.66769 7.25956C6.66769 7.10247 6.72962 6.95171 6.84004 6.83998C7.06962 6.6104 7.44962 6.6104 7.67921 6.83998L9.50004 8.66081L11.3209 6.83998C11.5505 6.6104 11.9305 6.6104 12.16 6.83998C12.3896 7.06956 12.3896 7.44956 12.16 7.67915L10.3392 9.49998L12.16 11.3208Z'
							fill='black'
						/>
					</Svg>

					<Text style={{ marginLeft: 10, fontFamily: FONTS?.bold, fontSize: 16 }}>Absent</Text>
				</TouchableOpacity>
			</View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginLeft: 24,
					marginRight: 24,
				}}
			>
				<TouchableOpacity
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						height: 43,
						borderWidth: 1,
						borderStyle: 'solid',
						borderColor: COLORS?.borderGrey,
						borderRadius: 10,
						marginTop: 15,
						flex: 3 / 8,
					}}
					onPress={handlePreviousStudent}
				>
					<Svg
						width='19'
						height='19'
						viewBox='0 0 19 19'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<Path
							d='M12.817 1.58331H6.18284C3.30117 1.58331 1.58325 3.30123 1.58325 6.1829V12.8091C1.58325 15.6987 3.30117 17.4166 6.18284 17.4166H12.8091C15.6908 17.4166 17.4087 15.6987 17.4087 12.8171V6.1829C17.4166 3.30123 15.6987 1.58331 12.817 1.58331ZM11.0199 12.7696H7.12492C6.80033 12.7696 6.53117 12.5004 6.53117 12.1758C6.53117 11.8512 6.80033 11.5821 7.12492 11.5821H11.0199C12.0333 11.5821 12.8645 10.7587 12.8645 9.73748C12.8645 8.71623 12.0412 7.8929 11.0199 7.8929H7.00617L7.212 8.09873C7.44158 8.33623 7.44159 8.70831 7.20409 8.94581C7.08534 9.06456 6.93492 9.11998 6.7845 9.11998C6.63408 9.11998 6.48367 9.06456 6.36492 8.94581L5.122 7.69498C5.01158 7.58325 4.94965 7.43249 4.94965 7.2754C4.94965 7.11831 5.01158 6.96755 5.122 6.85581L6.36492 5.6129C6.5945 5.38331 6.9745 5.38331 7.20409 5.6129C7.43367 5.84248 7.43367 6.22248 7.20409 6.45206L6.94284 6.71331H11.0199C12.6903 6.71331 14.052 8.07498 14.052 9.7454C14.052 11.4158 12.6903 12.7696 11.0199 12.7696Z'
							fill='black'
						/>
					</Svg>

					<Text style={{ fontFamily: FONTS?.bold, fontSize: 16, paddingLeft: 10 }}>Previous</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						height: 43,
						borderWidth: 1,
						borderStyle: 'solid',
						borderColor: COLORS?.borderGrey,
						borderRadius: 10,
						marginTop: 15,
						flex: 5 / 8,
						marginLeft: 15,
					}}
					onPress={handleNextStudent}
				>
					<Svg
						width='19'
						height='19'
						viewBox='0 0 19 19'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<Path
							d='M12.817 1.58331H6.18284C3.30117 1.58331 1.58325 3.30123 1.58325 6.1829V12.8091C1.58325 15.6987 3.30117 17.4166 6.18284 17.4166H12.8091C15.6908 17.4166 17.4087 15.6987 17.4087 12.8171V6.1829C17.4166 3.30123 15.6987 1.58331 12.817 1.58331ZM13.8778 7.69498L12.6349 8.9379C12.5162 9.05665 12.3658 9.11206 12.2153 9.11206C12.0649 9.11206 11.9145 9.05665 11.7958 8.9379C11.6853 8.82616 11.6234 8.6754 11.6234 8.51831C11.6234 8.36122 11.6853 8.21046 11.7958 8.09873L12.0016 7.8929H7.97992C6.96658 7.8929 6.13534 8.71623 6.13534 9.73748C6.13534 10.7587 6.95867 11.5821 7.97992 11.5821H11.8749C12.1995 11.5821 12.4687 11.8512 12.4687 12.1758C12.4687 12.5004 12.1995 12.7696 11.8749 12.7696H7.97992C6.3095 12.7696 4.94784 11.4079 4.94784 9.73748C4.94784 8.06706 6.3095 6.7054 7.97992 6.7054H12.057L11.7958 6.45206C11.6853 6.34033 11.6234 6.18957 11.6234 6.03248C11.6234 5.87539 11.6853 5.72463 11.7958 5.6129C12.0253 5.38331 12.4053 5.38331 12.6349 5.6129L13.8778 6.85581C14.1074 7.09331 14.1074 7.4654 13.8778 7.69498Z'
							fill='black'
						/>
					</Svg>

					<Text style={{ fontFamily: FONTS?.bold, fontSize: 16, paddingLeft: 10 }}>Skip</Text>
				</TouchableOpacity>
			</View>
			{/* <Navbar /> */}
		</View>
	)
}
