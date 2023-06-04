import Colors from '../contants/colors';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const CustomButton = ({ onPress, text }) => {
    return (
        <View>
            <Pressable
                onPress={onPress}
                style={{
                    width: 200,
                    backgroundColor: Colors.primary,
                    padding: 15,
                    borderRadius: 7,
                    marginTop: 30,
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
                    {text}
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({});

export default CustomButton;
