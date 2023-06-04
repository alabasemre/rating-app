import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { Entypo, Ionicons, AntDesign } from '@expo/vector-icons';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AdminProductScreen from './screens/AdminProductScreen';
import AdminProductAddScreen from './screens/AdminProductAddScreen';

import { auth } from './firebase';
import ProfileScreen from './screens/ProfileScreen';

const StackNavigator = () => {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();

    function BottomTabs() {
        const navigation = useNavigation();

        useLayoutEffect(() => {
            navigation.setOptions({
                headerShown: true,
                title: 'Notunuverdim.com',
                headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white',
                },
                headerStyle: {
                    backgroundColor: '#003580',
                    height: 110,
                    borderBottomColor: 'transparent',
                    shadowColor: 'transparent',
                },
                headerRight: () => (
                    <Ionicons
                        name='ios-exit-outline'
                        size={24}
                        color='white'
                        style={{ marginRight: 12 }}
                        onPress={() => {
                            auth.signOut().then(() => {
                                console.log('Çıkış yapıldı');
                                navigation.navigate('Login');
                            });
                        }}
                    />
                ),
                headerBackVisible: false,
            });
        }, []);

        return (
            <Tab.Navigator>
                <Tab.Screen
                    name='Home'
                    component={HomeScreen}
                    options={{
                        tabBarLabel: 'Anasayfa',
                        headerShown: false,

                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Entypo name='home' size={24} color='#003580' />
                            ) : (
                                <AntDesign
                                    name='home'
                                    size={24}
                                    color='black'
                                />
                            ),
                    }}
                />
                <Tab.Screen
                    name='Profile'
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: 'Profil',
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Ionicons
                                    name='person'
                                    size={24}
                                    color='#003580'
                                />
                            ) : (
                                <Ionicons
                                    name='person-outline'
                                    size={24}
                                    color='black'
                                />
                            ),
                    }}
                />
            </Tab.Navigator>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='Login'
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='Register'
                    component={RegisterScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='Main'
                    component={BottomTabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='AdminProductAdd'
                    component={AdminProductAddScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='AdminProduct'
                    component={AdminProductScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigator;

const styles = StyleSheet.create({});
