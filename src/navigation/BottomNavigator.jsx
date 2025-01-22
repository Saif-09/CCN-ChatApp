// BottomNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import History from '../Screens/History/HistoryScreen';
import TicketsScreen from '../Screens/Home/Tickets/TicketsScreen';
import SettingsScreen from '../Screens/Settings/SettingsScreen';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Tickets') {
                        iconName = focused ? 'list' : 'list-outline';
                    } else if (route.name === 'History') {
                        iconName = focused ? 'checkmark-done' : 'checkmark-done-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#1E90FF', // Active tab color
                tabBarInactiveTintColor: '#999', // Inactive tab color
                tabBarStyle: {
                    backgroundColor: '#FFFFFF', // Tab bar background color
                    borderTopWidth: 1,
                    borderTopColor: '#DDD',
                },
            })}
        >
            <Tab.Screen
                name="Tickets"
                component={TicketsScreen}
                options={{ title: 'Tickets', headerShown: false }}
            />
            <Tab.Screen
                name="History"
                component={History}
                options={{ title: 'Closed Tickets', headerShown: false }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ title: 'Settings', headerShown: false }}
            />
        </Tab.Navigator>
    );
};

export default BottomNavigator;