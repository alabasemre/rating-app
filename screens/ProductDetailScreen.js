import { useEffect, useLayoutEffect, useState } from 'react';
import {
    Alert,
    Button,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Colors from '../contants/colors';
import ProductRatingCard from '../components/ProductRatingCard';

const ProductDetailScreen = ({ route }) => {
    const navigation = useNavigation();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const docRef = doc(db, 'products', route.params.id);
            const docsSnap = (await getDoc(docRef)).data();

            setProduct(docsSnap);
        };

        fetchProduct();
    }, [route.params]);

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
                    name='home'
                    size={24}
                    color='white'
                    style={{ marginRight: 10 }}
                    onPress={() => navigation.navigate('Main')}
                />
            ),
        });
    }, []);

    return (
        <SafeAreaView>
            {product && (
                <>
                    <ProductRatingCard
                        title={product.productName}
                        review={product.review}
                        score={product.score}
                        url={product.url}
                        id={product.id}
                        userRated={route.params.userRated}
                    />

                    <View style={styles.productDetail}>
                        <Text style={styles.productDetailHeader}>
                            Ürün Açıklaması
                        </Text>
                        <Text style={styles.productDetailText}>
                            {product.productInfo}
                        </Text>
                    </View>
                </>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        gap: 10,
        margin: 10,
    },
    productImg: {
        height: 140,
        width: 140,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    productDetailHeader: {
        color: Colors.primary,
        fontSize: 24,
        fontWeight: 'bold',
        borderBottomColor: Colors.primary,
        borderBottomWidth: 3,
        padding: 5,
    },
    productDetailText: {
        padding: 5,
        fontSize: 16,
    },
    productText: {
        fontSize: 18,
    },
    productName: {
        fontWeight: 700,
        fontSize: 24,
    },
    productDetail: {
        margin: 10,
    },
});

export default ProductDetailScreen;
