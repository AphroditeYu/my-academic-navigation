export interface NavigationLink {
  id: string;
  name: string;
  url: string;
  description: string;
  logo?: string;
  icon?: string; // Optional custom cute emoji or lucide icon name
  tags?: string[];
  isPopular?: boolean;
  subLinks?: { id: string; name: string; url: string; description: string; logo?: string }[];
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Lucide icon identifier
  description: string;
  color: string; // Tailwind color class or hex values
  links: NavigationLink[];
}

export interface WallpaperPreset {
  id: string;
  name: string;
  type: "gradient" | "image";
  value: string; // Background class, style, or public image URL
  thumbnail: string;
  textColor: string;
}

export interface CharacterPreset {
  id: string;
  name: string;
  title: string;
  avatar: string; // Vector description or generic cute symbol
  accentColor: string;
  greeting: string;
  roleDescription: string;
  expressionBubble: string;
}

export interface ChatHistoryItem {
  id: string;
  sender: "user" | "companion";
  text: string;
  timestamp: string;
  actionUsed?: string; // To indicate if academic polishing/translating tool was run
}

export interface CustomBookmark {
  id: string;
  categoryId: string;
  name: string;
  url: string;
  description: string;
}
