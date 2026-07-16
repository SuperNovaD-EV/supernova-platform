import { format } from "date-fns";

export type Locale = "en" | "ar";
export type Direction = "ltr" | "rtl";

export const resources = {
  en: {
    brand: "SuperNova",
    foundation: "Safety-first mobility foundation",
    riderShell: "Rider app foundation",
    driverShell: "Driver app foundation",
    adminShell: "Admin foundation",
    marketingShell: "Premium mobility, built from safety primitives",
    direction: "Left-to-right",
  },
  ar: {
    brand: "SuperNova",
    foundation: "اساس تنقل يضع السلامة اولا",
    riderShell: "اساس تطبيق الراكب",
    driverShell: "اساس تطبيق السائق",
    adminShell: "اساس لوحة الادارة",
    marketingShell: "تنقل فاخر مبني على مبادئ السلامة",
    direction: "من اليمين الى اليسار",
  },
} as const;

export function getDirection(locale: Locale): Direction {
  return locale === "ar" ? "rtl" : "ltr";
}

export function t(locale: Locale, key: keyof typeof resources.en): string {
  return resources[locale][key];
}

export function formatNumber(locale: Locale, value: number): string {
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US").format(
    value,
  );
}

export function formatDate(locale: Locale, value: Date): string {
  return format(value, locale === "ar" ? "dd/MM/yyyy" : "MMM d, yyyy");
}
