// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import Home from './screens/home';
// import Find from './screens/find';
// import LoginForm from './screens/loginForm';
// import RegisterForm from './screens/registerForm';
// import InsectiDex from './screens/insectiDex';
// import Myinsects from './screens/myinsects';
// import Details from './screens/details';
// import Map from './screens/map';

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// function MainNavigation() {
//     return (
//         <Tab.Navigator>
//             <Tab.Screen name="Home" component={Home} options={{ headerShown: false, tabBarVisible: false }} />
//             <Tab.Screen name="Find" component={Find} />
//             <Tab.Screen name="InsectiDex" component={InsectiDex} />
//             <Tab.Screen name="My Insects" component={Myinsects} />
//         </Tab.Navigator>
//     )
// }



// export default function App() {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen name="Main" component={MainNavigation} options={{ headerShown: false }} />
//             <Stack.Screen name="Login" component={LoginForm} />
//             <Stack.Screen name="Register" component={RegisterForm} />
//             <Stack.Screen name="Detail" component={Details} />
//             <Stack.Screen name="Snap" component={Map} />
//         </Stack.Navigator>
//     );
// }



import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Home from './screens/home';
import Find from './screens/find';
import LoginForm from './screens/loginForm';
import RegisterForm from './screens/registerForm';
import InsectiDex from './screens/insectiDex';
import Myinsects from './screens/myinsects';
import Details from './screens/details';
import Map from './screens/map';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainNavigation() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#77B71C',
                tabBarInactiveTintColor: 'gray',
                style: {
                    display: 'flex'
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Find') {
                        iconName = focused ? 'search' : 'search-outline';
                    } else if (route.name === 'InsectiDex') {
                        iconName = focused ? 'book' : 'book-outline';
                    } else if (route.name === 'My Insects') {
                        iconName = focused ? 'bug' : 'bug-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Find" component={Find} />
            <Tab.Screen name="InsectiDex" component={InsectiDex} />
            <Tab.Screen name="My Insects" component={Myinsects} />
        </Tab.Navigator>
    )
}

export default function App() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={MainNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginForm} />
            <Stack.Screen name="Register" component={RegisterForm} />
            <Stack.Screen name="Detail" component={Details} />
            <Stack.Screen name="Snap" component={Map} />
        </Stack.Navigator>
    );
}
