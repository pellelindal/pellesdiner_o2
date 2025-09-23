import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme';

export default function Hero() {
  return (
    <View style={styles.heroWrap}>
      <ImageBackground source={require('../../assets/hero.jpg')} resizeMode="cover" style={styles.hero}>
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Text style={styles.kicker}>Selskap, drop-in og take-away</Text>
          <Text style={styles.title}>Nyåpnet restaurant i Stavanger!</Text>
          <Text style={styles.subtitle}>
            Vær ute i god tid, lokalene bukkes fort.
          </Text>
          <View style={styles.ctaRow}>
            <TouchableOpacity activeOpacity={0.8} style={[styles.cta, styles.ctaPrimary]}>
              <Text style={styles.ctaPrimaryText}>Book bord</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={[styles.cta, styles.ctaGhost]}>
              <Text style={styles.ctaGhostText}>Våre menyer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  heroWrap: {borderBottomLeftRadius: 24, borderBottomRightRadius: 24, overflow:'hidden'},
  hero: { height: 420, justifyContent: 'flex-end' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.overlay },
  heroContent: { padding: 20 },
  kicker: { color: colors.muted, textTransform: 'uppercase', letterSpacing: 1, fontSize: 12, marginBottom: 8 },
  title: { color: colors.text, fontSize: 28, lineHeight: 34, fontWeight: '800', marginBottom: 8 },
  subtitle: { color: colors.muted, fontSize: 14, lineHeight: 20 },
  ctaRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  cta: { paddingHorizontal: 18, paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: colors.primary },
  ctaPrimary: { backgroundColor: colors.primary, borderColor: colors.primary },
  ctaPrimaryText: { color: '#1a1a1a', fontWeight: '700' },
  ctaGhost: { backgroundColor: 'transparent' },
  ctaGhostText: { color: colors.primary, fontWeight: '700' },
});
