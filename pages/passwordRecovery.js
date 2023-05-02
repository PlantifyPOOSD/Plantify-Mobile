import React, { useState, useEffect } from 'react';
import {View, Text, ImageBackground, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from '../styles/passwordRecoveryStyle';
import {getAuth, sendPasswordResetEmail} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

function PasswordRecovery(){
    const auth = getAuth();
    const navigation = useNavigation();
    const [email,setEmail] = React.useState("");

    const [successfulLogin, setSuccessfulLogin] = React.useState(false);

    const passwordReset = () =>{
        sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log("email sent successfuly");

            // Set the login in order to show the message
            setSuccessfulLogin(true);
            // Have a 2 second delay 
            const secondsDelay = 2;
            setTimeout(() => setSuccessfulLogin(false), secondsDelay * 1000);
            setTimeout(() => navigation.navigate("login"), (secondsDelay) * 1000);
            console.log("successful Login: " + successfulLogin);
        })
        .catch((error) => {
            console.log(error.message);
        });
    }

    return(
            <View style={styles.passwordRecPage}>
                <ImageBackground source={require("../img/Monstera_half.png")} style={styles.backgroundImage}>
                    <View style={styles.verifyContainer}>
                        <View style={styles.verifyBox}>
                            <Text style={{fontSize: 28, fontFamily: 'Kabel-Black',marginBottom: 10,}}>Forgot your password?</Text>
                            <Text style={{alignSelf: 'center', fontSize: 14, marginBottom: 10,}}>Enter your email below to reset your password</Text>
                            <TextInput
                                style={styles.passwordInput}
                                onChangeText={setEmail}
                                value={email}
                                placeholder="example@gmail.com">
                            </TextInput>
                            <TouchableOpacity onPress={passwordReset} style={styles.submitBtn}>
                                <Text style={styles.submitTxt}>Submit</Text>
                            </TouchableOpacity>
                            {
                                successfulLogin && <Text style={styles.resetWords}>Reset email sent. Going to Login page</Text>
                            }
                        </View> 
                    </View>
                </ImageBackground>
            </View>
    )
};

export default PasswordRecovery;