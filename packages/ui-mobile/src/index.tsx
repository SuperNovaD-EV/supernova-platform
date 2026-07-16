import type { ReactNode } from "react";
import {
  I18nManager,
  Pressable,
  ScrollView,
  StyleSheet,
  Text as NativeText,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
  Text as SvgText,
} from "react-native-svg";
import {
  createReactNativeTheme,
  type SemanticTheme,
  type ThemeMode,
} from "@supernova/design-tokens";
import {
  formatCurrency,
  getDirection,
  type Locale,
} from "@supernova/localization";

export type PrototypeContext = {
  locale: Locale;
  theme: ThemeMode;
};

type Variant = "default" | "success" | "warning" | "danger" | "info";

const getRuntime = (context: PrototypeContext) => {
  const theme = createReactNativeTheme(context.theme);
  const direction = getDirection(context.locale);
  return { theme, direction };
};

const statusColor = (semantic: SemanticTheme, variant: Variant) => {
  if (variant === "success") return semantic.color.status.success;
  if (variant === "warning") return semantic.color.status.warning;
  if (variant === "danger") return semantic.color.status.danger;
  if (variant === "info") return semantic.color.status.info;
  return semantic.color.brand.primary;
};

export function AppScreen(props: PrototypeContext & { children: ReactNode }) {
  const { theme, direction } = getRuntime(props);
  return (
    <View
      style={[
        styles.screen,
        {
          direction,
          backgroundColor: theme.semantic.color.background.canvas,
        },
      ]}
    >
      {props.children}
    </View>
  );
}

export const SafeAreaScreen = AppScreen;

export function Stack(props: {
  children: ReactNode;
  gap?: number;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[{ gap: props.gap ?? 12 }, props.style]}>
      {props.children}
    </View>
  );
}

export function Inline(props: {
  children: ReactNode;
  gap?: number;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.inline, { gap: props.gap ?? 8 }, props.style]}>
      {props.children}
    </View>
  );
}

export function Surface(
  props: PrototypeContext & {
    children: ReactNode;
    elevated?: boolean;
    style?: StyleProp<ViewStyle>;
  },
) {
  const { theme } = getRuntime(props);
  return (
    <View
      style={[
        styles.surface,
        {
          backgroundColor: props.elevated
            ? theme.semantic.color.background.elevated
            : theme.semantic.color.background.surface,
          borderColor: theme.semantic.color.border.default,
          shadowColor:
            props.theme === "dark"
              ? "#000000"
              : theme.semantic.color.brand.primary,
          shadowOpacity: props.elevated ? 0.22 : 0.08,
          shadowRadius: props.elevated ? 22 : 10,
          shadowOffset: { height: props.elevated ? 14 : 6, width: 0 },
        },
        props.style,
      ]}
    >
      {props.children}
    </View>
  );
}

export function Text(
  props: PrototypeContext & {
    children: ReactNode;
    role?: "title" | "section" | "body" | "caption" | "numeric";
    muted?: boolean;
    style?: StyleProp<TextStyle>;
  },
) {
  const { theme } = getRuntime(props);
  const roleStyle =
    props.role === "title"
      ? styles.title
      : props.role === "section"
        ? styles.sectionTitle
        : props.role === "caption"
          ? styles.caption
          : props.role === "numeric"
            ? styles.numeric
            : styles.body;
  return (
    <NativeText
      style={[
        roleStyle,
        {
          color: props.muted
            ? theme.semantic.color.text.secondary
            : theme.semantic.color.text.primary,
          fontFamily:
            props.locale === "ar"
              ? theme.typography.family.arabic
              : theme.typography.family.latin,
          textAlign: getDirection(props.locale) === "rtl" ? "right" : "left",
          writingDirection: getDirection(props.locale),
        },
        props.style,
      ]}
    >
      {props.children}
    </NativeText>
  );
}

