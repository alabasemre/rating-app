import Colors from '../contants/colors';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProductCardAdmin = ({ onPress, title, review, score, url }) => {
    return (
        <View style={styles.productContainer}>
            <Image source={{ uri: url }} style={styles.productImg} />
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{title}</Text>
                <Text style={styles.ratingInfo}>{review} Değerlendirme</Text>
                <Text style={styles.ratingInfo}>
                    {review === 0 ? 0 : (score / review).toFixed(2)}
                    Puan
                </Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons
                    name='close-circle'
                    size={42}
                    color={Colors.primary}
                    onPress={onPress}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'row',
        padding: 10,
        gap: 10,
        margin: 6,

        borderBottomColor: Colors.primary,
        borderWidth: 1,
        borderBottomWidth: 2,
        borderRadius: 10,
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

export default ProductCardAdmin;
