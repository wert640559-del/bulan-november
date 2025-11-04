import React from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableNativeFeedback, Platform, StyleSheet, Alert } from 'react-native';

const AdvancedTouches = () => {
  const handleLongPress = () => Alert.alert('Long Press!');
  const background = TouchableNativeFeedback.Ripple('#2196F3', true);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => Alert.alert('Pressed!')}
        onLongPress={handleLongPress}
        delayLongPress={1000}
        hitSlop={{ top: 20 }}
        >
        <View style={styles.noFeedback}>
          <Text>No Visual Feedback</Text>
        </View>
      </TouchableWithoutFeedback>
      {Platform.OS === 'android' && (
        <TouchableNativeFeedback
          background={background}
          onPress={() => Alert.alert('Native Ripple!')}
          useForeground={TouchableNativeFeedback.canUseNativeForeground()}
        >
          <View style={styles.nativeBtn}>
            <Text style={styles.text}>Android Native</Text>
          </View>
        </TouchableNativeFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  noFeedback: { backgroundColor: 'gray', padding: 15, borderRadius: 5, marginBottom: 10 },
  nativeBtn: { backgroundColor: 'white', padding: 15, borderRadius: 5 },
  text: { color: 'black' },
});

export default AdvancedTouches;