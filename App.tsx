import { useEffect, useState } from 'react';
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';

// Game duration in seconds
const GAME_DURATION = 5; 

export default function App() {
  const [taps, setTaps] = useState<number>(0);

  const [timeLeft, setTimeLeft] = useState<number>(GAME_DURATION);

  const [gameActive, setGameActive] = useState<boolean> (false);
  
  const handleTap = ()=> {
    // setTaps(taps + 1);
    // setTaps(prevTaps => prevTaps + 1);
    if (!gameActive) {
      setGameActive(true);
      setTaps(1);
    } else {
      setTaps(prevTaps => prevTaps + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Tap Game</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={handleTap}
      > 
        <Text style={styles.title}> {taps}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
  },
  button: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  }, 

});
