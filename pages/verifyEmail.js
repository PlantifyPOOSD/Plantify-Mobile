import React, { useEffect } from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import { ScrollView} from 'react-native-gesture-handler';
import styles from '../styles/verifyEmailStyle.js';
import {getAuth, sendEmailVerification, sendSignInLinkToEmail} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

function VerifyEmail({route}){
    const navigation = useNavigation();
    const auth = getAuth();
    const {user, email} = route.params;
    console.log("email: " + email);

    const onScreenLoad = () =>{
        sendEmail();
    }
    useEffect(() => {
        onScreenLoad();
    }, [])

    const actionCodeSettings = {
        url: "https://plantify-d36ed.firebaseapp.com",
        handleCodeInApp: true,
    }
    
    const sendEmail = () =>{
        sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() =>{
            console.log("link sent successfuly");
        })
        .catch((error) =>{
            console.log(error.message);
        })
    }
    const handleRoute = () =>{
        navigation.navigate('login');
    }
    return(
        <ScrollView>
            <View style={styles.verifyPage}>
                <ImageBackground source={require("../img/Monstera_half.png")} style={styles.backgroundImage}>
                    <View style={styles.verifyContainer}>
                        <View style={styles.verifyBox}>
                            <Text style={styles.words}>
                                Verification email has been sent
                            </Text>
                            <Text style={styles.words}>
                                Please check your inbox
                            </Text>
                            <TouchableOpacity onPress={handleRoute}>
                                <Text style={styles.btnWords}>Go to Login</Text>
                            </TouchableOpacity>
                        </View> 
                    </View>
                </ImageBackground>
            </View>
        </ScrollView>
    )
}

export default VerifyEmail;