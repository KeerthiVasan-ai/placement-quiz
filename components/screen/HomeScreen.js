import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import { AuthContext } from '../services/AuthProvider';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { firestore } from '../services/Firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import COLORS from '../constants/colors';
import Ionicons from '@expo/vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = ({ navigation }) => {
  const { logout, user } = useContext(AuthContext);
  const [greeting, setGreeting] = useState("");
  const [categories, setcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [pieChartData, setPieChartData] = useState([]);

  const handleLogOut = () => {
    logout();
    navigation.navigate("Login");
  };

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 1)`;
  };

  useEffect(() => {
    const setGreetingMessage = () => {
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        setGreeting("Good Morning");
      } else if (currentHour < 18) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
    };
  
    const fetchTests = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'subjects'));
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    };
  
    const fetchUserDetails = async () => {
      const userDocRef = doc(firestore, `users/${user?.uid}`);
      const userDoc = await getDoc(userDocRef);
      return userDoc.exists() ? userDoc.data().name : "";
    };
  
    const fetchPieChartDetails = async (testsList) => {
      const percentagesArray = [];
      let totalAverageSum = 0; 
      const categoryAverages = [];
  
      for (const { id: categoryId } of testsList) {
        const categoryRef = collection(firestore, `test_completed/${user?.uid}/${categoryId}`);
        const querySnapshot = await getDocs(categoryRef);
  
        let totalMarks = 0;
        let count = 0;
  
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.mark !== undefined) {
            totalMarks += data.mark;
            count++;
          }
        });
  
        const categoryAverage = count > 0 ? totalMarks / count : 0;
        categoryAverages.push({ categoryId, categoryAverage });
        totalAverageSum += categoryAverage;
      }
  
      categoryAverages.forEach(({ categoryId, categoryAverage }) => {
        const percentage = totalAverageSum > 0 ? (categoryAverage / totalAverageSum) * 100 : 0;
        percentagesArray.push({
          name: categoryId,
          population: percentage,
          color: getRandomColor(),
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        });
      });
  
      return percentagesArray;
    };
  
    const loadData = async () => {
      try {
        console.log("Hello")
        setLoading(true);
        setGreetingMessage();
        
        const testsList = await fetchTests();
        const userNameData = await fetchUserDetails();
        const pieChartData = await fetchPieChartDetails(testsList);
  
        setcategories(testsList);
        setUserName(userNameData);
        setPieChartData(pieChartData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    loadData();
  }, []);  

  if (loading) {
    return <ActivityIndicator size="large" color={COLORS.primary} style={styles.loadingIndicator} />;
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.titleText}>Career Catalyst</Text>
        <TouchableOpacity onPress={handleLogOut} style={styles.logoutIcon}>
          <Ionicons name="log-out-outline" size={24} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      <Text style={styles.greetingText}>{greeting}, {userName}!</Text>

      <View style={styles.chartsContainer}>
        <Text style={styles.titleText}>Performance</Text>
        <PieChart
          data={pieChartData}
          width={screenWidth - 40}
          height={180}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          style={styles.chart}
        />
      </View>

      <ScrollView style={styles.testListContainer} contentContainerStyle={{ paddingBottom: 20 }}>
        {categories.length > 0 ? (
          categories.map((category) => (
            <TouchableOpacity 
              key={category.id} 
              style={styles.testItem}
              onPress={() => navigation.navigate("QuizList", { category })}
            >
              <Text style={styles.testText}>{category.id}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyText}>No categories available</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: COLORS.white,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  logoutIcon: {
    padding: 5,
  },
  greetingText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: COLORS.primary,
  },
  chartsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  chart: {
    borderRadius: 10,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  testListContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  testItem: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 10,
  },
  testText: {
    fontSize: 18,
    color: COLORS.text,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
  },
});

export default HomeScreen;