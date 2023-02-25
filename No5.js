import React from 'react';
import { StyleSheet, View } from 'react-native';
import Goals from './components/Goals';

export default function App() {
  return (
    <View style={styles.container}>
      <Goals />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
//Bu kodlarla birlikte, artık uygulamamızda "Hedefler" bileşenimiz bulunuyor ve kullanıcılar hedeflerini ekleyip silebilirler.
//Bu bileşene bir ödül sistemi eklemek için, kullanıcının hedeflerini tamamlaması durumunda bir ödül vermemiz gerekiyor. 