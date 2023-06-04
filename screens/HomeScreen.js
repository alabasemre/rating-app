import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    Pressable,
} from 'react-native';

const HomeScreen = () => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: 'white',
                padding: 10,
                alignItems: 'center',
            }}
        >
            <KeyboardAvoidingView></KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});
