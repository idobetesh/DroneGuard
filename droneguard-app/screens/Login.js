import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

import Loader from '../components/Loader.js';
import Api from '../api/api-requests.js';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        if (email && password) {
            const response = await Api.login({ email, password });
            if (response) {
                console.log(response);
            }
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                DroneGuard
            </Text>
            <StatusBar style='auto' />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    keyboardType='email-address'
                    placeholder='Enter email'
                    value={email}
                    placeholderTextColor='#003f5c'
                    onChangeText={(email) => setEmail(email)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    secureTextEntry={true}
                    value={password}
                    placeholder='Enter password'
                    placeholderTextColor='#003f5c'
                    onChangeText={(pw) => setPassword(pw)}
                />
            </View>
            <TouchableOpacity>
                <Button
                    style={styles.loginBtn}
                    onPress={onSubmit}
                    title="Login"
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 50,
        fontFamily: 'lucida grande',
        marginBottom: 90
    },
    inputView: {
        backgroundColor: '#72ab98',
        borderRadius: 30,
        width: '70%',
        height: 45,
        marginBottom: 20,
        alignItems: 'center',
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 20,
        paddingVertical: 10,
        marginLeft: 5,
    },
    loginBtn: {
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 50,
        paddingHorizontal: 10,
    },
});

export default Login;
