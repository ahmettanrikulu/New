import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Keyboard } from 'react-native';

export default function App() {
  const [goal, setGoal] = useState('');
  const [goalList, setGoalList] = useState([]);

  const addGoalHandler = () => {
    if (goal.trim()) {
      setGoalList(currentGoals => [
        ...currentGoals,
        { id: Math.random().toString(), value: goal }
      ]);
      setGoal('');
      Keyboard.dismiss();
    }
  };

  const deleteGoalHandler = goalId => {
    setGoalList(currentGoals => {
      return currentGoals.filter(goal => goal.id !== goalId);
    });
  };

  const renderGoalItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => deleteGoalHandler(item.id)}>
        <View style={styles.goalItem}>
          <Text>{item.value}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter a goal"
          style={styles.goalInput}
          onChangeText={setGoal}
          value={goal}
          onSubmitEditing={addGoalHandler}
        />
        <TouchableOpacity style={styles.addButton} onPress={addGoalHandler}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={goalList}
        renderItem={renderGoalItem}
        keyExtractor={item => item.id}
        style={styles.goalList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  goalInput: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#00BFFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButtonText: {
    color: 'white',
    fontSize: 24
  },
  goalList: {
    width: '100%'
  },
  goalItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc'
  }
});
//Bu kod, hedeflerin eklendiği ve silindiği basit bir hedef takip uygulamasıdır. Ekranda bir TextInput bileşeni vardır, bu bileşene kullanıcının hedefini girebilir. Ardından, kullanıcının hedefi eklemek için bir + düğmesine basması gerekir. Eklenen hedefler, bir FlatList bileşeniyle ekranda listelenir. Hedefin yanındaki küçük X simgesine dokunarak kullanıcı hedefi silebilir.
//İlk olarak, "Hedefler" adında bir bileşen oluşturacağız. Bu bileşen, hedeflerin listesini tutacak ve yeni hedeflerin eklenmesini sağlayacak.