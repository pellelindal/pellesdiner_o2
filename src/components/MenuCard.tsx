import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme';

type MenuCardProps = {
  title: string;
  items: string[];
  isActive?: boolean;
  onPress?: () => void;
};

export default function MenuCard({ title, items, isActive = false, onPress }: MenuCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, isActive && styles.cardActive]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={styles.cardTitle}>{title}</Text>
      {items.map((line, index) => (
        <Text key={`${title}-${index}`} style={styles.cardLine}>
          - {line}
        </Text>
      ))}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, padding: 16, borderRadius: 16 },
  cardActive: { borderWidth: 1, borderColor: colors.primary },
  cardTitle: { color: colors.text, fontSize: 16, fontWeight: '700', marginBottom: 8 },
  cardLine: { color: colors.muted, marginBottom: 4 },
});
