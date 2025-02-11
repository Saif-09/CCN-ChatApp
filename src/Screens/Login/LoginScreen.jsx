import React, { useState } from 'react';
import { 
    View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, Alert, ActivityIndicator 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../utils/theme/colors';
import { loginUser } from '../../redux/slices/authSlice';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please enter username and password.');
            return;
        }

        dispatch(loginUser({ username, password }))
            .unwrap()
            .then(() => {
                navigation.replace('Home');
            })
            .catch((err) => {
                Alert.alert('Login Failed', err);
            });
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.innerContainer}>
                <Image source={require('../../assets/images/ccnLogo.png')} style={styles.logo} />
                <Text style={[styles.title, { color: colors.primary }]}>Welcome Back!</Text>

                <TextInput
                    style={[styles.input, { backgroundColor: colors.secondary, borderColor: colors.border, color: colors.text }]}
                    placeholder="Username"
                    placeholderTextColor={colors.placeholder}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />

                <TextInput
                    style={[styles.input, { backgroundColor: colors.secondary, borderColor: colors.border, color: colors.text }]}
                    placeholder="Password"
                    placeholderTextColor={colors.placeholder}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={[styles.loginButton, { backgroundColor: colors.primary }]} onPress={handleLogin} disabled={loading}>
                    {loading ? <ActivityIndicator size="small" color={colors.secondary} /> : <Text style={[styles.loginButtonText, { color: colors.secondary }]}>Login</Text>}
                </TouchableOpacity>

                {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
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