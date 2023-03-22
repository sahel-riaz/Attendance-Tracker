import { View, Text, Image } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import { COLORS, FONTS } from '../../styles/theme'
import { TouchableOpacity } from 'react-native'

export default function ErrorPopUp() {
  return (

    <View style ={{
        width : 320,
        height : 184,
        backgroundColor : 'red',
        marginTop : 150,
        marginLeft : 35,
        borderRadius : 20,
        position : 'relative'
    }}>

        {/* bottom */}
        <View style = {{
            marginTop : 20,
            backgroundColor : 'white',
            height : 164,
            borderBottomLeftRadius : 10,
            borderBottomRightRadius : 10,
            position : 'relative'

        }}>
            {/* Confirm */}
            <View style = {{
                marginTop : 27,
                alignItems : 'center',
            }}>
                <Text style = {{
                    fontFamily: FONTS?.bold, //once check
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
            {/* Buttons */}
            <View style = {{
                height : 36,
                width : 263,
                marginTop : 17,
                marginLeft : 29,
                flexDirection : 'row',
                justifyContent : 'space-between'
            }}>
                {/* Cancel Button */}
                <TouchableOpacity style = {{
                    height : 36,
                    width : 120,
                    backgroundColor : '#294F82',
                    borderRadius : 10,
                    alignItems : 'center',
                    justifyContent : 'space-around',
                }}>
                    <Text style = {{
                        fontFamily: FONTS?.regular,
                        fontWeight : 500,
                        fontSize : 14,
                        color: COLORS?.white
                    }}>
                        Cancel
                    </Text>
                </TouchableOpacity>
                {/* Delete Button */}
                <TouchableOpacity style = {{
                    height : 36,
                    width : 120,
                    borderWidth : 1,
                    borderColor : '#D8D8D8',
                    borderRadius : 10,
                    alignItems : 'center',
                    justifyContent : 'space-around',
                }}>
                    <Text style = {{
                        fontFamily: FONTS?.regular,
                        fontWeight : 500,
                        fontSize : 14,
                        color: COLORS?.black
                    }}>
                        Delete
                    </Text>
                </TouchableOpacity>
            </View>
        </View>

    </View> 
  )
}
