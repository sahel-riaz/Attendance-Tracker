import { useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import * as LocalAuthentication from 'expo-local-authentication'
import { useNavigation } from '@react-navigation/native'
import { Path, Svg } from 'react-native-svg'
import { StatusBar } from 'expo-status-bar'

//themes
import { COLORS, FONTS } from '../styles/theme'


import Navbar from '../components/Navbar'

export default function NewAuth() {
	return (
		<View style = {{
      marginTop : 42,
      alignItems : 'center',
    }}>
			<View style = {{
        width : 347,
        height : 347,
      }}>
          <Svg
            width='347'
            height='347'
            viewBox='0 0 347 347'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <Path
              d='M242.177 51.4716V28.9166C242.177 22.9887 237.261 18.0729 231.333 18.0729C225.405 18.0729 220.49 22.9887 220.49 28.9166V50.6041H126.51V28.9166C126.51 22.9887 121.595 18.0729 115.667 18.0729C109.739 18.0729 104.823 22.9887 104.823 28.9166V51.4716C65.7854 55.0862 46.845 78.3641 43.9533 112.92C43.6642 117.112 47.1342 120.582 51.1825 120.582H295.817C300.01 120.582 303.48 116.968 303.047 112.92C300.155 78.3641 281.215 55.0862 242.177 51.4716ZM289.167 142.27H57.8333C49.8812 142.27 43.375 148.776 43.375 156.728V245.792C43.375 289.167 65.0625 318.083 115.667 318.083H186.946C196.922 318.083 203.862 308.396 200.682 298.998C197.79 290.612 195.332 281.359 195.332 274.708C195.332 230.9 231.044 195.187 274.853 195.187C279.046 195.187 283.239 195.477 287.287 196.2C295.962 197.501 303.77 190.705 303.77 182.03V156.873C303.732 153.012 302.181 149.319 299.451 146.589C296.72 143.858 293.028 142.308 289.167 142.27ZM133.161 256.057C131.715 257.358 130.125 258.37 128.39 259.093C126.655 259.816 124.775 260.25 122.896 260.25C121.016 260.25 119.137 259.816 117.402 259.093C115.667 258.37 114.076 257.358 112.63 256.057C110.028 253.31 108.437 249.551 108.437 245.792C108.437 244.924 108.582 243.912 108.727 243.045C108.871 242.032 109.16 241.165 109.594 240.297C109.883 239.43 110.317 238.562 110.895 237.695C111.329 236.972 112.052 236.249 112.63 235.526C114.076 234.225 115.667 233.213 117.402 232.49C120.922 231.044 124.87 231.044 128.39 232.49C130.125 233.213 131.715 234.225 133.161 235.526C133.74 236.249 134.462 236.972 134.896 237.695C135.475 238.562 135.908 239.43 136.197 240.297C136.631 241.165 136.92 242.032 137.065 243.045C137.21 243.912 137.354 244.924 137.354 245.792C137.354 249.551 135.764 253.31 133.161 256.057ZM133.161 205.453C131.715 206.754 130.125 207.766 128.39 208.489C126.655 209.212 124.775 209.646 122.896 209.646C121.016 209.646 119.137 209.212 117.402 208.489C115.522 207.766 114.076 206.754 112.63 205.453C110.028 202.706 108.437 198.947 108.437 195.187C108.437 191.428 110.028 187.669 112.63 184.922C114.076 183.621 115.667 182.609 117.402 181.886C120.922 180.44 124.87 180.44 128.39 181.886C130.125 182.609 131.715 183.621 133.161 184.922C133.74 185.645 134.462 186.368 134.896 187.091C135.475 187.958 135.908 188.826 136.197 189.693C136.631 190.561 136.92 191.428 137.065 192.296C137.21 193.308 137.354 194.32 137.354 195.187C137.354 198.947 135.764 202.706 133.161 205.453ZM183.765 205.453C181.018 208.055 177.404 209.646 173.5 209.646C171.62 209.646 169.741 209.212 168.006 208.489C166.126 207.766 164.68 206.754 163.235 205.453C160.632 202.706 159.042 198.947 159.042 195.187C159.042 194.32 159.186 193.308 159.331 192.296C159.475 191.428 159.765 190.561 160.198 189.693C160.487 188.826 160.921 187.958 161.5 187.091L163.235 184.922C168.584 179.572 178.271 179.572 183.765 184.922L185.5 187.091C186.079 187.958 186.512 188.826 186.802 189.693C187.235 190.561 187.525 191.428 187.669 192.296C187.814 193.308 187.958 194.32 187.958 195.187C187.958 198.947 186.368 202.706 183.765 205.453Z'
              fill='#294F82'
            />
            <Path
            d='M315.625 233.791C304.763 222.96 290.048 216.877 274.708 216.877C259.368 216.877 244.654 222.96 233.791 233.791C222.96 244.654 216.877 259.368 216.877 274.708C216.877 290.048 222.96 304.763 233.791 315.625C244.654 326.457 259.368 332.539 274.708 332.539C290.048 332.539 304.763 326.457 315.625 315.625C326.457 304.763 332.539 290.048 332.539 274.708C332.539 259.368 326.457 244.654 315.625 233.791ZM304.637 282.805C302.758 284.829 300.01 285.986 296.974 285.986H286.275V297.263C286.275 300.3 285.118 302.902 283.094 304.926C281.07 306.95 278.468 308.107 275.431 308.107C269.503 308.107 264.588 303.191 264.588 297.263V285.986H253.744C250.868 285.986 248.11 284.843 246.076 282.81C244.043 280.776 242.9 278.018 242.9 275.142C242.9 272.266 244.043 269.508 246.076 267.474C248.11 265.441 250.868 264.298 253.744 264.298H264.588V254.033C264.588 251.157 265.73 248.399 267.764 246.365C269.797 244.332 272.555 243.189 275.431 243.189C278.307 243.189 281.065 244.332 283.099 246.365C285.133 248.399 286.275 251.157 286.275 254.033V264.298H296.974C303.047 264.298 307.818 269.214 307.818 275.142C307.818 278.178 306.661 280.925 304.637 282.805Z'
            fill='#294F82'
            />
          </Svg>
        </View>
        <View style = {{
          width : 213,
          height : 231,
          alignItems : 'center',
        }}>
          <View style = {{
            width : 182,
            height : 48,
            marginTop : 48,
          }}>
            <Text style = {{
              fontFamily: FONTS?.bold, 
              color: COLORS?.black,
              fontSize: 40, 
              fontWeight : 700,
              lineHeight :48,

            }}>
              Good day!
            </Text>
          </View>
          <View style = {{
            marginTop : 48,
            width : '100%',
            height : 34,
            alignItems : 'center',
            justifyContent : 'center'
          }}>
            <Text>
            Please authenticate yourself before you use the app
            </Text>
          </View>
            <TouchableOpacity
            style={{
              width: 208,
              height: 48,
              backgroundColor: COLORS?.blue,
              alignItems: 'center',
              borderRadius: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 40,
              alignSelf: 'center',
            }}
            onPress={() => {
              localAuth()
            }}
            activeOpacity={0.7}
          >
            <Svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <Path
                d='M12 7.94995C10.21 7.94995 8.75 9.40995 8.75 11.2V12.8C8.75 14.59 10.21 16.05 12 16.05C13.79 16.05 15.25 14.59 15.25 12.8V11.2C15.25 9.40995 13.79 7.94995 12 7.94995ZM12.9 13.24C12.9 13.74 12.5 14.14 12 14.14C11.5 14.14 11.1 13.74 11.1 13.24V10.77C11.1 10.28 11.5 9.86995 12 9.86995C12.5 9.86995 12.9 10.27 12.9 10.77V13.24Z'
                fill='white'
              />
              <Path
                d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.75 12.8C16.75 15.42 14.62 17.55 12 17.55C9.38 17.55 7.25 15.42 7.25 12.8V11.2C7.25 8.58 9.38 6.45 12 6.45C14.62 6.45 16.75 8.58 16.75 11.2V12.8Z'
                fill='white'
              />
            </Svg>

            <Text
              style={{
                paddingLeft: 10,
                fontFamily: FONTS?.regular,
                color: COLORS?.white,
                fontSize: 16,
              }}
            >
              Try again!
            </Text>
          </TouchableOpacity>
          <View style = {{
            marginTop : 5,
          }}>
            <Text style = {{
              fontFamily : FONTS?.regular,
              color : COLORS?.selectGrey,
              fontSize : 12
            }}>
              Click here to try again
            </Text>
          </View>
        </View>

		</View>
	)
}
