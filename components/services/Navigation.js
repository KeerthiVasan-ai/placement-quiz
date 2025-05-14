import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { LoginScreen, SignupScreen, HomeScreen, QuizListScreen, TestFormScreen } from '../screen/index';

export const NavigationRouter = ({initialRoute}) => {
    const Stack = createNativeStackNavigator();

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}>
               <Stack.Screen 
                    name="Login"
                    component={LoginScreen}
               />
               <Stack.Screen 
                    name="Signup"
                    component={SignupScreen}
               />
               <Stack.Screen 
                    name="Home"
                    component={HomeScreen}
                    options={{
                         headerShown: false
                    }}
               />
               <Stack.Screen 
                    name="QuizList"
                    component={QuizListScreen}
               />
               <Stack.Screen 
                    name="Attempt"
                    component={TestFormScreen}
               />
            </Stack.Navigator>
        </NavigationContainer>
    )
}