import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MenuSection } from '../data/menu';
import { colors } from '../theme';

type MenuDetailsProps = {
  selectedMenu?: MenuSection | null;
};

export default function MenuDetails({ selectedMenu }: MenuDetailsProps) {
  if (!selectedMenu) {
    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderTitle}>Velg en meny</Text>
        <Text style={styles.placeholderText}>Trykk på et kort for å se rettene.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedMenu.title}</Text>
      {selectedMenu.items.map((item, index) => (
        <Text key={`${selectedMenu.title}-${index}`} style={styles.item}>
          {index + 1}. {item}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#222',
  },
  placeholderTitle: {
    color: colors.text,
    fontWeight: '700',
    marginBottom: 4,
  },
  placeholderText: {
    color: colors.muted,
  },
  container: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 18,
  },
  title: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 8,
  },
  item: {
    color: colors.muted,
    marginBottom: 4,
  },
});
