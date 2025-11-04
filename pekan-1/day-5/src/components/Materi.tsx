import { useState } from "react";
import { Alert, Button, Platform, Pressable, StyleSheet, Text, Touchable, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

const randomHexColor = () => {
  return '#000000'.replace(/0/g, function () {
    return Math.round(Math.random() * 16).toString(16);
  });
};

export default function Materi() {
    const [ripleColor, setRipleColor] = useState(randomHexColor())
    const [rippleOverflow, setRippleOverflow] = useState(false);
    const background = TouchableNativeFeedback.Ripple('#42e66bff', true);

    return (
        <>
            <Button title='button' disabled={false} onPress={() => console.log('Button Pressed')}/>
            <Pressable 
                style={{ justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: 'red' }}
                // onPress={() => Alert.alert("hallo")}
                onPressIn={() => Alert.alert('ini pressin')}
                onPressOut={() => Alert.alert('ini pressout')}
                disabled={false}
            >
                <Text>I'M Pressed</Text>
            </Pressable>

            <TouchableOpacity 
              style={{ padding: 16, backgroundColor: 'navy', alignItems: 'center' }}
              activeOpacity={0}
              onPress={() => Alert.alert('TouhableOpacity', 'Kok dipencet sih!')}
            >
                <Text>TouchableOpacity</Text>
            </TouchableOpacity>

            <TouchableHighlight
              activeOpacity={.5}
              style={{ padding: 16, backgroundColor: 'orange', alignItems: 'center'}}
              underlayColor='green'
              onPress={() => console.log('halo')}
            >
                <Text>TouchableHighlight</Text>
            </TouchableHighlight>

            <TouchableWithoutFeedback
              onLongPress={() => Alert.alert('OnLongPress', 'ini tombol TouchableWithoutFeedback')}
            >
                <View style={{ padding: 16, backgroundColor: 'green', alignItems: 'center' }}>
                    <Text>TouchableWithoutFeedback, onLongPress</Text>
                </View>
            </TouchableWithoutFeedback>

            {Platform.OS === 'android' && (
              <TouchableNativeFeedback
                background={background}
                onPress={() => Alert.alert('Native Ripple!')}
                useForeground={TouchableNativeFeedback.canUseNativeForeground()}
              >
                <View style={styles.nativeBtn}>
                  <Text style={styles.text}>TouchableNativeFeedback</Text>
                </View>
              </TouchableNativeFeedback>
            )}
        </>
    )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  noFeedback: { backgroundColor: 'gray', padding: 15, borderRadius: 5, marginBottom: 10 },
  nativeBtn: { backgroundColor: 'white', padding: 15, borderRadius: 5, alignItems: 'center' },
  text: { color: 'black' },
});