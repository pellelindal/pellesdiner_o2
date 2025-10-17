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
import CategoryTabs from './src/components/CategoryTabs';
import MenuDetails from './src/components/MenuDetails';

const HERO_COPY = {
  default: {
    kicker: 'Selskap, drop-in og take-away',
    title: 'Nyåpnet restaurant i Stavanger!',
    subtitle: 'Vær ute i god tid, lokalene bookes fort.',
  },
  book: {
    kicker: 'Bestill bord i dag',
    title: 'La oss holde av et bord for deg',
    subtitle: 'Trykk på boksen under for å gi oss beskjed om når dere kommer.',
  },
  menu: {
    kicker: 'Oppdag menyen',
    title: 'Hver rett har sin historie',
    subtitle: 'Bla gjennom kategoriene under for å finne din favoritt.',
  },
};

const INFO_COPY = {
  default: [
    'Åpningstider: Man-Lør 08-24 | Søndag 10-23',
    'Adresse: Olavsgate 3, 4005 Stavanger',
  ],
  book: [
    'Booking: Ring 51 00 00 00 eller send e-post til bord@pellesdiner.no',
    'Vi bekrefter alle reservasjoner innen 2 timer.',
  ],
  menu: [
    'Tips: Trykk på en kategori for å se detaljene.',
    'Favoritter markerer vi med en stjerne i restauranten.',
  ],
};

type HeroMode = 'default' | 'book' | 'menu';

export default function App() {
  const heroImage = require('./assets/hero.jpg');

  const [heroMode, setHeroMode] = useState<HeroMode>('default');
  const [infoItems, setInfoItems] = useState<string[]>(INFO_COPY.default);
  const [menus] = useState<MenuSection[]>(menuData);
  const [activeCategory, setActiveCategory] = useState<string>('Alle');
  const [selectedMenu, setSelectedMenu] = useState<MenuSection | null>(null);

  const heroContent = HERO_COPY[heroMode];
  const categories = ['Alle', ...menus.map((menu) => menu.title)];
  const visibleMenus = activeCategory === 'Alle'
    ? menus
    : menus.filter((menu) => menu.title === activeCategory);

  const heroActions: HeroAction[] = [
    {
      label: heroMode === 'book' ? 'Tilbake' : 'Book bord',
      variant: 'primary',
      onPress: () => handleHeroBook(),
    },
    {
      label: heroMode === 'menu' ? 'Vis start' : 'Våre menyer',
      variant: 'ghost',
      onPress: () => handleHeroMenu(),
    },
  ];

  function handleHeroBook() {
    if (heroMode === 'book') {
      setHeroMode('default');
      setInfoItems(INFO_COPY.default);
      return;
    }
    setHeroMode('book');
    setInfoItems(INFO_COPY.book);
  }

  function handleHeroMenu() {
    if (heroMode === 'menu') {
      setHeroMode('default');
      setActiveCategory('Alle');
      setSelectedMenu(null);
      setInfoItems(INFO_COPY.default);
      return;
    }
    setHeroMode('menu');
    const firstMenu = menus[0] ?? null;
    setActiveCategory(firstMenu ? firstMenu.title : 'Alle');
    setSelectedMenu(firstMenu);
    setInfoItems(INFO_COPY.menu);
  }

  function handleSelectCategory(category: string) {
    setActiveCategory(category);
    if (category === 'Alle') {
      setSelectedMenu(null);
      return;
    }

    const found = menus.find((menu) => menu.title === category) ?? null;
    setSelectedMenu(found);
  }

  function handleSelectMenu(menu: MenuSection) {
    setSelectedMenu(menu);
    setActiveCategory(menu.title);
  }

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
  menuGrid: { gap: 12, paddingHorizontal: 2 }
});
