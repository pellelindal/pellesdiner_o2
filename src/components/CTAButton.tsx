import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../theme';

export type CTAButtonVariant = 'primary' | 'ghost';

export type CTAButtonProps = {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: CTAButtonVariant;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function CTAButton({
  label,
  onPress,
  variant = 'primary',
  style,
  textStyle,
}: CTAButtonProps) {
  const isPrimary = variant === 'primary';
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.base, isPrimary ? styles.primary : styles.ghost, style]}
    >
      <Text style={[styles.label, isPrimary ? styles.primaryLabel : styles.ghostLabel, textStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  label: {
    fontWeight: '700',
    textAlign: 'center',
  },
  primaryLabel: {
    color: '#1a1a1a',
  },
  ghostLabel: {
    color: colors.primary,
  },
});
