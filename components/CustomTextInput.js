import React from 'react';
import { Text, TextInput, View } from 'react-native/types';

const CustomTextInput = ({ title, value, setValue, placeholder }) => {
    return (
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
    );
};

export default CustomTextInput;
