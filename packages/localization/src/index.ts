export type Locale = "en" | "ar";
export type Direction = "ltr" | "rtl";

export const resources = {
  en: {
    brand: "SuperNova",
    foundation: "Safety-first mobility foundation",
    riderShell: "Rider prototype",
    driverShell: "Driver prototype",
    adminShell: "Operations command center",
    marketingShell: "Premium safety-first mobility for Cairo and Giza",
    direction: "Left-to-right",
    prototypeOnly: "Static prototype only",
    primaryDestination: "Where are you going?",
    protectedTrip: "Trip protection active",
    startRide: "Start ride",
    goOnline: "Go online",
    acceptRide: "Accept ride",
    emergencyHold: "Hold for SOS",
  },
  ar: {
    brand: "SuperNova",
    foundation: "أساس تنقل يضع السلامة أولا",
    riderShell: "نموذج تطبيق الراكب",
    driverShell: "نموذج تطبيق السائق",
    adminShell: "مركز عمليات SuperNova",
    marketingShell: "تنقل فاخر يضع السلامة أولا في القاهرة والجيزة",
    direction: "من اليمين إلى اليسار",
    prototypeOnly: "نموذج ثابت فقط",
    primaryDestination: "إلى أين تريد الذهاب؟",
    protectedTrip: "حماية الرحلة مفعلة",
    startRide: "ابدأ الرحلة",
    goOnline: "ابدأ استقبال الرحلات",
    acceptRide: "اقبل الرحلة",
    emergencyHold: "اضغط مطولا للطوارئ",
  },
} as const;

export type MessageKey = keyof typeof resources.en;

export function getDirection(locale: Locale): Direction {
  return locale === "ar" ? "rtl" : "ltr";
}

export function t(locale: Locale, key: MessageKey): string {
  return resources[locale][key];
}

export function formatNumber(locale: Locale, value: number): string {
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US").format(
    value,
  );
}

export function formatCurrency(locale: Locale, minorUnits: number): string {
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(minorUnits / 100);
}

export function formatCairoTime(locale: Locale, value: Date): string {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Cairo",
  }).format(value);
}

export function formatDate(locale: Locale, value: Date): string {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", {
    dateStyle: "medium",
    timeZone: "Africa/Cairo",
  }).format(value);
}
