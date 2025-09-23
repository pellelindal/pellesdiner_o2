import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from './src/theme';
import Header from './src/components/Header';
import Hero from './src/components/Hero';
import Section from './src/components/Section';
import MenuCard from './src/components/MenuCard';
import InfoStrip from './src/components/InfoStrip';
import Footer from './src/components/Footer';
import { menuData } from './src/data/menu';


export default function App() {
  return (
    <SafeAreaView style={{flex:1, backgroundColor: colors.bg}}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{paddingBottom: 32}}>
        <Header />
        <Hero />
        <InfoStrip />
        <Section title="Smaksopplevelser fra grillen">
          <View style={styles.menuGrid}>
            {menuData.map((m) => (
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
