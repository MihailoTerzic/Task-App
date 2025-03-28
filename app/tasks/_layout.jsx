import { Ionicons } from '@expo/vector-icons';
import { Stack, Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Layout = () => {
return (
    <Tabs screenOptions={{ headerShown: false,  tabBarShowLabel: false,}}>
        <Tabs.Screen name='index' options={{ title: 'Dashboard', tabBarIcon: ({focused}) => (focused ? <Ionicons name='bar-chart'
        color={'blue'} size={24} /> : <Ionicons name='bar-chart-outline'
        color={'blue'} size={24} /> )}}/>
        <Tabs.Screen name='calendar' options={{ title: 'Calendar', tabBarIcon: ({focused}) => (focused ? <Ionicons name='calendar-number'
        color={'blue'} size={24} /> : <Ionicons name='calendar-number-outline'
        color={'blue'} size={24} /> )}}/>
        <Tabs.Screen name='[date]' options={{ title: 'DayTask', tabBarIcon: ({focused}) => (focused ? <Ionicons name='checkbox'
        color={'blue'} size={24} /> : <Ionicons name='checkbox-outline'
        color={'blue'} size={24} /> )}}/>
        
        
    </Tabs>
)
}

const styles = StyleSheet.create({})

export default Layout;
