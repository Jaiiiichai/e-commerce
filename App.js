// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './components/BottomTabNavigator';
import ProductDetails from './components/ProductDetails';
import Buy from './components/BuyNow';
import Checkout from './components/Checkout';
import OrderDetails from './components/OrderDetails';
import Splash from './components/SplashScreen';
import Orders from './components/Orders';
import EditProfile from './components/EditProfile';
import Settings from './components/Settings';
import OrderHistory from './components/OrderHistory';
import Login from './components/Login';
import WelcomeScreen from './components/WelcomeScreen';
import Register from './components/Register';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ title: 'Product Details' }} />
        <Stack.Screen name="Buy" component={Buy} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="OrderHistory" component={OrderHistory} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;