import { useMemo, useState } from "react";
import { ScrollView } from "react-native";
import {
  AppScreen,
  Button,
  EmergencyButton,
  FareSummary,
  Inline,
  MapCanvas,
  MoneyText,
  NovaAtmosphere,
  PickupMarker,
  DestinationMarker,
  DriverMarker,
  RideStatusTimeline,
  SegmentedControl,
  Spacer,
  StatusPill,
  Surface,
  Text,
  TextField,
  VehicleOptionCard,
  type PrototypeContext,
} from "@supernova/ui-mobile";
import {
  demoDriver,
  demoRide,
  demoRider,
  demoSafetyEvents,
  demoVehicleOptions,
} from "@supernova/testing";
import { t, type Locale } from "@supernova/localization";
import type { ThemeMode } from "@supernova/design-tokens";

type RiderScreen = {
  id: string;
  title: string;
  subtitle: string;
  primary: string;
};

const screens: readonly RiderScreen[] = [
  {
    id: "splash",
    title: "SuperNova",
    subtitle: "Premium safety-first mobility",
    primary: "Choose language",
  },
  {
    id: "language",
    title: "Language",
    subtitle: "English or Arabic review mode",
    primary: "Continue",
  },
  {
    id: "onboarding",
    title: "Move with calm confidence",
    subtitle: "Verified drivers, transparent pricing, online payment",
    primary: "Sign in",
  },
  {
    id: "signin",
    title: "Phone sign-in",
    subtitle: "Visual state only, no OTP is sent",
    primary: "Send demo code",
  },
  {
    id: "otp",
    title: "OTP verification",
    subtitle: "Demo code entry state",
    primary: "Verify",
  },
  {
    id: "location",
    title: "Location permission",
    subtitle: "Prototype uses fictional Cairo/Giza locations",
    primary: "Open map",
  },
  {
    id: "home",
    title: "Rider map home",
    subtitle: demoRider.homeLabel,
    primary: "Search destination",
  },
  {
    id: "search",
    title: "Destination search",
    subtitle: "Home, Work, and recent demo places",
    primary: "Confirm destination",
  },
  {
    id: "pickup",
    title: "Pickup confirmation",
    subtitle: demoRide.pickup,
    primary: "Choose vehicle",
  },
  {
    id: "vehicles",
    title: "Vehicle category",
    subtitle: "Configurable conceptual categories",
    primary: "Review fare",
  },
  {
    id: "fare",
    title: "Fare review",
    subtitle: "Fictional EGP demo values",
    primary: "Confirm request",
  },
  {
    id: "searching",
    title: "Searching for driver",
    subtitle: "Static matching illustration",
    primary: "Assign driver",
  },
  {
    id: "assigned",
    title: "Driver assigned",
    subtitle: demoDriver.vehicle,
    primary: "Track arrival",
  },
  {
    id: "arriving",
    title: "Driver arriving",
    subtitle: "ETA 3 min",
    primary: "Mark arrived",
  },
  {
    id: "arrived",
    title: "Driver arrived",
    subtitle: "Verify driver and vehicle",
    primary: "Verify trip start",
  },
  {
    id: "verify-choice",
    title: "QR or PIN",
    subtitle: "PIN fallback is always available",
    primary: "Use PIN",
  },
  {
    id: "pin",
    title: "PIN verification",
    subtitle: "Single-use demo PIN",
    primary: "Start trip",
  },
  {
    id: "active",
    title: "Active trip",
    subtitle: demoRide.destination,
    primary: "Open safety",
  },
  {
    id: "safety",
    title: "Safety center",
    subtitle: "Trip sharing and SOS protection",
    primary: "Share trip",
  },
  {
    id: "share",
    title: "Share trip",
    subtitle: `Trusted contact: ${demoRider.trustedContact}`,
    primary: "Complete trip",
  },
  {
    id: "completed",
    title: "Trip completed",
    subtitle: "Payment completion preview",
    primary: "View payment",
  },
  {
    id: "payment",
    title: "Payment result",
    subtitle: "Online payment architecture preview",
    primary: "Rate trip",
  },
  {
    id: "rating",
    title: "Rating",
    subtitle: "Evidence-based support remains available",
    primary: "Trip history",
  },
  {
    id: "history",
    title: "Trip history",
    subtitle: "Demo completed rides",
    primary: "Profile",
  },
  {
    id: "profile",
    title: "Profile and settings",
    subtitle: "Prototype controls and privacy reminders",
    primary: "Restart flow",
  },
] as const;

