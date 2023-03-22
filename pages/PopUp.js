import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import ErrorPopUp from '../components/home/ErrorPopUp'
import { COLORS, FONTS } from '../styles/theme'
import { useNavigation } from '@react-navigation/native'


export default function PopUp() {
    const navigation = useNavigation()
  return (
    <ErrorPopUp textt="Are you sure you want to delete this class?"/>
  )
}
