import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerBrand}>Pelles Diner</Text>
      <Text style={styles.footerText}>Reservasjoner: post@pellesdiner.no · 12 34 56 78</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { paddingHorizontal: 20, paddingVertical: 24, gap: 6, backgroundColor: colors.bg },
  footerBrand: { color: colors.text, fontSize: 18, fontWeight: '800' },
  footerText: { color: colors.muted },
  footerFine: { color: '#777', fontSize: 12 },
});
