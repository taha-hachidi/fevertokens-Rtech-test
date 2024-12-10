import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    ImageBackground,
    Image,
    StyleSheet
} from 'react-native';

const TemplateLoginRegister = ({ navigation, choice }) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        navigation.navigate('Main');
    };

    return (
        <ImageBackground source={require('../assets/Login.png')} style={styles.background}>
            <View style={styles.formContainer}>
                <Image
                    style={styles.image}
                    source={require('../assets/logo.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUserName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <Button color="#BF0426" title="Log In" onPress={handleSubmit} />
                <Text style={styles.loginLink}>
                    Don't have an account?{' '}
                    <Text onPress={() => navigation.navigate(choice)} style={styles.loginLinkText}>
                        {choice} here
                    </Text>
                </Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        width: '80%',
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
    },
    image: {
        width: 250,
        height: 89,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderBottomWidth: 2,
        borderColor: '#f5002d',
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    loginLink: {
        marginTop: 10,
        textAlign: 'center',
    },
    loginLinkText: {
        color: '#f5002d',
        fontWeight: 'bold',
    },
});

export default TemplateLoginRegister;
