import React, { useContext, useEffect, useState } from 'react';
import { WelcomeScreen } from './components/screen';
import { NavigationRouter } from './components/services/Navigation';
import { AuthContext, AuthProvider } from './components/services/AuthProvider';
import { enableScreens } from 'react-native-screens';

enableScreens();

const App = () => {
  const { isLogin, loading } = useContext(AuthContext);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [initialRoute, setInitialRoute] = useState(isLogin ? 'Home' : 'Login');

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setIsSplashVisible(false);
    }, 3000); 

    return () => clearTimeout(splashTimeout);
  }, []);

  useEffect(() => {
    setInitialRoute(isLogin ? 'Home' : 'Login');
  }, [isLogin]);

  if (loading || isSplashVisible) {
    return <WelcomeScreen />;
  }

  console.log(initialRoute, " Before Return from App.js");
  return <NavigationRouter initialRoute={initialRoute} />;
};

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);