import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

type InfoStripProps = {
  items: string[];
};

export default function InfoStrip({ items }: InfoStripProps) {
  return (
    <View style={styles.infoStrip}>
      {items.map((value, index) => (
        <Text key={`${value}-${index}`} style={styles.infoText}>
          {value}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  infoStrip: {
    backgroundColor: '#101010',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#222',
  },
  infoText: {
    color: colors.muted,
    fontSize: 12,
  },
});
