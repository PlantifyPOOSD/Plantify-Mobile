import React from "react";
import { View, Image, Text, useColorScheme, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import AppIntroSlider from "react-native-app-intro-slider";
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

const WalkthroughScreen = ({ route }) => {
  const { appConfig, appStyles } = route.params;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const slides = appConfig.onboardingConfig.walkthroughScreens.map(
    (screenSpec, index) => {
      return {
        key: `${index}`,
        text: screenSpec.description,
        title: screenSpec.title,
        image: screenSpec.icon,
      };
    }
  );
  const navigation = useNavigation();
  const _renderItem = ({ item, dimensions, index }) => (
    <View style={[styles.container, dimensions]}>
      <Image
        style={styles.image}
        source={item.image}
        size={100}
        color="white"
      />
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
      {index === slides.length - 1 && (
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.navigate('login')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      )}
    </View>
  );
  
  const [loaded] = useFonts({
    'Kabel-Black': require('/Users/mihir.ar/Downloads/Client-Mobile-main 2/assets/fonts/Kabel-Black.ttf'),
    'Josefin Sans': require('/Users/mihir.ar/Downloads/Client-Mobile-main 2/assets/fonts/JosefinSans-Regular.ttf'),
  });

  if (!loaded) {
    return null; // Render a loading screen or placeholder component while the font is loading
  }
  return (
    <AppIntroSlider
      data={slides}
      slides={slides}
      renderItem={_renderItem}
      //Handler for the done On last slide
      showSkipButton={true}
      showDoneButton={true}
      showNextButton={true}
      dotStyle={styles.dotStyle}
      activeDotStyle={styles.activeDotStyle}
      skipLabel="Skip"
      nextLabel="Next"
      doneLabel="Done"
    />
  );
};

WalkthroughScreen.propTypes = {
  appStyles: PropTypes.object,
  appConfig: PropTypes.object,
};

export default WalkthroughScreen;

import { StyleSheet } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingBottom: 25,
      color: '#385250',
      fontFamily: 'Kabel-Black',
    },
    text: {
      fontSize: 30,
      textAlign: 'center',
      color: '#385250',
      paddingLeft: 10,
      paddingRight: 10,
      fontFamily: 'Josefin Sans',
    },
    image: {
      width: 100,
      height: 100,
      marginBottom: 60,
      //tintColor: 'white',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#fff7e9",
    },
    button: {
      fontSize: 18,
      color: 'white',
      marginTop: 10,
      backgroundColor: "#fff7e9",
    },
    dotStyle: {
      backgroundColor: '#385250', // Choose your desired color for the dots
      width: 10,
      height: 10,
      borderRadius: 5,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3,
    },
    activeDotStyle: {
      backgroundColor: '#fff7e9',
      width: 10,
      height: 10,
      borderRadius: 5,
      borderWidth: 1,    // Add borderWidth property
      borderColor: '#385250',  // Add borderColor property
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3,
    },
    getStartedButton: {
      marginTop: 70,
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 5,
      backgroundColor: '#385250',
    },
    buttonText: {
      fontSize: 40,
      fontWeight: 'bold',
      color: '#fff',
      fontFamily: 'Kabel-Black',
    },    
  });
};
