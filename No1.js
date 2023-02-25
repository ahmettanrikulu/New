import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [goal, setGoal] = useState('');
  const [date, setDate] = useState('');
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [rewards, setRewards] = useState([
    { name: '30 dakika kitap okuma', id: 1 },
    { name: '1 saat yürüyüş', id: 2 },
    { name: 'Yeni bir yemek tarifi deneme', id: 3 },
    { name: 'Bir arkadaşını arama', id: 4 },
    { name: 'Bir alışveriş yapma', id: 5 },
  ]);
  const [selectedReward, setSelectedReward] = useState(null);

  useEffect(() => {
    getGoals();
  }, []);

  const addGoal = async () => {
    if (goal === '' || date === '') {
      alert('Lütfen bir hedef ve tarih girin.');
      return;
    }
    const newGoal = { goal, date, id: Date.now(), done: false };
    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    await AsyncStorage.setItem('@goals', JSON.stringify(updatedGoals));
    setGoal('');
    setDate('');
    setModalVisible(false);
  };

  const deleteGoal = async (id) => {
    const filteredGoals = goals.filter((goal) => goal.id !== id);
    setGoals(filteredGoals);
    await AsyncStorage.setItem('@goals', JSON.stringify(filteredGoals));
  };

  const toggleDone = async (id) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === id ? { ...goal, done: !goal.done } : goal
    );
    setGoals(updatedGoals);
    await AsyncStorage.setItem('@goals', JSON.stringify(updatedGoals));
  };

  const getGoals = async () => {
    const storedGoals = await AsyncStorage.getItem('@goals');
    if (storedGoals) {
      setGoals(JSON.parse(storedGoals));
    }
  };

  const getReward = async () => {
    const storedReward = await AsyncStorage.getItem('@selectedReward');
    if (storedReward) {
      setSelectedReward(JSON.parse(storedReward));
    }
  };

  const selectReward = async (reward) => {
    setSelectedReward(reward);
    await AsyncStorage.setItem('@selectedReward', JSON.stringify(reward));
  };
}

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hedef Takip Platformu</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="ios-add" size={24} color="white" />
      </TouchableOpacity>
      <Modal animationType="slide"></Modal>
    </View>
  )
// Ödül sistemi ile ilgili fonksiyonlar

const addReward = (reward) => {
  const newReward = {
    id: Date.now(),
    name: reward,
    earned: false
  }
  setRewards((rewards) => [...rewards, newReward]);
}

const markRewardAsEarned = (rewardId) => {
  setRewards((rewards) =>
    rewards.map((reward) =>
      reward.id === rewardId ? { ...reward, earned: true } : reward
    )
  );
}

const deleteReward = (rewardId) => {
  setRewards((rewards) => rewards.filter((reward) => reward.id !== rewardId));
}
//addReward fonksiyonu, kullanıcının ödül listesine yeni bir ödül eklemesine olanak tanır. Bu fonksiyon, ödülün adını ve kazanılıp kazanılmadığını tutan bir nesne oluşturur ve mevcut ödül listesine ekler.
//markRewardAsEarned fonksiyonu, kullanıcının kazandığı bir ödülü işaretlemesine olanak tanır. Bu fonksiyon, kullanıcının ödül listesindeki belirli bir ödülün kazanıldı olarak işaretlenmesini sağlar.
//deleteReward fonksiyonu, kullanıcının ödül listesinden bir ödülü silmesine olanak tanır. Bu fonksiyon, ödül listesinden belirli bir ödülü filtreler ve güncellenmiş ödül listesini ayarlar.
//Şimdi, bu ödül sistemi fonksiyonlarını kullanarak GoalItem ve GoalInput bileşenlerini güncelleyeceğiz.
// GoalItem bileşenini güncelleme
const GoalItem = ({ id, title, onDelete, deadline, rewardId, markAsEarned }) => {
  const reward = rewards.find((r) => r.id === rewardId);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => markAsEarned(rewardId)}
      style={styles.goalItem}
    >
      <View style={styles.goalItemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.goalTitle}>{title}</Text>
        {reward && reward.earned && (
          <FontAwesome name="trophy" size={20} color="gold" />
        )}
      </View>
      <View style={styles.goalItemRight}>
        <Text style={styles.goalDeadline}>
          {formatDeadline(deadline)}
        </Text>
        <TouchableOpacity onPress={() => onDelete(id)}>
          <FontAwesome name="trash" size={24} color="#FF6961" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

// GoalInput bileşenini güncelleme
const GoalInput = ({ onAddGoal, onAddReward }) => {
  const [enteredGoal, setEnteredGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [reward, setReward] = useState("");
}