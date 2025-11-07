import { StyleSheet, Text, View } from "react-native";
import Login from "./src/pages/Login";
import Tugas from "./src/pages/Tugas";

export default function App() {
  return ( 
    <View style={{ flex: 1 }}>
      {/* <View style={styles.container}>
        <Text style={styles.text}>Hello World</Text>
      </View>

      <View style={styles.container1}>
        <Text style={styles.text}>Hello World</Text>
        <View style={styles.card}>
          <Text style={styles.text}>Halo</Text>
        </View>
        <View style={styles.card1}>
          <Text style={styles.text}>Halo</Text>
        </View>
      </View>

      <View>
        <Text style={styles.text}></Text>
      </View> */}
      {/* <Login/> */}
      <Tugas/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'tomato',
    flex: 1
  },
  container1: {
    backgroundColor: 'navy',
    flex: 1
  },
  text: {
    color: 'white',
    fontSize: 20
  },
  card: {
    height: 100,
    backgroundColor: 'red',
    width: 100,
    position: 'absolute',
    bottom: 20,
    right: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 7
  },
  card1: {
    height: 100,
    backgroundColor: 'green',
    width: 100,
    position: 'absolute',
    bottom: 50,
    right: 50,
    zIndex: 0
  }

})
