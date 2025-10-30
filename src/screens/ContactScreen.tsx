import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, RefreshControl } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import Section from '../components/Section';
import Header from '../components/Header';
import CTAButton from '../components/CTAButton';
import InfoStrip from '../components/InfoStrip';
import { colors } from '../theme';
import { RootTabParamList } from '../navigation/types';
import { Booking, fetchBookings } from '../api/bookings';
import { usePreferences } from '../context/PreferencesContext';

type ContactScreenProps = BottomTabScreenProps<RootTabParamList, 'Kontakt'>;

const INFO_LINES = [
  'Telefon: 12 34 56 78',
  'E-post: post@pellesdiner.no',
  'Adresse: Olavsgate 3, 4005 Stavanger',
];

export default function ContactScreen({ navigation }: ContactScreenProps) {
  const canGoBack = navigation.canGoBack();
  const { preferences } = usePreferences();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const infoItems = useMemo(() => {
    const items = [...INFO_LINES];
    const parts: string[] = [];
    if (preferences.name) parts.push(`Navn: ${preferences.name}`);
    if (
      preferences.defaultGuestCount !== undefined &&
      Number.isFinite(preferences.defaultGuestCount)
    ) {
      parts.push(`Standard gjester: ${preferences.defaultGuestCount}`);
    }
    if (parts.length > 0) {
      items.push(`Dine preferanser – ${parts.join(' | ')}`);
    }
    return items;
  }, [preferences.name, preferences.defaultGuestCount]);

  const loadBookings = useCallback(async (mode: 'initial' | 'refresh' = 'initial') => {
    mode === 'initial' ? setLoading(true) : setRefreshing(true);
    try {
      setError(null);
      const data = await fetchBookings();
      setBookings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kunne ikke hente reservasjoner.');
    } finally {
      mode === 'initial' ? setLoading(false) : setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadBookings('initial');
  }, [loadBookings]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadBookings('refresh')}
            tintColor={colors.primary}
          />
        )}
      >
        <Header
          showBack={canGoBack}
          onBack={() => navigation.goBack()}
        />
        <InfoStrip items={infoItems} />
        <Section title="Kontakt oss">
          <Text style={styles.body}>
            Vi er glade for å høre fra deg! Du kan sende oss en melding, ringe eller besøke oss i
            restauranten. Vi svarer innen kort tid på alle henvendelser.
          </Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Åpningstider</Text>
            <Text style={styles.cardLine}>Mandag - Lørdag: 08:00 - 24:00</Text>
            <Text style={styles.cardLine}>Søndag: 10:00 - 23:00</Text>
          </View>
          <CTAButton
            label="Book bord"
            onPress={() => navigation.navigate('Bestilling')}
          />
        </Section>
        <Section title="Finn oss">
          <View style={styles.card}>
            <Text style={styles.cardLine}>Olavsgate 3</Text>
            <Text style={styles.cardLine}>4005 Stavanger</Text>
            <Text style={styles.cardLine}>Norge</Text>
          </View>
        </Section>
        <Section title="Siste reservasjoner">
          {loading ? <Text style={styles.metaText}>Laster reservasjoner…</Text> : null}
          {error ? <Text style={styles.errorText}>Feil: {error}</Text> : null}
          {bookings.length === 0 && !loading && !error ? (
            <Text style={styles.metaText}>Ingen forespørsler registrert enda.</Text>
          ) : null}
          {bookings.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              <Text style={styles.bookingTitle}>{booking.name}</Text>
              <Text style={styles.bookingLine}>Gjester: {booking.guestCount}</Text>
              {booking.notes ? (
                <Text style={styles.bookingLine}>Notat: {booking.notes}</Text>
              ) : null}
              {booking.createdAt ? (
                <Text style={styles.bookingMeta}>Opprettet: {formatDate(booking.createdAt)}</Text>
              ) : null}
              {booking.updatedAt ? (
                <Text style={styles.bookingMeta}>Oppdatert: {formatDate(booking.updatedAt)}</Text>
              ) : null}
            </View>
          ))}
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

function formatDate(date: string) {
  try {
    return new Intl.DateTimeFormat('no-NO', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date(date));
  } catch {
    return date;
  }
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bg },
  scrollContent: { paddingBottom: 24 },
  body: { color: colors.muted, marginBottom: 16, lineHeight: 20 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#222',
    marginBottom: 16,
  },
  cardTitle: { color: colors.text, fontWeight: '700', marginBottom: 8, fontSize: 16 },
  cardLine: { color: colors.muted, marginBottom: 4 },
  metaText: { color: colors.muted, marginBottom: 12 },
  errorText: { color: '#f87171', marginBottom: 12 },
  bookingCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#222',
    marginBottom: 12,
  },
  bookingTitle: { color: colors.text, fontWeight: '700', marginBottom: 4 },
  bookingLine: { color: colors.muted, marginBottom: 2 },
  bookingMeta: { color: colors.muted, fontSize: 12, marginTop: 6 },
});
