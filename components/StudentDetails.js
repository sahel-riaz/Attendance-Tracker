import { Text, TouchableOpacity, View } from 'react-native'
import { Line, Path, Polygon, Svg } from 'react-native-svg'

//components
import { StatusBar } from 'expo-status-bar'
import ErrorPopUp from '../components/ErrorPopUp'
//themes
import { COLORS, FONTS } from '../styles/theme'
import { useNavigation } from '@react-navigation/core'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native-gesture-handler'

export default function StudentDetails({
	student,
	stats,
	avg,
	warning,
	course,
	batch,
	date,
	marked,
	handlePresent,
	handleAbsent,
	handleLate,
	handleNextStudent,
	handlePreviousStudent,
	mark,
	handleEmail,
}) {
	const navigation = useNavigation()
	const [trigger, setTrigger] = useState(false)

	async function handleDeleteStudent() {
		AsyncStorage.getItem(course)
			.then((res) => {
				res = JSON.parse(res)

				const toRemove = String(student.rollNumber)
				let temp = []
				for (let i = 0; i < res.batches[batch].students.length; i++) {
					if (res.batches[batch].students[i].rollNumber !== toRemove) {
						temp = [...temp, res.batches[batch].students[i]]
					}
				}
				res.batches[batch].students = temp

				res = JSON.stringify(res)
				AsyncStorage.setItem(course, res)
			})
			.then(() => {
				navigation.push('DbStudents', {
					course: course,
					batch: batch,
				})
			})
	}

	function onCancel() {
		setTrigger(false)
	}

	function onDelete() {
		handleDeleteStudent()
		setTrigger(false)
	}

	return (
		<View style={{ flex: 1 }}>
			<StatusBar style='dark' />
			<ErrorPopUp
				data='Are you sure you want to delete this student?'
				trigger={trigger}
				onCancel={onCancel}
				onDelete={onDelete}
			/>
			<View style={{ paddingTop: 60, flexDirection: 'row' }}>
				<TouchableOpacity
					style={{ padding: 20 }}
					onPress={() => {
						mark
							? navigation.push('Students', {
									course: course,
									batch: batch,
									date: date,
							  })
							: navigation.push('DbStudents', {
									course: course,
									batch: batch,
							  })
					}}
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
					{mark ? (
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
					) : (
						<Text
							style={{
								fontFamily: FONTS?.bold,
								color: COLORS?.subHeading,
								fontSize: 16,
								lineHeight: 19,
							}}
						>
							View details
						</Text>
					)}
				</View>
			</View>

			<View
				style={{
					marginLeft: 24,
					marginRight: 24,
					marginTop: 32,
					borderColor: avg < 80 ? COLORS?.red : COLORS?.borderGrey,
					borderWidth: 2,
					borderRadius: 15,
					paddingBottom: 24,
					paddingTop: 24,
					paddingLeft: 24,
					paddingRight: 24,
				}}
			>
				<View>
					<Text
						style={{
							fontFamily: FONTS?.bold,
							color: COLORS?.selectGrey,
							fontSize: 16,
						}}
					>
						Student name:
					</Text>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
					</ScrollView>
				</View>
				<View style={{ marginTop: 20 }}>
					<Text style={{ fontFamily: FONTS?.bold, color: COLORS?.selectGrey, fontSize: 16 }}>
						Roll number:
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
							justifyContent: 'space-evenly',
							borderRadius: 7,
							alignItems: 'center',
							height: 40,
							flexDirection: 'row',
						}}
					>
						<Text style={{ fontFamily: FONTS?.bold, fontSize: 14 }}>
							Out of{' '}
							{student &&
								(mark
									? marked
										? student.attendance.length
										: student.attendance.length - 1
									: student.attendance.length)}
							&nbsp;session{'(s)'}
						</Text>
						<Text style={{ fontFamily: FONTS?.bold, fontSize: 14 }}>{avg}%</Text>
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
									d='M10.9999 7V12M10.9999 19.6258H5.4449C2.26406 19.6258 0.934898 17.3525 2.4749 14.575L5.3349 9.42334L8.0299 4.58334C9.66156 1.64084 12.3382 1.64084 13.9699 4.58334L16.6649 9.43251L19.5249 14.5842C21.0649 17.3617 19.7266 19.635 16.5549 19.635H10.9999V19.6258Z'
									stroke='#FF0000'
									stroke-width='2'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
								<Path
									d='M10.9999 16.4167L11.0001 15'
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
				{mark ? (
					<></>
				) : (
					<View
						style={{
							flexDirection: 'row',
							marginTop: 25,
						}}
					>
						<TouchableOpacity
							style={{
								height: 43,
								flex: 3 / 4,
								backgroundColor: COLORS?.blue,
								alignItems: 'center',
								borderRadius: 10,
								flexDirection: 'row',
								justifyContent: 'center',
								alignSelf: 'center',
								marginRight: 10,
							}}
							onPress={handleEmail}
							activeOpacity={0.7}
						>
							<Svg
								width='19'
								height='19'
								viewBox='0 0 19 19'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<Path
									d='M12.7775 2.34331L5.62872 4.71831C0.823304 6.32539 0.823304 8.94581 5.62872 10.545L7.75039 11.2496L8.45497 13.3712C10.0541 18.1766 12.6825 18.1766 14.2816 13.3712L16.6646 6.23039C17.7254 3.02414 15.9837 1.27456 12.7775 2.34331ZM13.0308 6.60247L10.0225 9.62664C9.90372 9.74539 9.7533 9.80081 9.60289 9.80081C9.45247 9.80081 9.30205 9.74539 9.1833 9.62664C9.07288 9.51491 9.01096 9.36415 9.01096 9.20706C9.01096 9.04997 9.07288 8.89921 9.1833 8.78747L12.1916 5.76331C12.4212 5.53372 12.8012 5.53372 13.0308 5.76331C13.2604 5.99289 13.2604 6.37289 13.0308 6.60247Z'
									fill='white'
								/>
							</Svg>

							<Text
								style={{
									paddingLeft: 10,
									fontFamily: FONTS?.regular,
									fontSize: 16,
									color: COLORS?.white,
								}}
							>
								Email student
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								height: 43,
								flex: 1 / 4,
								backgroundColor: COLORS?.red,
								alignItems: 'center',
								borderRadius: 10,
								flexDirection: 'row',
								justifyContent: 'center',
								alignSelf: 'center',
							}}
							onPress={() => {
								setTrigger(true)
							}}
							activeOpacity={0.7}
						>
							<Svg
								width='19'
								height='19'
								viewBox='0 0 19 19'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<Path
									d='M16.6804 4.1404C15.4059 4.01373 14.1313 3.91873 12.8488 3.84748V3.83956L12.6746 2.8104C12.5559 2.08206 12.3817 0.989563 10.5292 0.989563H8.45502C6.61044 0.989563 6.43627 2.03456 6.30961 2.80248L6.14336 3.81581C5.40711 3.86331 4.67086 3.91081 3.93461 3.98206L2.31961 4.1404C1.98711 4.17206 1.74961 4.46498 1.78127 4.78956C1.81294 5.11415 2.09794 5.35165 2.43044 5.31998L4.04544 5.16165C8.19377 4.74998 12.3738 4.90831 16.5696 5.3279H16.6329C16.9338 5.3279 17.195 5.09831 17.2267 4.78956C17.2386 4.63142 17.1881 4.4749 17.086 4.35355C16.9839 4.2322 16.8383 4.15568 16.6804 4.1404ZM15.2238 6.44415C15.0338 6.24623 14.7725 6.1354 14.5034 6.1354H4.49669C4.22752 6.1354 3.95836 6.24623 3.77627 6.44415C3.59419 6.64206 3.49127 6.91123 3.50711 7.18831L3.99794 15.3108C4.08502 16.5141 4.19586 18.0183 6.95877 18.0183H12.0413C14.8042 18.0183 14.915 16.5221 15.0021 15.3108L15.4929 7.19623C15.5088 6.91123 15.4059 6.64206 15.2238 6.44415ZM10.8142 14.0521H8.17794C7.85336 14.0521 7.58419 13.7829 7.58419 13.4583C7.58419 13.1337 7.85336 12.8646 8.17794 12.8646H10.8142C11.1388 12.8646 11.4079 13.1337 11.4079 13.4583C11.4079 13.7829 11.1388 14.0521 10.8142 14.0521ZM11.4792 10.8854H7.52086C7.19627 10.8854 6.92711 10.6162 6.92711 10.2916C6.92711 9.96706 7.19627 9.6979 7.52086 9.6979H11.4792C11.8038 9.6979 12.0729 9.96706 12.0729 10.2916C12.0729 10.6162 11.8038 10.8854 11.4792 10.8854Z'
									fill='white'
								/>
							</Svg>
						</TouchableOpacity>
					</View>
				)}
			</View>
			{mark ? (
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
						elevation: 2,
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
			) : (
				<></>
			)}
			{mark ? (
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
							elevation: 2,
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
							elevation: 2,
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
			) : (
				<></>
			)}

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
					{mark ? (
						<Text style={{ fontFamily: FONTS?.bold, fontSize: 16, paddingLeft: 10 }}>Skip</Text>
					) : (
						<Text style={{ fontFamily: FONTS?.bold, fontSize: 16, paddingLeft: 10 }}>Next</Text>
					)}
				</TouchableOpacity>
			</View>
		</View>
	)
}
