import React, { useState } from 'react';
import { View, Text, TextInput, ImageBackground } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../styles/registerStyle';
import {useNavigation} from '@react-navigation/native';
const URL = "https://us-central1-plantify-d36ed.cloudfunctions.net/server";

function Register() {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordReq, setPasswordReq] = useState('');
    const [showReq, setShowReq] = useState(false);
    const navigation = useNavigation();

    const handleRegister = () => {
        setErrorMessage('');

        if (!isValidEmail(email)) {
          setErrorMessage('Invalid email address');
          return;
        }
        if(!isValidPassword(password)){
            setErrorMessage('Invalid password, Please see requirements');
            return;
        }

        fetch(URL + "/registerUser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password,
        })
        })
        .then(response => response.json())
        .then(data => {
            const uid = data.userId;
            setFirstName('');
            setLastName('');
            setEmail('');
            setUsername('');
            setPassword('');
            navigation.navigate("verifyEmail", {user: uid, email: email});
        })
        .catch(error => console.log(error.message));
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

    const isValidPassword = (password) =>{
        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;
        return passwordRegex.test(password);
    }
    
    const checkPasswordReq = () =>{
        const secondsDelay = 5;
        setShowReq(true);
        setPasswordReq("Must be 8-32 characters long\nMust contain one uppercase letter\nMust contain at least 1 number\nMust contain at least 1 special character");
    }
    const handleBlur = () =>{
        setShowReq(false);
    }
    return (
        <View style={styles.registerPage}>
                <ImageBackground source={require('../img/Monstera_half.png')} style={styles.backgroundImage}>
                    <View style={styles.registerContainer}>
                <View style={styles.registerBox}>
                    <View style={styles.registerHeader}>
                        <Text style={styles.plantifyHeader}>Plantify.</Text>
                        <Text style={styles.headerSubtext}>Sign in to get started using Plantify</Text>
                    </View>

                    <View style={styles.registerInput}>
                        <Text>First Name</Text>
                        <TextInput
                            style={styles.firstNameInput}
                            onChangeText={setFirstName}
                            value={firstName}
                        />

                        <Text>Last Name</Text>
                        <TextInput
                            style={styles.lastNameInput}
                            onChangeText={setLastName}
                            value={lastName}
                        />
                        
                        <Text>Email Address</Text>
                        <TextInput
                            style={styles.emailInput}
                            onChangeText={setEmail}
                            value={email}
                        />

                        <Text>UserName</Text>
                        <TextInput
                            style={styles.usernameInput}
                            onChangeText={setUsername}
                            value={username}
                        />

                        <Text>Password</Text>
                        <TextInput
                            style={styles.passwordInput}
                            onChangeText={setPassword}
                            value={password}
                            secureTextEntry={true}
                            onFocus={checkPasswordReq}
                            onBlur={handleBlur}
                        />
                        {showReq ? (
                            <Text style={styles.passwordReqs}>{passwordReq}</Text>
                        ) : null}

                        {errorMessage ? (
                        <Text style={styles.errorMessage}>{errorMessage}</Text>
                        ) : null}

                        <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
                            <Text style={styles.registerText}>Register</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('login')} style={styles.registerLink}>
                        <Text>Already have an account?</Text>
                    </TouchableOpacity>
                </View>
                </View>
                </ImageBackground>
            </View>
    );
}

export default Register;