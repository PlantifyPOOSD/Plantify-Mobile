import React, { useState, useEffect } from 'react';
import { View, Animated } from 'react-native';
import styles from '../styles/pinStyle';

function Pin({ pinSize, img }) {
  const pinStyles = [styles.pin, styles[pinSize]];
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500, // Adjust the duration for the desired effect
      useNativeDriver: true,
    }).start();
  }, []);

  const pinAnimation = {
    opacity: animation,
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1],
        }),
      },
    ],
  };

  return (
    <View style={pinStyles}>
      <Animated.Image source={img} style={[styles.plantImage, pinAnimation]} />
    </View>
  );
}

export default Pin;