export function Button(
  props: PrototypeContext & {
    label: string;
    onPress?: () => void;
    variant?: Variant;
    disabled?: boolean;
  },
) {
  const { theme } = getRuntime(props);
  const color = statusColor(theme.semantic, props.variant ?? "default");
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={props.label}
      disabled={props.disabled}
      onPress={props.onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: props.disabled
            ? theme.semantic.color.border.default
            : color,
          borderColor: "rgba(255,255,255,0.18)",
          opacity: pressed ? 0.86 : 1,
        },
      ]}
    >
      <NativeText style={styles.buttonText}>{props.label}</NativeText>
    </Pressable>
  );
}

export function IconButton(
  props: PrototypeContext & {
    label: string;
    icon: string;
    onPress?: () => void;
  },
) {
  const { theme } = getRuntime(props);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={props.label}
      onPress={props.onPress}
      style={styles.iconButton}
    >
      <NativeText style={{ color: theme.semantic.color.text.primary }}>
        {props.icon}
      </NativeText>
    </Pressable>
  );
}

export function EmergencyButton(
  props: PrototypeContext & { onPress?: () => void },
) {
  return (
    <Button
      {...props}
      label={props.locale === "ar" ? "اضغط مطولا للطوارئ" : "Hold for SOS"}
      variant="danger"
    />
  );
}

export const HoldToConfirmButton = EmergencyButton;

export function SegmentedControl(
  props: PrototypeContext & {
    options: readonly string[];
    value: string;
    onChange: (value: string) => void;
  },
) {
  const { theme } = getRuntime(props);
  return (
    <View
      style={[
        styles.segmented,
        { backgroundColor: theme.semantic.color.background.inset },
      ]}
    >
      {props.options.map((option) => {
        const selected = option === props.value;
        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected }}
            key={option}
            onPress={() => {
              props.onChange(option);
            }}
            style={[
              styles.segment,
              selected && {
                backgroundColor: theme.semantic.color.brand.primary,
              },
            ]}
          >
            <NativeText
              style={{
                color: selected
                  ? theme.semantic.color.text.inverse
                  : theme.semantic.color.text.secondary,
                fontWeight: "800",
              }}
            >
              {option}
            </NativeText>
          </Pressable>
        );
      })}
    </View>
  );
}

export const Toggle = SegmentedControl;

export function Divider(props: PrototypeContext) {
  const { theme } = getRuntime(props);
  return (
    <View
      style={[
        styles.divider,
        { backgroundColor: theme.semantic.color.border.default },
      ]}
    />
  );
}

export function Spacer(props: { size?: number }) {
  return <View style={{ height: props.size ?? 12 }} />;
}

export function StatusPill(
  props: PrototypeContext & { label: string; variant?: Variant },
) {
  const { theme } = getRuntime(props);
  const color = statusColor(theme.semantic, props.variant ?? "default");
  return (
    <View
      style={[
        styles.pill,
        { backgroundColor: `${color}22`, borderColor: color },
      ]}
    >
      <NativeText style={{ color, fontWeight: "800" }}>
        {props.label}
      </NativeText>
    </View>
  );
}

export const Banner = StatusPill;
export const Toast = StatusPill;
export const TrustBadge = StatusPill;
export const VerificationBadge = StatusPill;
export const LocationAccuracyBadge = StatusPill;
export const ETAChip = StatusPill;

export function AppHeader(
  props: PrototypeContext & {
    title: string;
    subtitle?: string;
    onBack?: () => void;
  },
) {
  return (
    <Inline style={{ justifyContent: "space-between" }}>
      <View style={{ flex: 1 }}>
        <Text {...props} role="section">
          {props.title}
        </Text>
        {props.subtitle ? (
          <Text {...props} role="caption" muted>
            {props.subtitle}
          </Text>
        ) : null}
      </View>
      {props.onBack ? (
        <IconButton
          {...props}
          icon={getDirection(props.locale) === "rtl" ? ">" : "<"}
          label="Back"
          onPress={props.onBack}
        />
      ) : null}
    </Inline>
  );
}

export const ProgressHeader = AppHeader;
export const BackButton = IconButton;

