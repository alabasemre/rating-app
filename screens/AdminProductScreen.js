import { useEffect, useLayoutEffect, useState } from 'react';
import {
    Alert,
    Button,
    FlatList,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../firebase';
import ProductCardAdmin from '../components/ProductCardAdmin';
import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore';

const dummyProducts = [
    { id: 1, title: 'Xiaomi T9', review: 88, score: 4.7 },
    { id: 2, title: 'Xiaomi T9', review: 88, score: 4.7 },
    { id: 3, title: 'Xiaomi T9', review: 88, score: 4.7 },
    { id: 4, title: 'Xiaomi T9', review: 88, score: 4.7 },
    { id: 5, title: 'Xiaomi T9', review: 88, score: 4.7 },
    { id: 6, title: 'Xiaomi T9', review: 88, score: 4.7 },
    { id: 7, title: 'Xiaomi T9', review: 88, score: 4.7 },
];

const AdminProductScreen = () => {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProd = async () => {
            await fetchProducts();
        };

        fetchProd();
    }, []);

    const fetchProducts = async () => {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push({ ...doc.data(), id: doc.id });
        });

        setProducts(items);
    };

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

    const deleteProduct = (id) => {
        Alert.alert(
            'İŞLEM ONAYI !',
            'Ürünü Silmek İstiyor Musunuz?',
            [
                {
                    text: 'İptal',
                    onPress: () => {},
                    style: 'cancel',
                },
                {
                    text: 'Evet',
                    onPress: async () => {
                        await deleteDoc(doc(db, 'products', id))
                            .then(() => {
                                Alert.alert(
                                    'Başarılı',
                                    'Silme Başarılı',
                                    [{ text: 'Tamam', onPress: () => {} }],
                                    { cancelable: false }
                                );
                            })
                            .then(() => {
                                fetchProducts();
                            });
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <SafeAreaView>
            {products.length > 0 && (
                <FlatList
                    data={products}
                    renderItem={(productData) => {
                        return (
                            <ProductCardAdmin
                                title={productData.item.productName}
                                review={productData.item.review}
                                score={productData.item.score}
                                url={productData.item.url}
                                onPress={() =>
                                    deleteProduct(productData.item.id)
                                }
                            />
                        );
                    }}
                    keyExtractor={(item) => item.id}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'row',
        padding: 10,
        gap: 10,
        margin: 10,
    },
    productImg: {
        height: 80,
        width: 80,
        borderRadius: 10,
    },
    productInfo: {
        justifyContent: 'space-around',
        flex: 1,
    },
    productName: {
        fontWeight: 700,
        fontSize: 18,
    },
});

export default AdminProductScreen;
