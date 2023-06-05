import { useLayoutEffect, useState } from 'react';
import {
    Alert,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    TouchableWithoutFeedbackBase,
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../contants/colors';
import { useHeaderHeight } from '@react-navigation/elements';
import CustomButton from '../components/CustomButton';
import * as ImagePicker from 'expo-image-picker';

import { auth, db, firebase } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const dummyProducts = [
    { id: 1, title: 'Xiaomi T9', review: 88, score: 4.7 },
    { id: 2, title: 'Xiaomi T9', review: 88, score: 4.7 },
    { id: 3, title: 'Xiaomi T9', review: 88, score: 4.7 },
    { id: 4, title: 'Xiaomi T9', review: 88, score: 4.7 },
    { id: 5, title: 'Xiaomi T9', review: 88, score: 4.7 },
    { id: 6, title: 'Xiaomi T9', review: 88, score: 4.7 },
    { id: 7, title: 'Xiaomi T9', review: 88, score: 4.7 },
];

const AdminProductAddScreen = () => {
    const [productName, setProductName] = useState('');
    const [productInfo, setProductInfo] = useState('');
    const [image, setImage] = useState(null);

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
            headerLeft: () => (
                <Ionicons
                    name='person'
                    size={24}
                    color='white'
                    style={{ marginRight: 10 }}
                    onPress={() => navigation.navigate('Profile')}
                />
            ),
        });
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImage = async () => {
        const filename = image.substring(image.lastIndexOf('/') + 1);

        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', image, true);
            xhr.send(null);
        });
        const ref = firebase
            .storage()
            .ref()
            .child(`Products/` + filename);
        const snapshot = ref.put(blob);
        snapshot.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            () => {},
            (error) => {
                console.log(error);
                blob.close();
                return;
            },
            () => {
                snapshot.snapshot.ref.getDownloadURL().then((url) => {
                    updateProductDb(url);
                    blob.close();
                    return url;
                });
            }
        );
    };

    const updateProductDb = (url) => {
        setDoc(
            doc(db, 'products', productName.split(' ').join('').toLowerCase()),
            {
                productName: productName,
                productInfo: productInfo,
                url: url,
                review: 0,
                score: 0,
            }
        ).then(() => {
            Alert.alert(
                'Başarılı',
                'Ekleme Başarılı',
                [{ text: 'Tamam', onPress: () => {} }],
                { cancelable: false }
            );

            navigation.navigate('AdminProduct');
        });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <Text
                            style={{
                                fontSize: 32,
                                fontWeight: 700,
                                marginTop: 20,
                            }}
                        >
                            Ürün Ekleme Paneli
                        </Text>
                        <View style={styles.imgContainer}>
                            <Image
                                source={
                                    image !== null
                                        ? {
                                              uri: image,
                                          }
                                        : require('../images/dummy/dummy_product.png')
                                }
                                style={{
                                    height: 200,
                                    width: 200,
                                    borderRadius: 50,
                                }}
                            ></Image>

                            <Ionicons
                                name='camera-sharp'
                                size={40}
                                color={Colors.primary}
                                style={{ marginTop: 12 }}
                                onPress={pickImage}
                            />
                        </View>

                        <View>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: '600',
                                    color: 'gray',
                                }}
                            >
                                Ürün Adı
                            </Text>

                            <TextInput
                                value={productName}
                                onChangeText={(text) => setProductName(text)}
                                placeholder='Ürün Adı'
                                placeholderTextColor={'black'}
                                style={styles.textInput}
                            />
                        </View>

                        <View>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: '600',
                                    color: 'gray',
                                }}
                            >
                                Ürün Açıklaması
                            </Text>

                            <TextInput
                                value={productInfo}
                                multiline={true}
                                numberOfLines={6}
                                onChangeText={(text) => setProductInfo(text)}
                                style={[
                                    styles.textInput,
                                    {
                                        height: 100,
                                        borderWidth: 1,
                                        borderRadius: 10,
                                    },
                                ]}
                            />
                        </View>

                        <CustomButton
                            text={'Ürün Ekle'}
                            onPress={uploadImage}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    imgContainer: {
        marginTop: 20,
        alignItems: 'center',
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

export default AdminProductAddScreen;
