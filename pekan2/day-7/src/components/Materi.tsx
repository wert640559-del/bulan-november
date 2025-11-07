import { StyleSheet, Text, View } from "react-native";

export default function Materi() {
    return(
        <View>
            <View style={styles.container}>
                <Text style={styles.text}>Hello World</Text>
            </View>

            <View style={styles.container1}>
                <Text style={styles.text}>Hello World</Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        // alignItems: 'center',
        flex: 1,
        backgroundColor: 'tomato'
    },
    text: {
        color: 'white',
        fontSize: 50
    },
    container1: {
        flex: 1,
        // height: 100,
        backgroundColor: 'red'
    }
})