export function StepIndicator(
  props: PrototypeContext & { current: number; total: number },
) {
  return (
    <Inline>
      {Array.from({ length: props.total }).map((_, index) => (
        <View
          key={`step-${String(index + 1)}`}
          style={[
            styles.step,
            index < props.current && {
              backgroundColor:
                getRuntime(props).theme.semantic.color.brand.primary,
            },
          ]}
        />
      ))}
    </Inline>
  );
}

export function MapCanvas(props: PrototypeContext & { children?: ReactNode }) {
  const { theme } = getRuntime(props);
  const dark = props.theme === "dark";
  return (
    <View
      accessibilityLabel="Fictional Cairo and Giza prototype map"
      style={[
        styles.map,
        {
          backgroundColor: dark
            ? theme.semantic.color.background.inset
            : "#EAF0F7",
        },
      ]}
    >
      <Svg
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 390 260"
        width="100%"
      >
        <Defs>
          <LinearGradient id="snRouteMobile" x1="0" x2="1" y1="0" y2="1">
            <Stop stopColor={theme.semantic.color.brand.primary} />
            <Stop offset="1" stopColor={theme.semantic.color.brand.accent} />
          </LinearGradient>
        </Defs>
        <Rect fill={dark ? "#0B1118" : "#E7EDF6"} height="260" width="390" />
        <Path
          d="M0 196 C80 160 128 226 210 184 C286 146 318 170 390 138 L390 260 L0 260 Z"
          fill={dark ? "#0E3038" : "#D9EEF2"}
          opacity={0.46}
        />
        <Path
          d="M-20 62 C48 28 92 86 154 56 S276 38 420 82"
          fill="none"
          opacity={0.74}
          stroke={dark ? "#273343" : "#C9D3E0"}
          strokeLinecap="round"
          strokeWidth={15}
        />
        <Path
          d="M18 142 C96 92 146 170 218 124 S312 80 386 128"
          fill="none"
          stroke={dark ? "#344055" : "#CDD7E4"}
          strokeLinecap="round"
          strokeWidth={12}
        />
        <Path
          d="M42 212 C126 168 174 228 246 182 S326 154 398 198"
          fill="none"
          opacity={0.86}
          stroke={dark ? "#2A3547" : "#D5DDE8"}
          strokeLinecap="round"
          strokeWidth={10}
        />
        {Array.from({ length: 8 }).map((_, index) => {
          const start = 24 + index * 46;
          const controlOne = 38 + index * 22;
          const controlTwo = 68 + index * 12;
          const end = 54 + index * 38;
          return (
            <Path
              d={`M${String(start)} 0 C${String(controlOne)} 76 ${String(controlTwo)} 148 ${String(end)} 260`}
              fill="none"
              key={`minor-${String(index)}`}
              opacity={0.42}
              stroke={dark ? "#202A38" : "#D9E0EA"}
              strokeLinecap="round"
              strokeWidth={4}
            />
          );
        })}
        <Circle
          cx="112"
          cy="154"
          fill={theme.semantic.color.brand.primary}
          opacity={0.16}
          r="58"
        />
        <Circle
          cx="284"
          cy="126"
          fill={theme.semantic.color.brand.accent}
          opacity={0.14}
          r="68"
        />
        <Path
          d="M58 176 C126 138 176 152 226 118 S292 90 342 118"
          fill="none"
          stroke="url(#snRouteMobile)"
          strokeLinecap="round"
          strokeWidth={7}
        />
        <MapMarker
          color={theme.semantic.color.status.success}
          label="P"
          x={58}
          y={176}
        />
        <MapMarker
          color={theme.semantic.color.brand.accent}
          label="D"
          x={342}
          y={118}
        />
        <MapMarker
          color={theme.semantic.color.brand.primary}
          label="S"
          x={226}
          y={118}
        />
      </Svg>
      <View style={styles.mapChrome}>
        <StatusPill {...props} label="Protected map preview" variant="info" />
      </View>
    </View>
  );
}

