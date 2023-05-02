import React from 'react';
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';

const customFonts = {
  'Kabel-Black': require('../assets/fonts/Kabel-Black.ttf'),
  'JosefinSans-Regular': require('../assets/fonts/JosefinSans-Regular.ttf'),
};

export default function LandingPage({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFontsAsync() {
      await Font.loadAsync(customFonts);
      setFontsLoaded(true);
    }

    loadFontsAsync();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require('/Users/mihir.ar/Downloads/Client-Mobile-main 2/img/Monstera_half.png')}
      style={styles.backgroundImage}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.appName}>Plantify.</Text>
          <Text style={styles.tagline}>Your personal plant care companion</Text>
          {/* Add more content that will be scrollable */}
        </View>
      </ScrollView>
      <Animated.View style={styles.getStartedButtonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.getStartedButton]}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: "#fff7e9",
  },
  scrollView: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 80, // Add padding to make space for the fixed Get Started button
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#385250',
    marginBottom: 8,
    fontFamily: 'Kabel-Black',
    paddingTop: 250,
  },
  tagline: {
    fontSize: 18,
    color: '#385250',
    marginBottom: 30,
    fontFamily: 'Kabel-Black',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 16,
    backgroundColor: '#385250',
  },
  getStartedButton: {
    backgroundColor: '#000000',
  },
  getStartedButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 150,
  },
  buttonText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Kabel-Black',
  },
});
