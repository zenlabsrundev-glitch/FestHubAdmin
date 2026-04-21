export type ColorTheme =
  | "red"
  | "orange"
  | "amber"
  | "green"
  | "teal"
  | "blue"
  | "purple"
  | "pink";

export const COLOR_THEMES: { value: ColorTheme; label: string; gradient: string; ring: string }[] = [
  { value: "red", label: "Red", gradient: "from-red-500 to-rose-600", ring: "ring-red-400" },
  { value: "orange", label: "Orange", gradient: "from-orange-500 to-amber-600", ring: "ring-orange-400" },
  { value: "amber", label: "Amber", gradient: "from-amber-400 to-yellow-500", ring: "ring-amber-400" },
  { value: "green", label: "Green", gradient: "from-emerald-500 to-green-600", ring: "ring-emerald-400" },
  { value: "teal", label: "Teal", gradient: "from-teal-500 to-cyan-600", ring: "ring-teal-400" },
  { value: "blue", label: "Blue", gradient: "from-blue-500 to-indigo-600", ring: "ring-blue-400" },
  { value: "purple", label: "Purple", gradient: "from-purple-500 to-violet-600", ring: "ring-purple-400" },
  { value: "pink", label: "Pink", gradient: "from-pink-500 to-fuchsia-600", ring: "ring-pink-400" },
];

export function getThemeGradient(theme: string): string {
  return COLOR_THEMES.find((t) => t.value === theme)?.gradient ?? COLOR_THEMES[5].gradient;
}