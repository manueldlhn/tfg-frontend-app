import React, { useContext, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import * as Yup from "yup";
import jwtDecode from 'jwt-decode';


import { ErrorMessage, Form, FormField, SubmitButton } from '../components/forms';
import Screen from '../components/Screen';
import colors from '../config/colors';
import authApi from '../api/auth';
import AuthContext from '../auth/context';
import authStorage from '../auth/storage';
import useAuth from '../auth/useAuth';

const validationSchema = Yup.object().shape({
    Email: Yup.string().required().email().label("Email"),
    Password: Yup.string().required().min(4).label("Password"),
});


function LoginScreen(props) {
    const auth = useAuth();
    const [loginFailed, setLoginFailed] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async ({Email, Password}) => {
        const result = await authApi.login(Email, Password);
        if(!result.ok || !result.data.ok) {
            setLoginFailed(true);
            return setError(result.data.message);
        }
        setLoginFailed(false);
        setError('');
        auth.logIn(result.data.accessToken);
    }
    return (
        <Screen style={styles.container}>
            <Image 
                style={styles.logo}
                source={require('../assets/logo.png')} 
            />
            <Form
                initialValues={{Email:"", Password: ""}}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <ErrorMessage error={error} visible={loginFailed} /> 
                <FormField 
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="email"
                    keyboardType="email-address"
                    name="Email"
                    placeholder="Correo Electrónico"
                    textContentType="emailAddress" // Solo para iOS
                />
                <FormField 
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="lock"
                    name="Password"
                    placeholder="Contraseña"
                    secureTextEntry
                    textContentType="password" // Sólo para iOS
                />
                <SubmitButton title="Iniciar Sesión"/>
            </Form>
                
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    logo:{
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20,
        backgroundColor: colors.primary,
        borderRadius: 40,
    },
})

export default LoginScreen;