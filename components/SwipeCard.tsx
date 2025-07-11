
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 120;

interface Props {
  name: string;
  gym: string;
  goal: string;
  city: string;
  onSwipeRight?: () => void;
  onSwipeLeft?: () => void;
}

const SwipeCard = ({ name, gym, goal, city, onSwipeRight, onSwipeLeft }: Props) => {
  const translateX = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      if (translateX.value > SWIPE_THRESHOLD) {
        runOnJS(onSwipeRight?.)();
        translateX.value = withSpring(SCREEN_WIDTH);
      } else if (translateX.value < -SWIPE_THRESHOLD) {
        runOnJS(onSwipeLeft?.)();
        translateX.value = withSpring(-SCREEN_WIDTH);
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.info}>🏋️ Siłownia: {gym}</Text>
        <Text style={styles.info}>🎯 Cel: {goal}</Text>
        <Text style={styles.info}>📍 Miasto: {city}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
    elevation: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default SwipeCard;
