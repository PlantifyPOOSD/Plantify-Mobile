import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ImageBackground, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../styles/loginStyle';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

function Login() {
  const navigation = useNavigation();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [backgroundOpacity] = useState(new Animated.Value(0));
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    Animated.timing(backgroundOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    setErrorMessage('');

    if (!isValidEmail(username)) {
      setErrorMessage('Invalid email address');
      return;
    }

    auth
      .signInWithEmailAndPassword(username, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUsername('');
        setPassword('');
        navigation.navigate('myPlantBase', { user: user.uid });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);

        if (errorCode === 'auth/wrong-password') {
          setErrorMessage('Wrong password');
        } else {
          setErrorMessage(errorMessage);
        }
      });
  };

  const forgotPass = () =>{
      navigation.navigate("passwordRecovery");
  }

  return (
    <View style={styles.loginPage}>
       <ImageBackground source={require('../img/Monstera_half.png')} style={styles.backgroundImage}>
      <View style={styles.loginContainer}>
        <View style={styles.loginBox}>
          <View style={styles.loginHeader}>
            <Text style={styles.plantifyHeader}>Plantify.</Text>
            <Text style={styles.headerSubtext}>
              Sign in to get started using Plantify
            </Text>
          </View>

          <View style={styles.loginInput}>
            <Text>Email Address</Text>
            <TextInput
              style={styles.emailInput}
              onChangeText={setUsername}
              value={username}
            />
            
            <Text>Password</Text>
            <TextInput
              style={styles.passwordInput}
              onChangeText={setPassword}
              value={password}
              secureTextEntry={true}
            />

            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}

            <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('register')}
            style={styles.loginLink}
          >
            <Text>Don't have an account yet?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={forgotPass} style={{alignItems:'center', justifyContent:"center"}}>
            <Text>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ImageBackground>
    </View>
  );
}

export default Login;