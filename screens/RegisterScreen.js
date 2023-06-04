import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    Pressable,
    TextInput,
    Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import Colors from '../contants/colors';

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const navigation = useNavigation();

    const register = () => {
        if (email === '' || password === '' || userName === '') {
            Alert.alert(
                'Hatalı Giriş',
                'Lütfen form alanlarını doldurun.',
                [
                    {
                        text: 'İptal',
                        onPress: () => {},
                        style: 'cancel',
                    },
                    { text: 'Tamam', onPress: () => {} },
                ],
                { cancelable: false }
            );
            return;
        }

        if (userName.length < 4) {
            Alert.alert(
                'Hatalı Giriş',
                'Kullanıcı Adı 4 karakterden kısa olamaz',
                [
                    {
                        text: 'İptal',
                        onPress: () => {},
                        style: 'cancel',
                    },
                    { text: 'Tamam', onPress: () => {} },
                ],
                { cancelable: false }
            );
            return;
        }

        if (password.length < 6) {
            Alert.alert(
                'Hatalı Giriş',
                'Şifre 6 karakterden kısa olamaz',
                [
                    {
                        text: 'İptal',
                        onPress: () => {},
                        style: 'cancel',
                    },
                    { text: 'Tamam', onPress: () => {} },
                ],
                { cancelable: false }
            );
            return;
        }

        createUserWithEmailAndPassword(auth, email, password).then(
            (userCredentials) => {
                const user = userCredentials._tokenResponse.email;
                const uid = auth.currentUser.uid;

                setDoc(doc(db, 'users', `${uid}`), {
                    email: user,
                    username: userName,
                    role: 'user',
                    pic: '',
                });
            }
        );
    };

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
                        marginTop: 100,
                    }}
                >
                    <Text
                        style={{
                            color: '#003580',
                            fontSize: 17,
                            fontWeight: '700',
                        }}
                    >
                        Kayıt Ol
                    </Text>

                    <Text
                        style={{
                            marginTop: 15,
                            fontSize: 18,
                            fontWeight: '500',
                        }}
                    >
                        Hesap Oluştur
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
                            Kullanıcı Adı
                        </Text>

                        <TextInput
                            value={userName}
                            onChangeText={(text) => setUserName(text)}
                            placeholder='Kullanıcı adı'
                            placeholderTextColor={'gray'}
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
                            E-Posta
                        </Text>

                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholder='E-posta adresi'
                            placeholderTextColor={'gray'}
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
                            placeholderTextColor={'gray'}
                            style={styles.textInput}
                        />
                    </View>
                </View>

                <Pressable
                    onPress={register}
                    style={{
                        width: 200,
                        backgroundColor: '#003580',
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
                        Kayıt Ol
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.goBack()}
                    style={{ marginTop: 20 }}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            color: 'gray',
                            fontSize: 17,
                        }}
                    >
                        Zaten bir hesabın var mı?
                        <Text style={styles.signInText}> Giriş Yap</Text>
                    </Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    signInText: {
        fontWeight: '700',
        color: Colors.primary,
    },
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
});
