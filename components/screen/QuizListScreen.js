import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { firestore } from '../services/Firebase';
import { collection, getDocs } from 'firebase/firestore';
import { AuthContext } from '../services/AuthProvider';

const QuizListScreen = ({ navigation, route }) => {
    const { category } = route.params;
    const { user } = useContext(AuthContext);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scoreData, setScoreData] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const questionsCollection = collection(firestore, `subjects/${category.id}/test`);
                const querySnapshot = await getDocs(questionsCollection);

                const questionsList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setQuestions(questionsList);
            } catch (error) {
                console.error("Error fetching questions:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchScores = async () => {
            try {
                const categoryRef = collection(firestore, `test_completed/${user?.uid}/${category.id}`);
                const querySnapshot = await getDocs(categoryRef);

                const testData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setScoreData(testData);
            } catch (error) {
                console.error("Error fetching scores:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
        fetchScores();
    }, [category.id]);

    const handleAttempt = (question,categoryName) => {
        navigation.navigate("Attempt", { question,categoryName});
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{category.id}</Text>
                </View>
                <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
                    {questions.length > 0 ? (
                        questions.map((question) => {
                            const scoreEntry = scoreData.find((data) => data.id === question.id);
                            const hasPassed = scoreEntry?.isCompleted;

                            return (
                                <View key={question.id} style={styles.questionContainer}>
                                    <Text style={styles.questionText}>{question.name}</Text>

                                    <TouchableOpacity
                                        style={[
                                            styles.attemptButton,
                                            hasPassed && styles.passedButton,
                                        ]}
                                        onPress={() => handleAttempt(question,category.id)}
                                        disabled={hasPassed}
                                    >
                                        <Text style={styles.buttonText}>
                                            {hasPassed ? 'Passed' : 'Attempt'}
                                        </Text>
                                    </TouchableOpacity>

                                    {scoreEntry && (
                                        <Text style={styles.scoreText}>Score: {scoreEntry.mark}</Text>
                                    )}
                                </View>
                            );
                        })
                    ) : (
                        <Text style={styles.noQuestionsText}>No questions available</Text>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#4a90e2',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingVertical: 10,
    },
    questionContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    questionText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
        marginBottom: 15,
    },
    attemptButton: {
        backgroundColor: '#4a90e2',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    passedButton: {
        backgroundColor: '#28a745',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    scoreText: {
        fontSize: 16,
        marginTop: 8,
        color: '#555',
    },
    noQuestionsText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
        marginTop: 20,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default QuizListScreen;