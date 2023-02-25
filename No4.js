import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const Goals = () => {
  const [goal, setGoal] = useState('');
  const [goalsList, setGoalsList] = useState([]);

  const addGoalHandler = () => {
    setGoalsList([...goalsList, { id: Math.random().toString(), value: goal }]);
    setGoal('');
  };

  const removeGoalHandler = (goalId) => {
    setGoalsList((goals) => {
      return goals.filter((goal) => goal.id !== goalId);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Bir hedef girin..."
          onChangeText={(text) => setGoal(text)}
          value={goal}
        />
        <Button title="Ekle" onPress={addGoalHandler} />
      </View>
      <ScrollView>
        {goalsList.map((goal) => (
          <TouchableOpacity
            key={goal.id}
            activeOpacity={0.8}
            onPress={() => removeGoalHandler(goal.id)}
          >
            <View style={styles.goalItem}>
              <Text>{goal.value}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '80%',
    padding: 10,
  },
  goalItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default Goals;
//Bu bileşen, ekranda hedeflerin listesini görüntüleyecektir. Kullanıcılar, hedeflerin listesine yeni hedefler ekleyebilir ve mevcut hedefleri silmek için dokunabilirler.
//Şimdi, "App.js" dosyasına gidip bu bileşeni içe aktaralım ve ekranımızda gösterelim.
