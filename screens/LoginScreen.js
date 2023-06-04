import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Colors from '../contants/colors';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const login = () => {
        signInWithEmailAndPassword(auth, email, password).then(
            (userCredential) => {
                const user = userCredential.user;
            }
        );
    };

    useEffect(() => {
        try {
            const unsubscribe = auth.onAuthStateChanged((authUser) => {
                if (authUser) {
                    navigation.replace('Main');
                }
            });

            return unsubscribe;
        } catch (e) {
            console.log(e);
        }
    }, []);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: 'white',
                padding: 10,
                alignItems: 'center',
            }}
        >
            <KeyboardAvoidingView>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 130,
                    }}
                >
                    <Text
                        style={{
                            color: '#003580',
                            fontSize: 17,
                            fontWeight: '700',
                        }}
                    >
                        Giriş Yap
                    </Text>

                    <Text
                        style={{
                            marginTop: 15,
                            fontSize: 18,
                            fontWeight: '500',
                        }}
                    >
                        Hesabınıza Giriş Yapın
                    </Text>
                </View>

                <View style={{ marginTop: 50 }}>
                    <View>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: '600',
                                color: 'gray',
                            }}
                        >
                            E-Posta
                        </Text>

                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholder='E-Posta Adresi'
                            placeholderTextColor={'black'}
                            style={styles.textInput}
                        />
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: '600',
                                color: 'gray',
                            }}
                        >
                            Şifre
                        </Text>

                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            placeholder='Şifre'
                            placeholderTextColor={'black'}
                            style={styles.textInput}
                        />
                    </View>
                </View>

                <Pressable
                    onPress={login}
                    style={{
                        width: 200,
                        backgroundColor: Colors.primary,
                        padding: 15,
                        borderRadius: 7,
                        marginTop: 50,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            color: 'white',
                            fontSize: 17,
                            fontWeight: 'bold',
                        }}
                    >
                        Giriş Yap
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('Register')}
                    style={{ marginTop: 20 }}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            color: 'gray',
                            fontSize: 17,
                        }}
                    >
                        Bir hesabın yok mu?{' '}
                        <Text style={styles.signUpText}> Kayıt Ol</Text>
                    </Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    textInput: {
        fontSize: 18,
        borderColor: Colors.primary,
        borderBottomWidth: 1,
        borderRadius: 3,
        marginVertical: 10,
        width: 300,
        height: 50,
        paddingHorizontal: 5,
    },
    signUpText: {
        fontWeight: '700',
        color: Colors.primary,
    },
});
