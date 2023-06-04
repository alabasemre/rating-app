import React, { useEffect, useState } from 'react';
import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Entypo, Ionicons, AntDesign } from '@expo/vector-icons';

import { auth, db, firebase } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

import Colors from '../contants/colors';
import CustomButton from '../components/CustomButton';

const ProfileScreen = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfile] = useState('');
    const [role, setRole] = useState('user');
    const [image, setImage] = useState(null);

    const navigator = useNavigation();

    const currentUser = auth.currentUser.uid;

    useEffect(() => {
        const fetchUserData = async () => {
            const docRef = doc(db, 'users', currentUser);
            const docsSnap = (await getDoc(docRef)).data();

            setUserName(docsSnap.username);
            setEmail(docsSnap.email);
            setProfile(docsSnap.pic);
            setRole(docsSnap.role);
        };

        fetchUserData();
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

            await uploadImage();
        }
    };

    const uploadImage = async () => {
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
            .child(`Pictures/` + currentUser);
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
                    setProfile(url);
                    // console.log('basarili:', url);
                    updateDb();
                    blob.close();
                    return url;
                });
            }
        );
    };

    const updateDb = async () => {
        const ref = doc(db, 'users', currentUser);

        await updateDoc(ref, {
            pic: profilePic,
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image
                    source={
                        profilePic !== ''
                            ? {
                                  uri: profilePic,
                              }
                            : require('../images/dummy/dummy.png')
                    }
                    style={{ height: 200, width: 200, borderRadius: 50 }}
                ></Image>

                <Ionicons
                    name='camera-sharp'
                    size={40}
                    color={Colors.primary}
                    style={{ marginTop: 12 }}
                    onPress={pickImage}
                />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoHeader}>Kullanıcı Adı</Text>
                <Text style={styles.infoText}>{userName}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoHeader}>E-Posta Adresi</Text>
                <Text style={styles.infoText}>{email}</Text>
            </View>
            {role === 'admin' ? (
                <>
                    <CustomButton
                        text={'Ürün Listesi'}
                        onPress={() => {
                            navigator.navigate('AdminProduct');
                        }}
                    />

                    <CustomButton
                        text={'Ürün Ekle'}
                        onPress={() => {
                            navigator.navigate('AdminProductAdd');
                        }}
                    />
                </>
            ) : (
                ''
            )}
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    imgContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    infoContainer: {
        width: '80%',
        marginTop: 25,
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1,
        borderRadius: 3,
    },
    infoHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    infoText: {
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
    },
});
