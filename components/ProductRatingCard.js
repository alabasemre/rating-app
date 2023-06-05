import {
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    increment,
} from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Image,
    Text,
    Pressable,
} from 'react-native';
import { auth, db } from '../firebase';

import { Ionicons } from '@expo/vector-icons';
import Colors from '../contants/colors';

const rates = [1, 2, 3, 4, 5];

const ProductRatingCard = ({ title, review, score, url, id, userRated }) => {
    const [newRate, setNewRate] = useState(0);
    const [newScore, setNewScore] = useState(0);
    const [newReview, setNewReview] = useState(0);

    const user = auth.currentUser.uid;

    useEffect(() => {
        setNewRate(userRated || 0);
        setNewScore(score);
        setNewReview(review);
    }, []);

    const setRate = async (rate) => {
        const userRef = doc(db, 'users', user);
        const incReview = userRated !== undefined ? 0 : 1;
        const incScore = userRated !== undefined ? rate - userRated : rate;
        const ref = doc(db, 'products', id);

        await updateDoc(
            ref,
            {
                [`rates.${user}`]: rate,
                review: increment(incReview),
                score: increment(incScore),
            },
            {
                merge: true,
            }
        );

        await updateDoc(userRef, {
            [`rated.${id}`]: rate,
        });

        setNewRate(rate);
        setNewScore(score + incScore);
        setNewReview(review + incReview);
    };

    return (
        <View style={styles.productContainer}>
            <Image source={{ uri: url }} style={styles.productImg} />
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{title}</Text>
                <Text style={styles.ratingInfo}>{newReview} Değerlendirme</Text>
                <Text style={styles.ratingInfo}>
                    {newReview === 0 ? 0 : (newScore / newReview).toFixed(2)}{' '}
                    Puan
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        gap: 5,
                        marginTop: 10,
                    }}
                >
                    {rates.map((id) => {
                        return (
                            <Pressable
                                key={id}
                                onPress={() => {
                                    setRate(id);
                                }}
                            >
                                <View
                                    style={[
                                        styles.btnScore,
                                        newRate === id
                                            ? { backgroundColor: 'orange' }
                                            : '',
                                    ]}
                                >
                                    <Text style={styles.btnScoreText}>
                                        {id}
                                    </Text>
                                </View>
                            </Pressable>
                        );
                    })}
                </View>
            </View>
        </View>
    );
};

export default ProductRatingCard;

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
