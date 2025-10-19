import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme';

type PillProps = { label: string };
type HeaderProps = {
  showBack?: boolean;
  onBack?: () => void;
};

function Pill({ label }: PillProps) {
  return <View style={styles.pill}><Text style={styles.pillText}>{label}</Text></View>;
}

export default function Header({ showBack = false, onBack }: HeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.leftGroup}>
        {showBack ? (
          <TouchableOpacity onPress={onBack} accessibilityRole="button" accessibilityLabel="Gå tilbake">
            <Text style={styles.backText}>← Tilbake</Text>
          </TouchableOpacity>
        ) : null}
        <Text style={styles.brand}>Pelles Diner</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20, paddingVertical: 14, backgroundColor: colors.bg,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  leftGroup: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  brand: { color: colors.text, fontSize: 22, fontWeight: '700', letterSpacing: 0.5 },
  pill: {borderRadius: 999, backgroundColor: colors.surface, paddingHorizontal: 14, paddingVertical: 8},
  pillText: {color: colors.text, fontWeight: '600'},
  backText: { color: colors.primary, fontWeight: '600' },
});
