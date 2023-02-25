import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const HomeScreen = () => {
  const [goal, setGoal] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [goals, setGoals] = useState([]);

  const handleConfirm = (selectedDate) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const addGoal = () => {
    if (goal.length === 0) {
      return;
    }

    const newGoal = {
      id: goals.length.toString(),
      title: goal,
      date: date
    };

    setGoals([...goals, newGoal]);
    setGoal('');
  };

  const deleteGoal = (id) => {
    const updatedGoals = goals.filter((goal) => goal.id !== id);
    setGoals(updatedGoals);
  };

  const renderGoal = ({ item }) => (
    <View style={styles.goal}>
      <View style={styles.goalInfo}>
        <Text style={styles.goalTitle}>{item.title}</Text>
        <Text style={styles.goalDate}>{item.date.toDateString()}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteGoal(item.id)}>
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hedeflerim</Text>

      <TextInput
        style={styles.goalInput}
        placeholder="Hedefinizi girin"
        value={goal}
        onChangeText={(text) => setGoal(text)}
      />

      <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
        <Text style={styles.dateButtonText}>{date.toDateString()}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton} onPress={addGoal}>
        <Text style={styles.addButtonText}>Hedef Ekle</Text>
      </TouchableOpacity>

      <FlatList
        data={goals}
        renderItem={renderGoal}
        keyExtractor={(item) => item.id}
        style={styles.goalList}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  goalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    alignItems: 'center'
  },
  dateButtonText: {
    fontSize: 18
  },
  addButton: {
    backgroundColor: '#007aff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center'
  }
});