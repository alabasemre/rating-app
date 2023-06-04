import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './StackNavigator';
import { useLayoutEffect } from 'react';

import { Ionicons } from '@expo/vector-icons';

import { auth } from './firebase';
import { useNavigation } from '@react-navigation/native';

export default function App() {
    return (
        <View style={styles.container}>
            <StackNavigator />
            <StatusBar style='auto' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
