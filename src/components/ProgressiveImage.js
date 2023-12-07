import {View, Animated, StyleSheet} from 'react-native';
import React from 'react';

export default function ProgressiveImage({defaultImageSource, source, style}) {
  const defaultImageAnimated = new Animated.Value(0);
  const imageAnimated = new Animated.Value(0);

  const handleDefaultImageLoad = () => {
    Animated.timing(defaultImageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View style={styles.container}>
      <Animated.Image
        source={defaultImageSource}
        style={[style, {opacity: defaultImageAnimated}]}
        onLoad={handleDefaultImageLoad}
        blurRadius={1}
      />
      <Animated.Image
        source={source}
        style={[style, {opacity: imageAnimated}, styles.imageOverlay]}
        onLoad={handleImageLoad}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
