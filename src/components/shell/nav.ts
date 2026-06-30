import {
  SquaresFour,
  Waves,
  Key,
  ChartBar,
  Scroll,
  Cube,
  CreditCard,
  Lifebuoy,
  BookOpen,
} from "@phosphor-icons/react";

export type NavItem = {
  to: string;
  label: string;
  icon: any; // Type compatible with Phosphor icon components
  hint?: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const NAV: NavGroup[] = [
  {
    label: "Workspace",
    items: [
      { to: "/", label: "Overview", icon: SquaresFour, hint: "G O" },
      { to: "/playground", label: "Playground", icon: Waves, hint: "G P" },
    ],
  },
  {
    label: "Develop",
    items: [
      { to: "/api-keys", label: "API keys", icon: Key },
      { to: "/usage", label: "Usage", icon: ChartBar },
      { to: "/logs", label: "Logs", icon: Scroll },
      { to: "/models", label: "Models", icon: Cube },
    ],
  },
  {
    label: "Account",
    items: [
      { to: "/billing", label: "Billing", icon: CreditCard },
      { to: "/support", label: "Support", icon: Lifebuoy },
      { to: "/docs", label: "Docs", icon: BookOpen },
    ],
  },
];
