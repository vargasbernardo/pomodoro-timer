import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Vibration, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';



export default function App() {
  const [timer, setTimer] = useState(1500);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [breakTime, setBreakTime] = useState(300);
  
  useEffect(() => {
    let timerId 
    if(isTimerRunning && timer > 0) {
      timerId = setInterval(() => {
        setTimer(prevState => prevState - 1);
      }, 1000)
    }
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [isTimerRunning, timer])

  useEffect(() => {
    if(timer <=0 || breakTime <= 0) {
      Vibration.vibrate([500, 500, 500])
    }

  }, [timer, breakTime])

  useEffect(() => {
    let breakTimerId;
    if (isBreak && breakTime > 0) {
      breakTimerId = setInterval(() => {
            setBreakTime(prevState => prevState - 1);
      }, 1000);
    }
    return () => {
      if (breakTimerId) {
        clearInterval(breakTimerId);
      }
    };
  }, [isBreak, breakTime]);

  const formatTimer = (seconds) => {
     let minutes = Math.floor(seconds / 60);
     let remainingSeconds = seconds % 60;

     minutes = (minutes < 10) ? '0' + minutes : minutes;
      remainingSeconds = (remainingSeconds < 10) ? '0' + remainingSeconds : remainingSeconds;
    
    return minutes + ':' + remainingSeconds;
  }

  const stopTimer = () => {
    setIsTimerRunning(false);
  }

  const goToBreak = () => {
    setIsTimerRunning(false)
    setTimer(1500)
    setIsBreak(true)
  }
  
  return (
    <View style={[styles.container]}>
      <Text>🍅 Pomodoro Timer 🍅</Text>
        <Text>📖 Studying time</Text>
      <View style={styles.timerContainer}>
        <Text>{formatTimer(timer)}</Text>
      </View>
        <Text>🕐 Break time</Text>
      <View style={styles.timerContainer}>
        <Text>{formatTimer(breakTime)}</Text>
      </View>
      <StatusBar style="auto" />
      {timer <= 0 ? <TouchableOpacity style={styles.resetButtons} title="Go to Break" onPress={goToBreak}><Text>Go to Break!</Text></TouchableOpacity> : null}
      <View style={{flexDirection: 'row', gap: 10}}>
        <Button title="Start" onPress={() => setIsTimerRunning(true)}/>
        <Button title="Stop" onPress={stopTimer}/>
      </View>
      {breakTime <= 0 ? <TouchableOpacity style={styles.resetButtons} title="Restart Pomodoro Timer" onPress={() => {
        setIsBreak(false)
        setIsTimerRunning(true)
        setBreakTime(300)
      }}><Text>Restart Pomodoro Timer</Text></TouchableOpacity>: null}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 24
  },
  resetButtons: {
    position: 'absolute',
    top: 350,
    left: 100,
    height: 100,
    width: 200,
    backgroundColor: 'green',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerContainer: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 20
  }
});
