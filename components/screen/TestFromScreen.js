import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../services/Firebase';
import { AuthContext } from '../services/AuthProvider';
import { FontAwesome } from '@expo/vector-icons'; // For icons
import LottieView from 'lottie-react-native'; // For animations (e.g., confetti)

const TestFormScreen = ({ navigation, route }) => {
  const { question, categoryName } = route.params;
  const { user } = useContext(AuthContext);
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(question.duration * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const webViewRef = useRef(null);

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else if (timeLeft <= 0) {
      autoSubmitForm();
    }
  }, [timeLeft, isSubmitted]);

  const performSubmission = async (scoreForFunction, uid, category, testId) => {
    const [obtained, total] = scoreForFunction.split("/").map(Number);
    const isCompleted = obtained === total;

    try {
      await insertAtIndividualTest(uid, category, testId, obtained);
      await insertAtTestCompletion(uid, category, testId, obtained, isCompleted);
      console.log("Submission successful");
    } catch (error) {
      console.error("Error in submission:", error);
    }
  };

  const insertAtIndividualTest = async (uid, category, testId, mark) => {
    try {
      const individualTestRef = doc(firestore, `subjects/${category}/test/${testId}/test_completed_information/${uid}`);
      await setDoc(individualTestRef, { mark });
      console.log("Inserted at individual test");
    } catch (error) {
      console.error("Error inserting at individual test:", error);
    }
  };

  const insertAtTestCompletion = async (uid, category, testId, mark, isCompleted) => {
    try {
      const testCompletionRef = doc(firestore, `test_completed/${uid}/${category}/${testId}`);
      await setDoc(testCompletionRef, { mark, isCompleted });
      console.log("Inserted at test completion");
    } catch (error) {
      console.error("Error inserting at test completion:", error);
    }
  };

  const autoSubmitForm = () => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        const form = document.querySelector('form');
        if (form) {
          form.submit();
        }
      `);
      setIsSubmitted(true);
    }
  };

  const extractScore = `
    const checkScore = setInterval(() => {
      const scoreElement = document.querySelector('span.nkOYNd.RVEQke');
      if (scoreElement) {
        const scoreText = scoreElement.innerText;
        window.ReactNativeWebView.postMessage(JSON.stringify({ score: scoreText }));
        clearInterval(checkScore);
      } else {
        console.log('Score element not found yet');
      }
    }, 100);
  `;

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleHomePress = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={{ flex: 1 }}>
      {score ? (
      <View style={{ flex: 1 }}>
        <View style={styles.scoreContainer}>
          <LottieView
            source={require('../../assets/confetti.json')}
            autoPlay
            loop={false}
            style={styles.confetti}
          />
          <FontAwesome name="trophy" size={60} color="#FFD700" style={styles.trophyIcon} />
          <Text style={styles.scoreText}>Congratulations!</Text>
          <Text style={styles.scoreDescription}>Your Score: <Text style={styles.scoreNumber}>{score}</Text></Text>
          <Text style={styles.motivationText}>
            {score >= 80 ? "Fantastic! You did a great job!" : "Good effort! Keep practicing!"}
          </Text>

          <TouchableOpacity style={styles.homeButton} onPress={handleHomePress}>
            <FontAwesome name="home" size={30} color="#4a90e2" />
            <Text style={styles.homeButtonText}>Home</Text>
          </TouchableOpacity>
        </View>
      </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>Time Left: {formatTime(timeLeft)}</Text>
          </View>
          <WebView
            ref={webViewRef}
            source={{ uri: question.link }}
            style={{ flex: 1 }}
            setSupportMultipleWindows={false}
            onNavigationStateChange={(event) => {
              if (event.url.includes('formResponse')) {
                setIsSubmitted(true);
              }
              if (event.url.includes('viewscore')) {
                webViewRef.current.injectJavaScript(extractScore);
              }
            }}
            onMessage={(event) => {
              const data = JSON.parse(event.nativeEvent.data);
              performSubmission(
                scoreForFunction = data.score,
                uid = user?.uid,
                category = categoryName,
                testId = question.id
              );
              setScore(data.score);
              console.log('Score:', data.score);
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#4a90e2',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 10,
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  scoreContainer: {
    flex: 1,
    marginVertical:'50%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  confetti: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: -50,
  },
  trophyIcon: {
    marginVertical: 10,
  },
  scoreText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginBottom: 5,
  },
  scoreDescription: {
    fontSize: 20,
    color: '#333',
  },
  scoreNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#28a745',
  },
  motivationText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#e0f7fa',
    borderRadius: 5,
  },
  homeButtonText: {
    fontSize: 18,
    color: '#4a90e2',
    marginLeft: 10,
  },
});

export default TestFormScreen;