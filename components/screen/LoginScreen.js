import React, { useContext, useState } from 'react';
import { AuthContext } from '../services/AuthProvider.js';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import COLORS from '../constants/colors';
import Button from '../reusable/button';
import Ionicons from '@expo/vector-icons/Ionicons';
import { loginUser } from "../services/AuthService.js";
import { LoginScreenStyle } from '../styles/LoginScreenStyle.js';


const LoginScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    setLoading(true);

    if (email === "" || password === "") {
      alert("Please fill in both email and password.");
      setLoading(false);
      return;
    }

    const user = await loginUser(email, password);

    if (user != null) {
      console.log('Logged in successfully:', user);
      login(user,true);
      setLoading(false)
      navigation.navigate('Home');
    } else {
      setLoading(false);
      alert("Check the credentials");
    }
    
    setEmail("");
    setPassword("");
  };

  return (
    <SafeAreaView style={LoginScreenStyle.container}>
      <View style={LoginScreenStyle.content}>
        <View style={LoginScreenStyle.header}>
          <Text style={LoginScreenStyle.title}>Login</Text>
          <Text style={LoginScreenStyle.subtitle}>Welcome back! Please login to continue.</Text>
        </View>

        <View style={LoginScreenStyle.inputContainer}>
          <Text style={LoginScreenStyle.inputLabel}>Email address</Text>
          <View style={LoginScreenStyle.inputBox}>
            <TextInput
              placeholder="Enter your email address"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              style={LoginScreenStyle.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={LoginScreenStyle.inputContainer}>
          <Text style={LoginScreenStyle.inputLabel}>Password</Text>
          <View style={LoginScreenStyle.passwordInputContainer}>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={COLORS.black}
              secureTextEntry={!passwordVisible}
              style={LoginScreenStyle.input}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={{ position: "absolute", right: 12 }}>
              <Ionicons name={passwordVisible ? 'eye' : 'eye-off'} size={24} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={LoginScreenStyle.loadingIndicator} />
        ) : (
          <Button
            title="Login"
            onPress={handleLogin}
            style={LoginScreenStyle.button}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;