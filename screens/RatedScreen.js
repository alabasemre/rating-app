import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    RefreshControl,
    FlatList,
    Text,
} from 'react-native';
import { auth, db } from '../firebase';

import Colors from '../contants/colors';
import ProductRatingCard from '../components/ProductRatingCard';

const RatedScreen = () => {
    const [products, setProducts] = useState([]);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        fetchProducts();
    }, []);

    const user = auth.currentUser.uid;

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setRefreshing(true);
        setProducts([]);
        const userRef = doc(db, 'users', user);
        const docsSnap = (await getDoc(userRef)).data();

        const items = [];

        for (const item in docsSnap.rated) {
            const productRef = doc(db, 'products', item);
            const productSnap = (await getDoc(productRef)).data();

            items.push(productSnap);
        }

        setProducts(items);
        setRefreshing(false);
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: 'white',
                padding: 10,
            }}
        >
            {products.length > 0 && (
                <FlatList
                    data={products}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    renderItem={(productData) => {
                        const isRated = productData.item?.rates?.[user];

                        return (
                            <ProductRatingCard
                                title={productData.item.productName}
                                review={productData.item.review}
                                score={productData.item.score}
                                url={productData.item.url}
                                id={productData.item.id}
                                userRated={isRated}
                                fetchProducts={fetchProducts}
                            />
                        );
                    }}
                    keyExtractor={(item) => {
                        return item.productName
                            .split(' ')
                            .join('')
                            .toLowerCase();
                    }}
                />
            )}
        </SafeAreaView>
    );
};

export default RatedScreen;

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'row',
        padding: 10,
        gap: 10,
        margin: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderBottomColor: Colors.primary,
        borderBottomWidth: 2,
        borderRadius: 9,
    },
    productImg: {
        height: 95,
        width: 95,
        borderRadius: 7,
    },
    productInfo: {
        justifyContent: 'space-around',
        flex: 1,
    },
    productName: {
        fontWeight: 700,
        fontSize: 18,
    },
    btnScore: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        width: 40,
        height: 24,
        borderRadius: 10,
    },
    btnScoreText: {
        color: '#fff',
        fontWeight: 600,
        fontSize: 16,
    },
});
