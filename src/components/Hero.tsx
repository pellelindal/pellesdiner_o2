import React from 'react';
import { View, Text, ImageBackground, StyleSheet, ImageSourcePropType } from 'react-native';
import { colors } from '../theme';
import CTAButton, { CTAButtonProps } from './CTAButton';

export type HeroAction = CTAButtonProps;

export type HeroProps = {
  kicker: string;
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
  actions?: HeroAction[];
};

export default function Hero({ kicker, title, subtitle, image, actions = [] }: HeroProps) {
  return (
    <View style={styles.heroWrap}>
      <ImageBackground source={image} resizeMode="cover" style={styles.hero}>
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Text style={styles.kicker}>{kicker}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          {actions.length > 0 ? (
            <View style={styles.ctaRow}>
              {actions.map((action) => (
                <CTAButton key={action.label} {...action} />
              ))}
            </View>
          ) : null}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  heroWrap: { borderBottomLeftRadius: 24, borderBottomRightRadius: 24, overflow: 'hidden' },
  hero: { height: 420, justifyContent: 'flex-end' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.overlay },
  heroContent: { padding: 20 },
  kicker: { color: colors.muted, textTransform: 'uppercase', letterSpacing: 1, fontSize: 12, marginBottom: 8 },
  title: { color: colors.text, fontSize: 28, lineHeight: 34, fontWeight: '800', marginBottom: 8 },
  subtitle: { color: colors.muted, fontSize: 14, lineHeight: 20 },
  ctaRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
});
