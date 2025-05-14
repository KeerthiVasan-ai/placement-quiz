import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import COLORS from '../constants/colors';
import Button from '../reusable/button';
import Checkbox from 'expo-checkbox';
import Ionicons from '@expo/vector-icons/Ionicons';

const SignupScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Connect with your friend today!</Text>
        </View>

        {/* Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name</Text>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Enter your name"
              placeholderTextColor={COLORS.black}
              style={styles.input}
            />
          </View>
        </View>

        {/* Roll Number */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Roll Number</Text>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Enter your Roll Number"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              style={styles.input}
            />
          </View>
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email address</Text>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Enter your email address"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              style={styles.input}
            />
          </View>
        </View>

        {/* Phone Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <View style={styles.phoneInputContainer}>
            <TextInput
              placeholder="+91"
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              style={styles.countryCodeInput}
            />
            <TextInput
              placeholder="Enter your phone number"
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              style={styles.phoneNumberInput}
            />
          </View>
        </View>

        {/* Password Input with Eye Icon */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={COLORS.black}
              secureTextEntry={!passwordVisible}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={{position:"absolute",right:12}}>
              <Ionicons name={passwordVisible ? 'eye' : 'eye-off'} size={24} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Terms and Conditions Checkbox */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={termsAccepted}
            onValueChange={setTermsAccepted}
            tintColors={{ true: COLORS.primary, false: COLORS.black }}
          />
          <Text style={styles.checkboxText}>I agree to the Terms and Conditions</Text>
        </View>

        {/* Submit Button */}
        <Button
          title="Sign Up"
          onPress={() => console.log('Sign Up')}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  phoneInputContainer: {
    flexDirection: 'row',
    width: "100%",
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
  },
  countryCodeInput: {
    width: "12%",
    borderRightWidth: 1,
    borderRightColor: COLORS.grey,
    paddingLeft: 12,
    color: COLORS.black,
  },
  phoneNumberInput: {
    width: "80%",
    paddingLeft: 12,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  checkboxText: {
    marginLeft: 8,
    color: COLORS.black,
  },
  button: {
    marginTop: 22,
    width: '100%',
  },
});

export default SignupScreen;