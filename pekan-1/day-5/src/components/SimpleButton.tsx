import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";

export default function SimpleButtons() {
    const handlePress = () => Alert.alert('Dipencet')

    return (
        <>
            <View style={styles.container}>
                <Button title="Button Sederhana" onPress={handlePress} color="#007AFF"/> 
                <Pressable
                    onPress={handlePress}
                    style={({ pressed }) => [styles.pressable, { opacity: pressed ? 0.7 : 1 }]}
                    hitSlop={{ top: 10, bottom: 1000, left: 10, right: 10 }}
                >
                    <Text>Pressable custom</Text>
                </Pressable>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, gap: 20 },
  pressable: { backgroundColor: '#007AFF', padding: 15, borderRadius: 5 },
  text: { color: 'white', fontSize: 16 },
})