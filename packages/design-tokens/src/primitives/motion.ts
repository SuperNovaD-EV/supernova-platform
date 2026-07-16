export const motion = {
  duration: {
    instant: 0,
    fast: 120,
    standard: 180,
    deliberate: 280,
  },
  easing: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    entrance: "cubic-bezier(0.16, 1, 0.3, 1)",
    exit: "cubic-bezier(0.7, 0, 0.84, 0)",
  },
  opacity: {
    disabled: 0.42,
    muted: 0.68,
    overlay: 0.72,
  },
} as const;
