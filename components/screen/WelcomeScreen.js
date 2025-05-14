import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import { WelcomeScreenStyle } from '../styles/WelcomeScreenStyles';

const WelcomeScreen = ({ navigation }) => {
  return (
    <LinearGradient
      style={WelcomeScreenStyle.container}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={WelcomeScreenStyle.content}>
        {/* Single Logo Image */}
        {/* <Image
          source={require("../assets/logo.jpg")} // Replace with your logo image
          style={WelcomeScreenStyle.logo}
        /> */}

        {/* Welcome Text */}
        <View style={WelcomeScreenStyle.textContainer}>
          <Text style={WelcomeScreenStyle.titleText}>Career Catalyst</Text>

          <View style={WelcomeScreenStyle.subtitleContainer}>
            <Text style={WelcomeScreenStyle.subtitleText}>Practice to get Placed</Text>
          </View>

        </View>
      </View>
    </LinearGradient>
  );
};

export default WelcomeScreen;