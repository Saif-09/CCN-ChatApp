// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import colors from '../../utils/theme/colors';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Add your login logic here
        console.log('Email:', email);
        console.log('Password:', password);
        navigation.replace('Home'); // Navigate to the Home screen after login
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <View style={styles.innerContainer}>
                {/* Logo */}
                <Image
                    source={require('../../assets/images/ccnLogo.png')} // Replace with your logo
                    style={styles.logo}
                />

                {/* Title */}
                <Text style={[styles.title, { color: colors.primary }]}>Welcome Back!</Text>

                {/* Email Input */}
                <TextInput
                    style={[styles.input, { backgroundColor: colors.secondary, borderColor: colors.border, color: colors.text }]}
                    placeholder="Email"
                    placeholderTextColor={colors.placeholder}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                {/* Password Input */}
                <TextInput
                    style={[styles.input, { backgroundColor: colors.secondary, borderColor: colors.border, color: colors.text }]}
                    placeholder="Password"
                    placeholderTextColor={colors.placeholder}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                {/* Login Button */}
                <TouchableOpacity
                    style={[styles.loginButton, { backgroundColor: colors.primary }]}
                    onPress={handleLogin}
                >
                    <Text style={[styles.loginButtonText, { color: colors.secondary }]}>Login</Text>
                </TouchableOpacity>

                {/* Sign Up Link */}
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={[styles.signUpText, { color: colors.text }]}>
                        Don't have an account? <Text style={[styles.signUpLink, { color: colors.primary }]}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
    },
    loginButton: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    signUpText: {
        marginTop: 20,
    },
    signUpLink: {
        fontWeight: 'bold',
    },
});

export default LoginScreen;