import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import SmartButton from "./SmartButton";

const randomHexColor = () => {
    return (
        "#" +
        Math.floor(Math.random() * 9999999)
        .toString(16)
        .padStart(6, "0")
    );
    };

export default function TouchExample() {
    const [isDisabled, setIsDisabled] = useState(false)
    const [rippleColor, setRippleColor] = useState('#2196F3')
    const [overflow, setOverflow] = useState(true)
    const [loading, setLoading] = useState(false)

    const handlePress = () => {
        Alert.alert('Pressable Button', 'Pressable button dipencet')
        setIsDisabled(true)

        setTimeout(() => {
            setIsDisabled(false)
        }, 2000)
    }

    const handleSmartButton = () => {
        setLoading(true);
        setTimeout(() => {
        setLoading(false);
        Alert.alert("Saved!");
        }, 2000);
    }


    const background = TouchableNativeFeedback.Ripple(rippleColor, overflow)

    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12, }}>
                <Text>Belajar Tombol di react-native</Text>
                
                {/* tombol 1 */}
                <Pressable
                  onPress={handlePress}
                  disabled={isDisabled}
                  style={styles.button}
                >
                    <Text style={styles.text}>Pressable Button</Text>
                </Pressable>

                {/* tombol 2 */}
                <TouchableOpacity
                  activeOpacity={0.09}
                  onPress={() => Alert.alert('halo')}
                  style={styles.button}
                >
                    <Text style={styles.text}>TouchableOpacity</Text>
                </TouchableOpacity>

                {/* tombol 3 */}
                <TouchableNativeFeedback
                  background={background}
                  onPress={() => {
                    setRippleColor(randomHexColor())
                    setOverflow(!overflow)
                  }}
                >
                    <View style={styles.button}>
                        <Text style={styles.text}>TouchableNativeFeedback</Text>
                    </View>
                </TouchableNativeFeedback>
                <Text style={{ color: rippleColor }}>
                    Ripple Color: {rippleColor} | Overflow: {overflow ? "ON" : "OFF"}
                </Text>

                <TouchableHighlight
                    underlayColor="#004d00" // warna saat ditekan jadi gelap
                    onPress={() => Alert.alert("TouchableHighlight")}
                    style={styles.button}
                >
                    <Text style={styles.text}>TouchableHighlight</Text>
                </TouchableHighlight>

                <TouchableWithoutFeedback
                    onPress={() => Alert.alert("TouchableWithoutFeedback")}
                    onLongPress={() => Alert.alert("Long Press")}
                >
                    <View style={styles.button}>
                        <Text style={styles.text}>TouchableWithoutFeedback (tekan lama)</Text>
                    </View>
                </TouchableWithoutFeedback>


                <SmartButton
                    title="Save Data"
                    color="#d400ffff"
                    loading={loading}
                    onPress={handleSmartButton}
                />

                <SmartButton
                    title="Smart Button"
                    color="blue" 
                    loading={false}
                    onPress={() => console.log('sudah diunduh')}
                />

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    text: { color: 'white' },
    button: { padding: 14, backgroundColor: 'green', borderRadius: 30, overflow: 'hidden'},
})