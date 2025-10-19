import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TextInput } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import Section from '../components/Section';
import Header from '../components/Header';
import CTAButton from '../components/CTAButton';
import { colors } from '../theme';
import { RootTabParamList } from '../navigation/types';

type BookingScreenProps = BottomTabScreenProps<RootTabParamList, 'Bestilling'>;

export default function BookingScreen({ navigation }: BookingScreenProps) {
  const [name, setName] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [notes, setNotes] = useState('');
  const canGoBack = navigation.canGoBack();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header
          showBack={canGoBack}
          onBack={() => navigation.goBack()}
        />
        <Section title="Book bord">
          <Text style={styles.leadText}>
            Fyll ut informasjonen under, så tar vi kontakt for å bekrefte reservasjonen.
          </Text>
          <View style={styles.field}>
            <Text style={styles.label}>Navn</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Ditt navn"
              placeholderTextColor={colors.muted}
              style={styles.input}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Antall gjester</Text>
            <TextInput
              value={guestCount}
              onChangeText={setGuestCount}
              placeholder="Eks. 4"
              placeholderTextColor={colors.muted}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Notat</Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Fortell oss om eventuelle allergier"
              placeholderTextColor={colors.muted}
              multiline
              style={[styles.input, styles.multiline]}
            />
          </View>
          <CTAButton
            label="Send forespørsel"
            onPress={() => navigation.navigate('Kontakt')}
          />
        </Section>
        <Section title="Telefon og e-post">
          <Text style={styles.info}>
            Foretrekker du å snakke med oss direkte? Ring 12 34 56 78 eller send en e-post til
            bord@pellesdiner.no. Vi svarer innen kort tid.
          </Text>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bg },
  scrollContent: { paddingBottom: 24 },
  leadText: { color: colors.muted, marginBottom: 16 },
  field: { marginBottom: 16 },
  label: { color: colors.text, fontWeight: '700', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  multiline: { minHeight: 96, textAlignVertical: 'top' },
  info: { color: colors.muted, lineHeight: 20 },
});
