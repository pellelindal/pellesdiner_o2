import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

type MenuCardProps = {
  title: string;
  items: string[];
};

export default function MenuCard({ title, items }: MenuCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {items.map((line, index) => (
        <Text key={`${title}-${index}`} style={styles.cardLine}>
          - {line}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, padding: 16, borderRadius: 16 },
  cardTitle: { color: colors.text, fontSize: 16, fontWeight: '700', marginBottom: 8 },
  cardLine: { color: colors.muted, marginBottom: 4 },
});