function MapMarker(props: {
  x: number;
  y: number;
  color: string;
  label: string;
}) {
  const labelTransform = `translate(${String(props.x)} ${String(props.y + 4)})`;
  return (
    <G>
      <Circle cx={props.x} cy={props.y} fill={props.color} r="13" />
      <Circle
        cx={props.x}
        cy={props.y}
        fill="none"
        opacity={0.3}
        r="24"
        stroke={props.color}
        strokeWidth={4}
      />
      <SvgText
        fill="#FFFFFF"
        fontSize="10"
        fontWeight="900"
        textAnchor="middle"
        transform={labelTransform}
      >
        {props.label}
      </SvgText>
    </G>
  );
}

function Marker(props: PrototypeContext & { label: string; variant: Variant }) {
  const { theme } = getRuntime(props);
  return (
    <View
      style={[
        styles.marker,
        { backgroundColor: statusColor(theme.semantic, props.variant) },
      ]}
    >
      <NativeText style={styles.markerText}>{props.label}</NativeText>
    </View>
  );
}

export const PickupMarker = (props: PrototypeContext) => (
  <Marker {...props} label="P" variant="success" />
);
export const DestinationMarker = (props: PrototypeContext) => (
  <Marker {...props} label="D" variant="info" />
);
export const DriverMarker = (props: PrototypeContext) => (
  <Marker {...props} label="S" variant="default" />
);
export const VehicleMarker = DriverMarker;
export const RoutePath = Divider;
export const MapControl = IconButton;

export function VehicleOptionCard(
  props: PrototypeContext & {
    title: string;
    eta: string;
    fareMinor: number;
    capacity: number;
    selected?: boolean;
    onPress?: () => void;
  },
) {
  const { theme } = getRuntime(props);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: props.selected }}
      onPress={props.onPress}
      style={[
        styles.vehicleCard,
        {
          borderColor: props.selected
            ? theme.semantic.color.brand.primary
            : theme.semantic.color.border.default,
          backgroundColor: theme.semantic.color.background.surface,
          shadowColor: theme.semantic.color.brand.primary,
          shadowOpacity: props.selected ? 0.24 : 0.08,
          shadowRadius: props.selected ? 18 : 8,
          shadowOffset: { height: props.selected ? 10 : 4, width: 0 },
        },
      ]}
    >
      <Inline>
        <VehicleGlyph {...props} label={props.title} />
        <View style={{ flex: 1 }}>
          <Text {...props} role="body">
            {props.title}
          </Text>
          <Text {...props} role="caption" muted>
            {props.eta} · {props.capacity} seats
          </Text>
        </View>
        <MoneyText {...props} minorUnits={props.fareMinor} />
      </Inline>
    </Pressable>
  );
}

export function VehicleGlyph(props: PrototypeContext & { label: string }) {
  const { theme } = getRuntime(props);
  return (
    <View style={styles.vehicleGlyph}>
      <Svg height="42" viewBox="0 0 80 42" width="80">
        <Path
          d="M12 28 C18 12 28 8 43 8 H52 C64 8 70 16 74 28"
          fill={`${theme.semantic.color.brand.primary}33`}
          stroke={theme.semantic.color.brand.primary}
          strokeWidth={3}
        />
        <Path
          d="M24 25 H64"
          stroke={theme.semantic.color.brand.accent}
          strokeLinecap="round"
          strokeWidth={3}
        />
        <Circle
          cx="25"
          cy="31"
          fill="#0D1117"
          r="6"
          stroke="#F7F8FA"
          strokeWidth={2}
        />
        <Circle
          cx="62"
          cy="31"
          fill="#0D1117"
          r="6"
          stroke="#F7F8FA"
          strokeWidth={2}
        />
      </Svg>
    </View>
  );
}

