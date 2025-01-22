// SplashScreen.js
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar, SafeAreaView } from 'react-native';

const SplashScreen = ({ }) => {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Login');
        }, 3000); // 3 seconds delay
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden />
            <View style={{ width: 280, height: 280, overflow: 'hidden' }}>
                <Image
                    source={require('../../assets/images/ccnLogo.png')}
                    style={styles.image}
                />
            </View>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

export default SplashScreen;