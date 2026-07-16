export type ThemeMode = "light" | "dark";

export type SemanticTheme = {
  color: {
    background: {
      canvas: string;
      surface: string;
      elevated: string;
      inset: string;
    };
    text: {
      primary: string;
      secondary: string;
      muted: string;
      inverse: string;
      danger: string;
    };
    border: {
      default: string;
      strong: string;
      focus: string;
    };
    brand: {
      primary: string;
      secondary: string;
      accent: string;
    };
    status: {
      success: string;
      warning: string;
      danger: string;
      info: string;
    };
    safety: {
      protected: string;
      attention: string;
      emergency: string;
    };
    map: {
      route: string;
      pickup: string;
      destination: string;
      driver: string;
      demand: string;
      accuracy: string;
    };
    chart: {
      grid: string;
      tooltip: string;
      series: readonly string[];
      areaFrom: string;
      areaTo: string;
    };
  };
};

export type LocaleDirection = "ltr" | "rtl";
