import { StyleSheet } from "react-native";
import COLORS from '../constants/colors';

export const WelcomeScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    content: {
      flex: 1,
      marginHorizontal: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      height: 150,
      width: 150,
      borderRadius: 20,
      marginBottom: 40,
    },
    textContainer: {
      alignItems: 'center',
      paddingHorizontal: 22,
    },
    titleText: {
      fontSize: 36,
      fontWeight: '800',
      color: COLORS.white,
      textAlign: 'center',
    },
    subtitleContainer: {
      marginVertical: 22,
      alignItems: 'center',
    },
    subtitleText: {
      fontSize: 16,
      color: COLORS.white,
      marginVertical: 4,
      textAlign: 'center',
    }
  });