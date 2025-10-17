import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from './src/theme';
import Header from './src/components/Header';
import Hero, { HeroAction } from './src/components/Hero';
import Section from './src/components/Section';
import MenuCard from './src/components/MenuCard';
import InfoStrip from './src/components/InfoStrip';
import Footer from './src/components/Footer';
import { menuData, MenuSection } from './src/data/menu';
export default function App() {
  const heroImage = require('./assets/hero.jpg');

  const [heroContent] = useState({
    kicker: 'Selskap, drop-in og take-away',
    title: 'Nyapnet restaurant i Stavanger!',
    subtitle: 'Vaer ute i god tid, lokalene bookes fort.',
  });

  const [heroActions] = useState<HeroAction[]>([
    { label: 'Book bord', variant: 'primary', onPress: () => {} },
    { label: 'Våre menyer', variant: 'ghost', onPress: () => {} },
  ]);

  const [infoItems] = useState<string[]>([
    'Åpningstider: Man-Lør 08-24 | Søndag 10-23',
    'Adresse: Olavsgate 3, 4005 Stavanger',
  ]);

  const [menus] = useState<MenuSection[]>(menuData);

  return (
    <SafeAreaView style={{flex:1, backgroundColor: colors.bg}}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{paddingBottom: 32}}>
        <Header />
        <Hero
          kicker={heroContent.kicker}
          title={heroContent.title}
          subtitle={heroContent.subtitle}
          image={heroImage}
          actions={heroActions}
        />
        <InfoStrip items={infoItems} />
        <Section title="Smaksopplevelser fra grillen">
          <View style={styles.menuGrid}>
            {menus.map((m) => (
              <MenuCard key={m.title} title={m.title} items={m.items} />
            ))}
          </View>
        </Section>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  menuGrid: { gap: 12, paddingHorizontal: 2 }
});
