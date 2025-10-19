import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import Section from '../components/Section';
import Header from '../components/Header';
import CTAButton from '../components/CTAButton';
import InfoStrip from '../components/InfoStrip';
import { colors } from '../theme';
import { RootTabParamList } from '../navigation/types';

type ContactScreenProps = BottomTabScreenProps<RootTabParamList, 'Kontakt'>;

const INFO_LINES = [
  'Telefon: 12 34 56 78',
  'E-post: post@pellesdiner.no',
  'Adresse: Olavsgate 3, 4005 Stavanger',
];

export default function ContactScreen({ navigation }: ContactScreenProps) {
  const canGoBack = navigation.canGoBack();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header
          showBack={canGoBack}
          onBack={() => navigation.goBack()}
        />
        <InfoStrip items={INFO_LINES} />
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
      </ScrollView>
    </SafeAreaView>
  );
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
});
