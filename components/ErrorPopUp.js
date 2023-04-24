import { View, Text } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import { COLORS, FONTS } from '../styles/theme'
import { TouchableOpacity } from 'react-native'
import { Modal } from 'react-native'

export default function ErrorPopUp({ data, trigger, onCancel, onDelete }) {
	return (
		<Modal visible={trigger} transparent={true}>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
				}}
			>
				<View
					style={{
						width: 320,
						height: 184,
						borderRadius: 20,
						backgroundColor: COLORS?.white,
					}}
				>
					<View
						style={{
							height: 21,
							backgroundColor: COLORS?.red,
							borderTopRightRadius: 20,
							borderTopLeftRadius: 20,
						}}
					></View>
					<View
						style={{
							position: 'absolute',
							height: 70,
							width: 70,
							borderRadius: 1000,
							backgroundColor: COLORS?.red,
							alignItems: 'center',
							justifyContent: 'center',
							top: -35,
							right: 125,
						}}
					>
						<Svg
							width='30'
							height='30'
							viewBox='0 0 30 30'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<Path
								d='M26.3376 6.5375C24.3251 6.3375 22.3126 6.1875 20.2876 6.075V6.0625L20.0126 4.4375C19.8251 3.2875 19.5501 1.5625 16.6251 1.5625H13.3501C10.4376 1.5625 10.1626 3.2125 9.96257 4.425L9.70008 6.025C8.53757 6.1 7.37507 6.175 6.21257 6.2875L3.66257 6.5375C3.13757 6.5875 2.76257 7.05 2.81257 7.5625C2.86257 8.075 3.31257 8.45 3.83757 8.4L6.38758 8.15C12.9376 7.5 19.5376 7.75 26.1626 8.4125H26.2626C26.7376 8.4125 27.1501 8.05 27.2001 7.5625C27.2189 7.3128 27.1391 7.06566 26.9779 6.87406C26.8167 6.68245 26.5868 6.56164 26.3376 6.5375ZM24.0376 10.175C23.7376 9.8625 23.3251 9.6875 22.9001 9.6875H7.10007C6.67507 9.6875 6.25007 9.8625 5.96257 10.175C5.67507 10.4875 5.51257 10.9125 5.53757 11.35L6.31258 24.175C6.45008 26.075 6.62507 28.45 10.9876 28.45H19.0126C23.3751 28.45 23.5501 26.0875 23.6876 24.175L24.4626 11.3625C24.4876 10.9125 24.3251 10.4875 24.0376 10.175ZM17.0751 22.1875H12.9126C12.4001 22.1875 11.9751 21.7625 11.9751 21.25C11.9751 20.7375 12.4001 20.3125 12.9126 20.3125H17.0751C17.5876 20.3125 18.0126 20.7375 18.0126 21.25C18.0126 21.7625 17.5876 22.1875 17.0751 22.1875ZM18.1251 17.1875H11.8751C11.3626 17.1875 10.9376 16.7625 10.9376 16.25C10.9376 15.7375 11.3626 15.3125 11.8751 15.3125H18.1251C18.6376 15.3125 19.0626 15.7375 19.0626 16.25C19.0626 16.7625 18.6376 17.1875 18.1251 17.1875Z'
								fill='white'
							/>
						</Svg>
					</View>
					<View style={{ alignItems: 'center' }}>
						<Text style={{ fontFamily: FONTS?.bold, fontSize: 26, marginTop: 26 }}>
							Confirm Deletion
						</Text>
						<Text style={{ fontFamily: FONTS?.regular, fontSize: 14, marginTop: 8 }}>{data}</Text>
						<View style={{ flexDirection: 'row', marginTop: 18 }}>
							<TouchableOpacity
								style={{
									width: 110,
									height: 36,
									alignItems: 'center',
									justifyContent: 'center',
									backgroundColor: COLORS?.blue,
									borderRadius: 10,
								}}
								activeOpacity={0.7}
								onPress={onCancel}
							>
								<Text style={{ fontFamily: FONTS?.regular, fontSize: 14, color: COLORS?.white }}>
									Cancel
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									width: 110,
									height: 36,
									alignItems: 'center',
									justifyContent: 'center',
									borderRadius: 10,
									borderWidth: 1,
									borderColor: COLORS?.borderGrey,
									marginLeft: 24,
								}}
								activeOpacity={0.7}
								onPress={onDelete}
							>
								<Text style={{ fontFamily: FONTS?.regular, fontSize: 14 }}>Delete</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		</Modal>
	)
}
