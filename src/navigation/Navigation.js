import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';


// importing screens
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Cart from '../screens/Cart';
import OrderSuccess from '../screens/OrderSuccess';
import Feedback from '../screens/Feedback';
import OrderStatus from '../screens/OrderStatus';
import Report from '../screens/Report';
import CategoryItems from '../screens/CategoryItems';
import CafeDensity from '../screens/CafeDensity';
import Health from '../screens/Health';
import Orders from '../screens/Orders';
import Venderlist from '../screens/Venderlist';
import Qrcode from '../screens/Qrcode';
import ForgotPassword from '../screens/Forgotpassword';
import Wallet from '../screens/Wallet'

import Drawer from '../components/Drawer';


const UiStack = createStackNavigator();
const UiDrawer = createDrawerNavigator();

// const DrawerNavigator = ({ navigation, isLoggedIn }) => isLoggedIn ? (
//     <UiDrawer.Navigator  drawerPosition="right" drawerContent={(props) => <Drawer {...props} />}>
//         <UiDrawer.Screen name='Home' component={Home} />
//         <UiDrawer.Screen name="Venderlist" component={Venderlist} />
//         <UiDrawer.Screen name='Health' component={Health} />
//         <UiDrawer.Screen name='Report' component={Report} />
//         <UiDrawer.Screen name='Login' component={Login} options={{swipeEnabled: false}} />
//         <UiDrawer.Screen name='Register' component={Register} options={{swipeEnabled: false}} />
//         <UiDrawer.Screen name='Search' component={Search} />
//         <UiDrawer.Screen name='Cart' component={Cart} />
//         <UiDrawer.Screen name='Wallet' component={Wallet} />
//         <UiDrawer.Screen name='OrderSuccess' component={OrderSuccess} />
//         <UiDrawer.Screen name='Feedback' component={Feedback} />
//         <UiDrawer.Screen name='OrderStatus' component={OrderStatus} />
//         <UiDrawer.Screen name='CategoryItems' component={CategoryItems} />
//         <UiDrawer.Screen name='CafeDensity' component={CafeDensity} />
//         <UiDrawer.Screen name='Orders' component={Orders} />
//         <UiDrawer.Screen name='Qrcode' component={Qrcode} />
//         <UiDrawer.Screen name="Venderlis" component={Venderlist} />

//         <UiDrawer.Screen name='ForgotPassword' component={ForgotPassword} options={{swipeEnabled: false}} />
//     </UiDrawer.Navigator>
// )  : (
//     <UiDrawer.Navigator  drawerPosition="right" drawerContent={(props) => <Drawer {...props} />}>
//         <UiDrawer.Screen name='Login' component={Login} options={{swipeEnabled: false}}/>
//         <UiDrawer.Screen name='Home' component={Home} />
//         <UiDrawer.Screen name="Venderlist" component={Venderlist} />
//         <UiDrawer.Screen name='Health' component={Health} />
//         <UiDrawer.Screen name='Report' component={Report} />
//         <UiDrawer.Screen name='Register' component={Register} options={{swipeEnabled: false}}/>
//         <UiDrawer.Screen name='Search' component={Search} />
//         <UiDrawer.Screen name='Cart' component={Cart} />
//         <UiDrawer.Screen name='Wallet' component={Wallet} />
//         <UiDrawer.Screen name='OrderSuccess' component={OrderSuccess} />
//         <UiDrawer.Screen name='Feedback' component={Feedback} />
//         <UiDrawer.Screen name='OrderStatus' component={OrderStatus} />
//         <UiDrawer.Screen name='CategoryItems' component={CategoryItems} />
//         <UiDrawer.Screen name='CafeDensity' component={CafeDensity} />
//         <UiDrawer.Screen name='Orders' component={Orders} />
//         <UiDrawer.Screen name='Qrcode' component={Qrcode} />
//         <UiDrawer.Screen name="Venderlis" component={Venderlist} />

//         <UiDrawer.Screen name='ForgotPassword' component={ForgotPassword} options={{swipeEnabled: false}} />
//     </UiDrawer.Navigator>
// )

const DrawerNavigator = ({ navigation, isLoggedIn }) => isLoggedIn ? (
    <UiDrawer.Navigator  drawerPosition="right" drawerContent={(props) => <Drawer {...props} />}>
        <UiDrawer.Screen name='Home' component={Home} />
        <UiDrawer.Screen name="Venderlist" component={Venderlist} />
        <UiDrawer.Screen name='Health' component={Health} />
        <UiDrawer.Screen name='Report' component={Report} />
        <UiDrawer.Screen name='Login' component={Login} />
        <UiDrawer.Screen name='Register' component={Register} />
        <UiDrawer.Screen name='Search' component={Search} />
        <UiDrawer.Screen name='Cart' component={Cart} />
        <UiDrawer.Screen name='Wallet' component={Wallet} />
        <UiDrawer.Screen name='OrderSuccess' component={OrderSuccess} />
        <UiDrawer.Screen name='Feedback' component={Feedback} />
        <UiDrawer.Screen name='OrderStatus' component={OrderStatus} />
        <UiDrawer.Screen name='CategoryItems' component={CategoryItems} />
        <UiDrawer.Screen name='CafeDensity' component={CafeDensity} />
        <UiDrawer.Screen name='Orders' component={Orders} />
        <UiDrawer.Screen name='Qrcode' component={Qrcode} />
        <UiDrawer.Screen name="Venderlis" component={Venderlist} />

        <UiDrawer.Screen name='ForgotPassword' component={ForgotPassword} />
    </UiDrawer.Navigator>
)  : (
    <UiStack.Navigator headerMode='none'>
        <UiStack.Screen name='Login' component={Login} />
        <UiStack.Screen name='Register' component={Register} />
        <UiStack.Screen name='ForgotPassword' component={ForgotPassword} />
        <UiStack.Screen name='Home' component={Home} />
    </UiStack.Navigator>
)


const Navigation = ({isLoggedIn}) => (
    <NavigationContainer>
        <DrawerNavigator isLoggedIn={isLoggedIn} />
    </NavigationContainer>
    )
    
export default Navigation