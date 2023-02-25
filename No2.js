import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

App = () => {
  const [goal, setGoal] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [goals, setGoals] = useState([]);

  const handleAddGoal = () => {
    const newGoal = { id: goals.length + 1, goal, date };
    setGoals([...goals, newGoal]);
    setGoal('');
  };

  const handleDeleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const renderGoalItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleDeleteGoal(item.id)}>
      <View style={styles.goalItem}>
        <Text style={styles.goalText}>{item.goal}</Text>
        <Text style={styles.dateText}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyComponent}>
      <Text style={styles.emptyComponentText}>No goals added yet</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goal Tracker</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter goal"
          value={goal}
          onChangeText={(text) => setGoal(text)}
        />
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}>
          <Text style={styles.datePickerButtonText}>
            {new Date(date).toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddGoal}
          disabled={!goal.trim()}>
          <Text style={styles.addButtonLabel}>Add Goal</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderGoalItem}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  form: {
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  datePickerButtonText: {
    fontSize: 18,
  },
  addButton: {
    backgroundColor: '#0d47a1',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: ''
  },
});