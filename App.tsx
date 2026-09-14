import { useEffect, useState } from 'react';
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Game duration in seconds
const GAME_DURATION = 5; 

type Score = {
  id: string;
  taps: number;
  date: string;
};

export default function App() {
  const [taps, setTaps] = useState<number>(0);

  const [timeLeft, setTimeLeft] = useState<number>(GAME_DURATION);

  const [gameActive, setGameActive] = useState<boolean> (false);

 const [highScores, setHighScores] = useState<Score[]>([]);
   
    // useEffect to handle the timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [gameActive, timeLeft]); 
  // useEffect dependent on gameActive and timeLeft state variables

  const loadScores = () => {};

  const saveScores = async () => {};

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

  const handleReset = () => {
    setGameActive(false);
    setTaps(0);
    setTimeLeft(GAME_DURATION);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Tap Game</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.timerText}>Time Left: {timeLeft}s</Text>
        <Text style={styles.scoreText}>Taps: {taps}</Text>
      </View>

      <TouchableOpacity 
        style={[styles.button, !gameActive && styles.startButton]} 
        onPress={handleTap}
        disabled={!gameActive && timeLeft === 0}
      > 
        <Text style={styles.buttonText}> 
          {gameActive ?  "TAP" : (timeLeft === 0 ? "GAME OVER" : "START")}
        </Text>
      </TouchableOpacity>

      {timeLeft === 0 && (
        <TouchableOpacity style={styles.resetButton} 
          onPress={handleReset}>
            <Text style={styles.buttonText}>RESET</Text>
        </TouchableOpacity>
      )}
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
  resetButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#dc3545',
    borderRadius: 5,
  },
  startButton: {
    backgroundColor: '#28a745',
  },
    infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 20,
    color: '#d9534f',
  },
  scoreText: {
    fontSize: 20,
    color: '#337ab7',
  },
});
