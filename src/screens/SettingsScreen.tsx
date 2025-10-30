import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TextInput } from 'react-native';
import Section from '../components/Section';
import Header from '../components/Header';
import CTAButton from '../components/CTAButton';
import { colors } from '../theme';
import { usePreferences } from '../context/PreferencesContext';

export default function SettingsScreen() {
  const { ready, preferences, updatePreferences, clear } = usePreferences();
  const [name, setName] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  // Populate local form state once preferences are ready
  useEffect(() => {
    if (!ready) return;
    setName(preferences.name ?? '');
    setGuestCount(
      preferences.defaultGuestCount !== undefined && Number.isFinite(preferences.defaultGuestCount)
        ? String(preferences.defaultGuestCount)
        : ''
    );
  }, [ready, preferences.name, preferences.defaultGuestCount]);

  const parsedGuestCount = useMemo(() => {
    const n = Number(guestCount);
    return Number.isFinite(n) && n > 0 ? n : undefined;
  }, [guestCount]);

  async function handleSave() {
    await updatePreferences({
      name: name.trim() || undefined,
      defaultGuestCount: parsedGuestCount,
    });
    setStatus('Innstillinger lagret på enheten.');
    setTimeout(() => setStatus(null), 1500);
  }

  async function handleResetAll() {
    await clear();
    setStatus('Alle personlige innstillinger er slettet.');
    setName('');
    setGuestCount('');
    setTimeout(() => setStatus(null), 1500);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header />
        <Section title="Personlige innstillinger">
          <Text style={styles.lead}>Disse verdiene lagres lokalt på enheten.</Text>
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
            <Text style={styles.label}>Standard antall gjester</Text>
            <TextInput
              value={guestCount}
              onChangeText={setGuestCount}
              placeholder="Eks. 2"
              placeholderTextColor={colors.muted}
              keyboardType="numeric"
              style={styles.input}
            />
            <Text style={styles.help}>Brukes som forslag i bestillingsskjema.</Text>
          </View>
          {status ? <Text style={styles.status}>{status}</Text> : null}
          <CTAButton label="Lagre" onPress={handleSave} />
        </Section>

        <Section title="Andre valg">
          <View style={styles.row}>
            <CTAButton label="Slett alt" variant="ghost" onPress={handleResetAll} />
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bg },
  scrollContent: { paddingBottom: 24 },
  lead: { color: colors.muted, marginBottom: 12 },
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
  help: { color: colors.muted, fontSize: 12, marginTop: 6 },
  status: { color: colors.muted, marginBottom: 12 },
  row: { flexDirection: 'row', gap: 12 },
});
