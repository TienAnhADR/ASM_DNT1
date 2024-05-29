
import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

// import Welcome from "./src/asm/welcome";
import Login from './Compds/LoginCompd';
import DangKy from "./Compds/DangKyCompd";
import Favorites from "./Compds/FavoriteCompd";
import Home from "./Compds/HomeCompd";
import SanPhamCTCompd from './Compds/SanPhamCTCompd';
import Welcome from './Compds/welcome';
import GioHangCompd from './Compds/GioHangCompd';
import Setting from './Compds/Setting';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PersonalDetails from './Compds/PersonalDetails';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const Tabb = () => {
  return (

    <Tab.Navigator

      screenOptions={({ route }) => ({

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home';
          } else if (route.name === 'GioHang') {
            iconName = focused ? 'bag-handle' : 'bag-handle';
          } else if (route.name === 'Favorite') {
            iconName = focused ? 'heart' : 'heart';
          } else if (route.name === 'ThongBao') {
            iconName = focused ? 'notifications' : 'notifications';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;


          // if (route.name === 'Home') {
          //   return <Image source={require('./img/home.png')}/>
          // } else if (route.name === 'Favorite') {
          //   return <Image source={require('./img/heard.png')}/>
          // } else if (route.name === 'GioHang'){
          //   return <Image source={require('./img/gio.png')}/>
          // } else if(route.name === 'ThongBao'){
          //   return <Image source={require('./img/alert.png')}/>
          // }

        },
        tabBarActiveTintColor: '#e28743',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {
          
          backgroundColor: 'black'
        }

      })}>
      <Tab.Screen name='Home' component={Home} options={{ headerShown: false, tabBarLabel: '' }} />
      <Tab.Screen name='GioHang' component={GioHangCompd} options={{ headerShown: false, tabBarLabel: '' }} />
      <Tab.Screen name='Favorite' component={Favorites} options={{ headerShown: false, tabBarLabel: '' }} />
      <Tab.Screen name='ThongBao' component={Home} options={{ headerShown: false, tabBarLabel: '' }} />

    </Tab.Navigator>

  )

}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='StackWellCome'>
      <Stack.Screen name='StackSpCT' component={SanPhamCTCompd} options={{ headerShown: false }} />
        <Stack.Screen name='StackWellCome' component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name='StackLogin' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='StackHome' component={Tabb} options={{ headerShown: false }} />
        <Stack.Screen name='StackDangKy' component={DangKy} options={{ headerShown: false }} />
        <Stack.Screen name='StackSetting' component={Setting} options={{headerShown:false}}/>
        <Stack.Screen name='StackPersonalDetails' component={PersonalDetails} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>





  )
}



export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',


  }
})