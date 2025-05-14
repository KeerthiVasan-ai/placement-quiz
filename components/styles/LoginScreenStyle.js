import { StyleSheet } from "react-native";
import COLORS from '../constants/colors';

export const LoginScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    content: {
      flex: 1,
      marginHorizontal: 22,
    },
    header: {
      marginVertical: 22,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginVertical: 12,
      color: COLORS.black,
    },
    subtitle: {
      fontSize: 16,
      color: COLORS.black,
    },
    inputContainer: {
      marginBottom: 12,
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: '400',
      marginVertical: 8,
      color: COLORS.black,
    },
    inputBox: {
      width: "100%",
      height: 48,
      borderColor: COLORS.black,
      borderWidth: 1,
      borderRadius: 8,
      justifyContent: "center",
      paddingLeft: 22,
    },
    input: {
      width: "100%",
      color: COLORS.black,
    },
    passwordInputContainer: {
      flexDirection: 'row',
      width: "100%",
      height: 48,
      borderColor: COLORS.black,
      borderWidth: 1,
      borderRadius: 8,
      alignItems: "center",
      paddingLeft: 22,
      paddingRight: 12,
      justifyContent: 'space-between',
    },
    button: {
      marginTop: 22,
      width: '100%',
    },
    loadingIndicator: {
      marginTop: 22,
    },
  });