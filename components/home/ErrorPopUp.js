import { View, Text, Image } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import { COLORS, FONTS } from '../../styles/theme'

export default function ErrorPopUp() {
  return (

    <View style ={{
        width : 320,
        height : 184,
        backgroundColor : 'white',
        marginTop : 150,
        marginLeft : 30,
        borderRadius : 20,
    }}>

        {/* Confirm */}
        <View style = {{
            marginTop : 47,
            alignItems : 'center',
        }}>
            <Text style = {{
                fontFamily: FONTS?.regular, //once check
                fontWeight : 600,
                fontSize : 26,
                lineHeight : 34

            }}>
                Confirm Deletion
            </Text>
            {/* text */}
            <View style = {{
                marginTop : 8
            }}>
                <Text style = {{
                    fontFamily: FONTS?.regular,
                    fontWeight : 300,
                    fontSize : 14,
                    lineHeight : 18
                }}>
                    Are you sure you want to delete this session?
                </Text>
            </View>
        </View>
    </View> 
  )
}
