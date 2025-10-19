import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Section from '../components/Section';
import InfoStrip from '../components/InfoStrip';
import MenuCard from '../components/MenuCard';
import Footer from '../components/Footer';
import CategoryTabs from '../components/CategoryTabs';
import MenuDetails from '../components/MenuDetails';
import { colors } from '../theme';
import { menuData, MenuSection } from '../data/menu';
import { RootTabParamList } from '../navigation/types';

type HomeScreenProps = BottomTabScreenProps<RootTabParamList, 'Hjem'>;

const HERO_CONTENT = {
  kicker: 'Selskap, drop-in og take-away',
  title: 'Nyåpnet restaurant i Stavanger!',
  subtitle: 'Vær ute i god tid, lokalene bookes fort.',
};

const DEFAULT_INFO = [
  'Åpningstider: Man-Lør 08-24 | Søndag 10-23',
  'Adresse: Olavsgate 3, 4005 Stavanger',
];

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const heroImage = require('../../assets/hero.jpg');

  const [infoItems, setInfoItems] = useState<string[]>(DEFAULT_INFO);
  const [menus] = useState<MenuSection[]>(menuData);
  const [activeCategory, setActiveCategory] = useState<string>('Alle');
  const [selectedMenu, setSelectedMenu] = useState<MenuSection | null>(null);
  const canGoBack = navigation.canGoBack();

  const categories = useMemo(() => ['Alle', ...menus.map((menu) => menu.title)], [menus]);
  const visibleMenus = activeCategory === 'Alle'
    ? menus
    : menus.filter((menu) => menu.title === activeCategory);

  const heroActions = useMemo(
    () => [
      {
        label: 'Book bord',
        variant: 'primary' as const,
        onPress: () => navigation.navigate('Bestilling'),
      },
      {
        label: 'Kontakt oss',
        variant: 'ghost' as const,
        onPress: () => navigation.navigate('Kontakt'),
      },
    ],
    [navigation],
  );

  function handleSelectCategory(category: string) {
    setActiveCategory(category);
    if (category === 'Alle') {
      setSelectedMenu(null);
      setInfoItems(DEFAULT_INFO);
      return;
    }

    const found = menus.find((menu) => menu.title === category) ?? null;
    setSelectedMenu(found);
    setInfoItems([
      `Du ser nå menyen for ${category.toLowerCase()}.`,
      'Trykk på et kort for å se detaljene.',
    ]);
  }

  function handleSelectMenu(menu: MenuSection) {
    setSelectedMenu(menu);
    setActiveCategory(menu.title);
    setInfoItems([
      `Utvalgte retter fra ${menu.title.toLowerCase()}.`,
      'Se under for detaljer om retten.',
    ]);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header
          showBack={canGoBack}
          onBack={() => navigation.goBack()}
        />
        <Hero
          kicker={HERO_CONTENT.kicker}
          title={HERO_CONTENT.title}
          subtitle={HERO_CONTENT.subtitle}
          image={heroImage}
          actions={heroActions}
        />
        <InfoStrip items={infoItems} />
        <Section title="Smaksopplevelser fra grillen">
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onSelect={handleSelectCategory}
          />
          <View style={styles.menuGrid}>
            {visibleMenus.map((menu) => (
              <MenuCard
                key={menu.title}
                title={menu.title}
                items={menu.items}
                onPress={() => handleSelectMenu(menu)}
                isActive={selectedMenu?.title === menu.title}
              />
            ))}
          </View>
        </Section>
        <Section title="Detaljer">
          <MenuDetails selectedMenu={selectedMenu} />
        </Section>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bg },
  scrollContent: { paddingBottom: 32 },
  menuGrid: { gap: 12, paddingHorizontal: 2 },
});