export default function Page() {
  const [index, setIndex] = useState(0);
  const [locale, setLocale] = useState<Locale>("en");
  const [theme, setTheme] = useState<ThemeMode>("light");
  const context = useMemo<PrototypeContext>(
    () => ({ locale, theme }),
    [locale, theme],
  );
  const screen = screens[index] ?? screens[0];
  const next = () => {
    setIndex((current) => (current + 1) % screens.length);
  };

  return (
    <AppScreen {...context}>
      <ScrollView
        contentContainerStyle={{ gap: 16, padding: 20, paddingBottom: 44 }}
      >
        <Inline style={{ justifyContent: "space-between" }}>
          <StatusPill
            {...context}
            label={t(locale, "prototypeOnly")}
            variant="info"
          />
          <Inline>
            <SegmentedControl
              {...context}
              options={["en", "ar"]}
              value={locale}
              onChange={(value) => {
                setLocale(value === "ar" ? "ar" : "en");
              }}
            />
            <SegmentedControl
              {...context}
              options={["light", "dark"]}
              value={theme}
              onChange={(value) => {
                setTheme(value === "dark" ? "dark" : "light");
              }}
            />
          </Inline>
        </Inline>

        <Surface {...context} elevated>
          {["splash", "onboarding", "searching", "payment"].includes(
            screen.id,
          ) ? (
            <NovaAtmosphere {...context} compact={screen.id !== "searching"} />
          ) : null}
          <Text {...context} role="title">
            {locale === "ar" ? translateTitle(screen.id) : screen.title}
          </Text>
          <Text {...context} muted>
            {locale === "ar" ? translateSubtitle(screen.id) : screen.subtitle}
          </Text>
        </Surface>

        {[
          "home",
          "search",
          "pickup",
          "vehicles",
          "fare",
          "searching",
          "assigned",
          "arriving",
          "arrived",
          "active",
          "safety",
          "share",
        ].includes(screen.id) ? (
          <MapCanvas {...context}>
            <PickupMarker {...context} />
            <DestinationMarker {...context} />
            <DriverMarker {...context} />
          </MapCanvas>
        ) : null}

        <ScreenBody context={context} screenId={screen.id} />

        <Button
          {...context}
          label={locale === "ar" ? translateAction(screen.id) : screen.primary}
          onPress={next}
        />
        <Spacer />
        <Text {...context} role="caption" muted>
          {index + 1} / {screens.length} - Local prototype state only - no API
          calls.
        </Text>
      </ScrollView>
    </AppScreen>
  );
}

