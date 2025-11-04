import React from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, StyleSheet, Alert } from 'react-native';

const FeedbackButtons = () => {
  const handlePress = () => Alert.alert('Pressed!');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.opacityBtn}
        activeOpacity={0.5}
        onPress={handlePress}
        disabled={false}
      >
        <Text style={styles.text}>Opacity Feedback</Text>
      </TouchableOpacity>
      <TouchableHighlight
        style={styles.highlightBtn}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={handlePress}
        onShowUnderlay={() => console.log('Show underlay')}
      >
        <Text style={styles.text}>Highlight Underlay</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  opacityBtn: { backgroundColor: '#007AFF', padding: 15, borderRadius: 5, marginBottom: 10 },
  highlightBtn: { backgroundColor: '#007AFF', padding: 15, borderRadius: 5 },
  text: { color: 'white', fontSize: 16 },
});

export default FeedbackButtons;