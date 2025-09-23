import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

function Pill({ label }: { label: string }) {
  return <View style={styles.pill}><Text style={styles.pillText}>{label}</Text></View>;
}

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.brand}>Pelles Diner</Text>
      <View style={{flexDirection:'row', gap:12}}>
        <Pill label="Meny" />
        <Pill label="Book bord" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20, paddingVertical: 14, backgroundColor: colors.bg,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  brand: { color: colors.text, fontSize: 22, fontWeight: '700', letterSpacing: 0.5 },
  pill: {borderRadius: 999, backgroundColor: colors.surface, paddingHorizontal: 14, paddingVertical: 8},
  pillText: {color: colors.text, fontWeight: '600'},
});
