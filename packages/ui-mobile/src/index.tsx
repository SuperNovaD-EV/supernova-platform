import type { ReactNode } from "react";
import { I18nManager, StyleSheet, Text, View } from "react-native";
import { tokens } from "@supernova/design-tokens";
import { getDirection, type Locale } from "@supernova/localization";

export function MobileShell(props: {
  locale: Locale;
  title: string;
  subtitle: string;
  children?: ReactNode;
}) {
  const direction = getDirection(props.locale);
  return (
    <View style={[styles.root, { direction }]}>
      <Text style={styles.eyebrow}>
        {direction === "rtl" || I18nManager.isRTL ? "RTL" : "LTR"}
      </Text>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.subtitle}>{props.subtitle}</Text>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    padding: tokens.spacing.xl,
    backgroundColor: tokens.light.surface.canvas,
  },
  eyebrow: {
    color: tokens.light.text.muted,
    marginBottom: tokens.spacing.sm,
  },
  title: {
    color: tokens.light.text.primary,
    fontSize: 34,
    fontWeight: "800",
    marginBottom: tokens.spacing.md,
  },
  subtitle: {
    color: tokens.light.text.muted,
    fontSize: 18,
  },
});
