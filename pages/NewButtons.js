import { View, Text } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import { COLORS, FONTS } from '../../styles/theme'
import { TouchableOpacity } from 'react-native'

export default function NewButtons() {
  return (
    <View style = {{
        marginTop : 120,

    }}>
        {/* Button  */}
        <View style = {{
            alignSelf : 'center',
            paddingLeft : 24,
            paddingRight : 24,
            paddingTop : 12,
            paddingBottom : 12,
            backgroundColor : 'red',
            borderRadius : 15,
            alignItems : 'center',
        }}>
            <Text style = {{
                // fontFamily: FONTS?.regular,
                // color : COLORS?.white,
            }}>
                Import</Text>
        </View>

    </View>
  )
}