export function NovaAtmosphere(
  props: PrototypeContext & { compact?: boolean },
) {
  const { theme } = getRuntime(props);
  const size = props.compact ? 180 : 280;
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[styles.atmosphere, { height: size }]}
    >
      <Svg height="100%" viewBox="0 0 320 280" width="100%">
        <Defs>
          <LinearGradient id="snAtmosphere" x1="0" x2="1" y1="0" y2="1">
            <Stop
              stopColor={theme.semantic.color.brand.primary}
              stopOpacity="0.86"
            />
            <Stop
              offset="1"
              stopColor={theme.semantic.color.brand.accent}
              stopOpacity="0.74"
            />
          </LinearGradient>
        </Defs>
        <Ellipse
          cx="160"
          cy="142"
          fill="none"
          opacity={0.36}
          rx="118"
          ry="44"
          stroke="url(#snAtmosphere)"
          strokeWidth={2}
        />
        <Ellipse
          cx="160"
          cy="142"
          fill="none"
          opacity={0.24}
          rx="82"
          ry="126"
          stroke={theme.semantic.color.brand.primary}
          strokeWidth={2}
        />
        <Circle
          cx="160"
          cy="142"
          fill="url(#snAtmosphere)"
          opacity={0.92}
          r="46"
        />
        <Circle
          cx="160"
          cy="142"
          fill={theme.semantic.color.background.canvas}
          opacity={0.58}
          r="22"
        />
        {[
          [72, 86],
          [248, 76],
          [62, 190],
          [254, 214],
          [154, 40],
          [198, 234],
        ].map(([cx, cy], index) => (
          <Circle
            cx={cx}
            cy={cy}
            fill={
              index % 2 === 0 ? theme.semantic.color.brand.accent : "#F7F8FA"
            }
            key={`star-${String(index)}`}
            opacity={0.72}
            r={index % 2 === 0 ? 3 : 2}
          />
        ))}
      </Svg>
    </View>
  );
}

export function MoneyText(
  props: PrototypeContext & { minorUnits: number; muted?: boolean },
) {
  const textProps = props.muted === undefined ? {} : { muted: props.muted };
  return (
    <Text {...props} {...textProps} role="numeric">
      {formatCurrency(props.locale, props.minorUnits)}
    </Text>
  );
}

export function ActionRow(
  props: PrototypeContext & { label: string; value: string },
) {
  return (
    <Inline style={{ justifyContent: "space-between" }}>
      <Text {...props} muted>
        {props.label}
      </Text>
      <Text {...props}>{props.value}</Text>
    </Inline>
  );
}

export function FareSummary(
  props: PrototypeContext & {
    fareMinor: number;
    distance: string;
    duration: string;
  },
) {
  return (
    <Surface {...props}>
      <Text {...props} role="caption" muted>
        Demo fare estimate
      </Text>
      <MoneyText {...props} minorUnits={props.fareMinor} />
      <ActionRow
        {...props}
        label="Route"
        value={`${props.distance} · ${props.duration}`}
      />
    </Surface>
  );
}

export function RideStatusTimeline(
  props: PrototypeContext & { items: readonly string[] },
) {
  return (
    <Stack>
      {props.items.map((item, index) => (
        <Inline key={item}>
          <StatusPill {...props} label={String(index + 1)} variant="info" />
          <Text {...props}>{item}</Text>
        </Inline>
      ))}
    </Stack>
  );
}

export function TextField(
  props: PrototypeContext & { label: string; value: string; error?: string },
) {
  const { theme } = getRuntime(props);
  return (
    <Surface {...props} style={{ padding: 12 }}>
      <Text {...props} role="caption" muted>
        {props.label}
      </Text>
      <NativeText
        accessibilityLabel={props.label}
        style={[
          styles.fieldText,
          {
            color: theme.semantic.color.text.primary,
            borderColor: props.error
              ? theme.semantic.color.status.danger
              : theme.semantic.color.border.default,
          },
        ]}
      >
        {props.value}
      </NativeText>
      {props.error ? (
        <Text
          {...props}
          role="caption"
          style={{ color: theme.semantic.color.text.danger }}
        >
          {props.error}
        </Text>
      ) : null}
    </Surface>
  );
}

export const PhoneField = TextField;
export const OTPInput = TextField;
export const PINInput = TextField;
export const SearchField = TextField;
export const SelectField = TextField;
export const Checkbox = StatusPill;
export const Radio = StatusPill;
export const DocumentUploadCard = Surface;
export const CameraCaptureCard = Surface;

