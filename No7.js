import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);

  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  };

  const addGoalHandler = () => {
    if (enteredGoal === '') {
      return;
    }
    setCourseGoals((currentGoals) => [...currentGoals, { id: Math.random().toString(), value: enteredGoal }]);
    setEnteredGoal('');
  };

  const removeGoalHandler = (goalId) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Hedefini buraya gir'
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <Button title='Ekle' onPress={addGoalHandler} />
      </View>
      <ScrollView>
        {courseGoals.map((goal) => (
          <View key={goal.id} style={styles.listItem}>
            <Text>{goal.value}</Text>
            <Button title='Sil' onPress={() => removeGoalHandler(goal.id)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
  },
});
//Bu kod, basit bir hedef takip uygulamasının ana hatlarını içeriyor. Kullanıcı, bir metin girişi aracılığıyla yeni hedefler ekleyebilir ve eklediği hedeflerin bir listesini görüntüleyebilir. Hedefleri silmek için de "Sil" düğmesine tıklayabilir. Uygulama, ekranda yer alacak hedeflerin listesi için ScrollView bileşenini kullanır. Hedeflerin eklenme sırasına göre sıralanması için ayrıca bir "id" özelliği kullanılır.