function ScreenBody(props: { context: PrototypeContext; screenId: string }) {
  const { context, screenId } = props;
  if (screenId === "signin") {
    return (
      <TextField {...context} label="Phone" value="Demo phone visual state" />
    );
  }
  if (screenId === "otp") {
    return <TextField {...context} label="OTP" value="****" />;
  }
  if (screenId === "vehicles") {
    return (
      <>
        {demoVehicleOptions.slice(0, 4).map((option, index) => (
          <VehicleOptionCard
            {...context}
            key={option.category}
            title={option.category}
            eta={option.eta}
            fareMinor={option.fareMinor}
            capacity={option.capacity}
            selected={index === 2}
          />
        ))}
      </>
    );
  }
  if (screenId === "home" || screenId === "search") {
    return (
      <Surface {...context} elevated>
        <Text {...context} role="section">
          {context.locale === "ar"
            ? "إلى أين تريد الذهاب؟"
            : "Where are you going?"}
        </Text>
        <Text {...context} muted>
          Home · Work · Recent destination · protected trip access
        </Text>
        <Inline style={{ flexWrap: "wrap" }}>
          {["Home", "Work", "Zamalek"].map((item) => (
            <StatusPill {...context} key={item} label={item} variant="info" />
          ))}
        </Inline>
      </Surface>
    );
  }
  if (screenId === "searching") {
    return (
      <Surface {...context} elevated>
        <NovaAtmosphere {...context} />
        <Text {...context} role="section">
          Matching with verified nearby drivers
        </Text>
        <Text {...context} muted>
          Checking payment confirmation, vehicle eligibility, and pickup ETA.
        </Text>
        <StatusPill {...context} label="Search progress 62%" variant="info" />
      </Surface>
    );
  }
  if (screenId === "fare" || screenId === "payment") {
    return (
      <FareSummary
        {...context}
        fareMinor={demoRide.estimateMinor}
        distance={`${String(demoRide.distanceKm)} km`}
        duration={`${String(demoRide.durationMinutes)} min`}
      />
    );
  }
  if (
    screenId === "assigned" ||
    screenId === "arriving" ||
    screenId === "arrived"
  ) {
    return (
      <Surface {...context}>
        <Text {...context} role="section">
          {demoDriver.name}
        </Text>
        <Text {...context} muted>
          {demoDriver.verification} · {demoDriver.vehicle}
        </Text>
        <StatusPill {...context} label="Vehicle verified" variant="success" />
      </Surface>
    );
  }
  if (screenId === "pin") {
    return <TextField {...context} label="PIN" value={demoRide.pin} />;
  }
  if (screenId === "active" || screenId === "safety" || screenId === "share") {
    return (
      <>
        <RideStatusTimeline {...context} items={demoSafetyEvents} />
        <EmergencyButton {...context} />
      </>
    );
  }
  if (screenId === "completed" || screenId === "history") {
    return (
      <Surface {...context}>
        <Text {...context} role="section">
          {demoRide.destination}
        </Text>
        <MoneyText {...context} minorUnits={demoRide.estimateMinor} />
      </Surface>
    );
  }
  return (
    <Surface {...context}>
      <Text {...context}>{t(context.locale, "protectedTrip")}</Text>
      <Text {...context} muted>
        {demoRide.routeSummary}
      </Text>
    </Surface>
  );
}

function translateTitle(id: string): string {
  const titles: Record<string, string> = {
    splash: "SuperNova",
    language: "اللغة",
    onboarding: "تنقل بثقة هادئة",
    signin: "تسجيل الدخول بالهاتف",
    otp: "تأكيد الرمز",
    location: "شرح الموقع",
    home: "خريطة الراكب",
    search: "البحث عن الوجهة",
    pickup: "تأكيد نقطة الانطلاق",
    vehicles: "فئة المركبة",
    fare: "مراجعة السعر",
    searching: "جار البحث عن سائق",
    assigned: "تم تعيين السائق",
    arriving: "السائق في الطريق",
    arrived: "وصل السائق",
    "verify-choice": "QR أو PIN",
    pin: "تأكيد رمز PIN",
    active: "رحلة نشطة",
    safety: "مركز السلامة",
    share: "مشاركة الرحلة",
    completed: "اكتملت الرحلة",
    payment: "نتيجة الدفع",
    rating: "التقييم",
    history: "سجل الرحلات",
    profile: "الملف والإعدادات",
  };
  return titles[id] ?? "نموذج الراكب";
}

function translateSubtitle(id: string): string {
  return id === "home"
    ? "موقع تجريبي آمن في القاهرة والجيزة"
    : "نموذج ثابت ببيانات خيالية فقط";
}

function translateAction(id: string): string {
  return id === "profile" ? "إعادة البدء" : "متابعة";
}