export const RiderTabBar = Surface;
export const DriverTabBar = Surface;
export const EmptyState = Surface;
export const ErrorState = Surface;
export const OfflineState = Surface;
export const LoadingState = Surface;
export const Skeleton = Surface;
export const ProgressBar = StepIndicator;
export const Modal = Surface;
export const BottomSheet = Surface;
export const DriverCard = Surface;
export const RiderCard = Surface;
export const SafetyStatusCard = Surface;
export const TripProtectionIndicator = StatusPill;
export const WaitingTimer = StatusPill;
export const IncomingRideCard = Surface;
export const OnlineStatusControl = SegmentedControl;
export const NavigationInstructionCard = Surface;
export const EarningsCard = Surface;
export const LedgerRow = ActionRow;
export const PayoutStatusCard = Surface;
export const CommissionBreakdown = Surface;
export const PaymentMethodRow = ActionRow;
export const SafetyAction = Button;
export const TrustedContactCard = Surface;
export const ComplaintCategoryCard = Surface;
export const ComplaintTimeline = RideStatusTimeline;
export const EvidenceAttachmentRow = ActionRow;
export const CompensationSummary = Surface;
export const AppealCard = Surface;
export const FocusRing = Surface;
export const BrandMark = StatusPill;
export const Icon = StatusPill;

export function PrototypeFrame(
  props: PrototypeContext & {
    title: string;
    subtitle: string;
    children: ReactNode;
  },
) {
  const { direction } = getRuntime(props);
  return (
    <AppScreen {...props}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <AppHeader {...props} />
        <View style={{ transform: [{ scaleX: direction === "rtl" ? -1 : 1 }] }}>
          <MapCanvas {...props}>
            <PickupMarker {...props} />
            <DestinationMarker {...props} />
            <DriverMarker {...props} />
          </MapCanvas>
        </View>
        {props.children}
      </ScrollView>
    </AppScreen>
  );
}

export function MobileShell(props: {
  locale: Locale;
  title: string;
  subtitle: string;
  children?: ReactNode;
}) {
  return (
    <PrototypeFrame
      locale={props.locale}
      theme="light"
      title={props.title}
      subtitle={props.subtitle}
    >
      {props.children}
    </PrototypeFrame>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scroll: {
    gap: 16,
    padding: 20,
    paddingBottom: 48,
  },
  inline: {
    alignItems: "center",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
  },
  surface: {
    borderRadius: 22,
    borderWidth: 1,
    gap: 10,
    padding: 18,
  },
  title: {
    fontSize: 38,
    fontWeight: "900",
    lineHeight: 42,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 23,
  },
  caption: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
  numeric: {
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 28,
  },
  button: {
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 54,
    paddingHorizontal: 22,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
  iconButton: {
    alignItems: "center",
    borderRadius: 999,
    justifyContent: "center",
    minHeight: 44,
    minWidth: 44,
  },
  segmented: {
    borderRadius: 999,
    flexDirection: "row",
    gap: 4,
    padding: 4,
  },
  segment: {
    alignItems: "center",
    borderRadius: 999,
    flex: 1,
    minHeight: 40,
    justifyContent: "center",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
  },
  pill: {
    alignSelf: "flex-start",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  step: {
    borderRadius: 999,
    flex: 1,
    height: 6,
    backgroundColor: "#CDD4E0",
  },
  map: {
    borderRadius: 28,
    height: 320,
    overflow: "hidden",
    position: "relative",
  },
  marker: {
    alignItems: "center",
    borderRadius: 999,
    height: 32,
    justifyContent: "center",
    margin: 4,
    width: 32,
  },
  markerText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },
  vehicleCard: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 16,
  },
  vehicleGlyph: {
    alignItems: "center",
    backgroundColor: "rgba(99, 91, 255, 0.12)",
    borderRadius: 18,
    height: 52,
    justifyContent: "center",
    width: 86,
  },
  fieldText: {
    borderBottomWidth: 1,
    fontSize: 16,
    fontWeight: "700",
    paddingVertical: 8,
  },
  mapChrome: {
    left: 16,
    position: "absolute",
    top: 16,
  },
  atmosphere: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
    overflow: "hidden",
  },
});
