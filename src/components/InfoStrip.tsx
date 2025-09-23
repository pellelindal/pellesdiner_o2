import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function InfoStrip() {
  return (
    <View style={styles.infoStrip}>
      <Text style={styles.infoText}>Åpningstider: Man–Lør 08-24 · Søndag 10-23</Text>
      <Text style={styles.infoText}>Adresse: Olavsgate 3, 4005 Stavanger</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoStrip: { backgroundColor: '#101010', paddingHorizontal: 20, paddingVertical: 12, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#222' },
  infoText: { color: colors.muted, fontSize: 12 },
});
