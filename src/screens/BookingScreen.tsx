import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import Section from '../components/Section';
import Header from '../components/Header';
import CTAButton from '../components/CTAButton';
import { colors } from '../theme';
import { RootTabParamList } from '../navigation/types';
import { usePreferences } from '../context/PreferencesContext';
import {
  Booking,
  createBooking,
  deleteBooking,
  fetchBookings,
  updateBooking,
} from '../api/bookings';

type BookingScreenProps = BottomTabScreenProps<RootTabParamList, 'Bestilling'>;

export default function BookingScreen({ navigation }: BookingScreenProps) {
  const { ready: prefsReady, preferences } = usePreferences();
  const [name, setName] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [notes, setNotes] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [latestBooking, setLatestBooking] = useState<Booking | null>(null);
  const canGoBack = navigation.canGoBack();

  const loadLatest = useCallback(async () => {
    try {
      const data = await fetchBookings();
      if (data.length > 0) {
        const booking = data[0];
        setLatestBooking(booking);
        setName(booking.name);
        setGuestCount(String(booking.guestCount));
        setNotes(booking.notes);
        setStatusMessage('Siste reservasjon lastet fra serveren.');
      }
    } catch (err) {
      setStatusMessage('Kunne ikke hente tidligere reservasjoner.');
    }
  }, []);

  useEffect(() => {
    loadLatest();
  }, [loadLatest]);

  // Apply persisted defaults if no booking exists
  useEffect(() => {
    if (!prefsReady || latestBooking) return;
    if (!name && preferences.name) {
      setName(preferences.name);
    }
    if (!guestCount && preferences.defaultGuestCount && Number.isFinite(preferences.defaultGuestCount)) {
      setGuestCount(String(preferences.defaultGuestCount));
    }
  }, [prefsReady, latestBooking, preferences.name, preferences.defaultGuestCount, name, guestCount]);

  const bookingPayload = useMemo(() => ({
    name: name.trim(),
    guestCount: Number(guestCount),
    notes: notes.trim(),
  }), [name, guestCount, notes]);

  function validatePayload() {
    if (!bookingPayload.name) {
      Alert.alert('Ugyldig navn', 'Skriv inn ditt navn.');
      return false;
    }
    if (!Number.isFinite(bookingPayload.guestCount) || bookingPayload.guestCount <= 0) {
      Alert.alert('Ugyldig antall', 'Oppgi hvor mange som skal spise.');
      return false;
    }
    return true;
  }

  const handleCreate = useCallback(async () => {
    if (!validatePayload()) {
      return;
    }
    setIsSaving(true);
    try {
      const created = await createBooking(bookingPayload);
      setLatestBooking(created);
      setStatusMessage('Reservasjonen ble sendt til serveren.');
      Alert.alert('Reservasjon sendt', 'Vi tar kontakt for å bekrefte.');
    } catch (err) {
      setStatusMessage(
        err instanceof Error ? err.message : 'Kunne ikke sende reservasjonen.',
      );
    } finally {
      setIsSaving(false);
    }
  }, [bookingPayload]);

  const handleUpdate = useCallback(async () => {
    if (!latestBooking) {
      return;
    }
    if (!validatePayload()) {
      return;
    }
    setIsSaving(true);
    try {
      const updated = await updateBooking(latestBooking.id, bookingPayload, latestBooking);
      setLatestBooking(updated);
      setStatusMessage('Reservasjonen ble oppdatert.');
      Alert.alert('Oppdatert', 'Reservasjonen er oppdatert hos oss.');
    } catch (err) {
      setStatusMessage(
        err instanceof Error ? err.message : 'Kunne ikke oppdatere reservasjonen.',
      );
    } finally {
      setIsSaving(false);
    }
  }, [bookingPayload, latestBooking]);

  const handleDelete = useCallback(async () => {
    if (!latestBooking) {
      return;
    }
    setIsSaving(true);
    try {
      await deleteBooking(latestBooking.id);
      setLatestBooking(null);
      setName('');
      setGuestCount('');
      setNotes('');
      setStatusMessage('Reservasjonen er slettet.');
      Alert.alert('Slettet', 'Reservasjonen ble fjernet.');
    } catch (err) {
      setStatusMessage(
        err instanceof Error ? err.message : 'Kunne ikke slette reservasjonen.',
      );
    } finally {
      setIsSaving(false);
    }
  }, [latestBooking]);

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
          {statusMessage ? <Text style={styles.status}>{statusMessage}</Text> : null}
          <CTAButton
            label="Send forespørsel"
            onPress={handleCreate}
            disabled={isSaving}
          />
          <View style={styles.actionsRow}>
            <CTAButton
              label="Oppdater"
              variant="ghost"
              onPress={handleUpdate}
              disabled={!latestBooking || isSaving}
            />
            <CTAButton
              label="Slett"
              variant="ghost"
              onPress={handleDelete}
              disabled={!latestBooking || isSaving}
              style={styles.deleteButton}
              textStyle={styles.deleteText}
            />
          </View>
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
  status: { color: colors.muted, marginBottom: 12 },
  actionsRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  deleteButton: { borderColor: '#dc2626' },
  deleteText: { color: '#dc2626' },
});
