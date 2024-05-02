/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
// import Carousel from 'react-native-reanimated-carousel';
// import {Colors} from 'react-native/Libraries/NewAppScreen';

const END_POSITION = 200;

const {width: PAGE_WIDTH} = Dimensions.get('window');

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: 'red',
  };

  const onLeft = useSharedValue(true);
  const position = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      if (onLeft.value) {
        position.value = e.translationX;
      } else {
        position.value = END_POSITION + e.translationX;
      }
    })
    .onEnd(e => {
      if (position.value > END_POSITION / 2) {
        position.value = withTiming(END_POSITION, {duration: 100});
        onLeft.value = false;
      } else {
        position.value = withTiming(0, {duration: 100});
        onLeft.value = true;
      }
    })
    .runOnJS(true);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: position.value}],
  }));

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView
        style={[
          backgroundStyle,
          {alignItems: 'center', justifyContent: 'center', flex: 1},
        ]}>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.box, animatedStyle]} />
        </GestureDetector>
        {/* <Carousel
          loop
          width={PAGE_WIDTH}
          height={PAGE_WIDTH / 2}
          data={[...new Array(6).keys()]}
          renderItem={({index}) => (
            <View
              key={index}
              style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <Text>Hello</Text>
            </View>
          )}
        /> */}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 120,
    width: 120,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    marginBottom: 30,
  },
});

export default App;
