// Mock data for ZERO LIVE app

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  likes: number;
  country: string;
  isVerified: boolean;
  isLive?: boolean;
}

export interface Video {
  id: string;
  userId: string;
  user: User;
  url: string;
  thumbnail: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  duration: number;
  tags: string[];
  country: string;
  createdAt: string;
  isLiked?: boolean;
  isFollowing?: boolean;
  music?: string;
}

export interface Comment {
  id: string;
  userId: string;
  user: User;
  text: string;
  likes: number;
  createdAt: string;
}

export interface LiveStream {
  id: string;
  userId: string;
  user: User;
  title: string;
  thumbnail: string;
  viewers: number;
  gifts: number;
  country: string;
  startedAt: string;
  tags: string[];
}

export interface Gift {
  id: string;
  name: string;
  emoji: string;
  coins: number;
  color: string;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
}

export const COUNTRIES: Country[] = [
  { code: "ALL", name: "All Regions", flag: "🌍" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "KR", name: "South Korea", flag: "🇰🇷" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "AE", name: "UAE", flag: "🇦🇪" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "RU", name: "Russia", flag: "🇷🇺" },
  { code: "TR", name: "Turkey", flag: "🇹🇷" },
];

export const GIFTS: Gift[] = [
  { id: "1", name: "Rose", emoji: "🌹", coins: 10, color: "#FF4444" },
  { id: "2", name: "Crown", emoji: "👑", coins: 100, color: "#D4AF37" },
  { id: "3", name: "Diamond", emoji: "💎", coins: 500, color: "#00BFFF" },
  { id: "4", name: "Rocket", emoji: "🚀", coins: 200, color: "#FF6B35" },
  { id: "5", name: "Heart", emoji: "❤️", coins: 50, color: "#FF1493" },
  { id: "6", name: "Star", emoji: "⭐", coins: 25, color: "#FFD700" },
  { id: "7", name: "Fire", emoji: "🔥", coins: 75, color: "#FF4500" },
  { id: "8", name: "Trophy", emoji: "🏆", coins: 1000, color: "#D4AF37" },
];

export const MOCK_USERS: User[] = [
  {
    id: "u1",
    username: "luxe_vida",
    displayName: "Luxe Vida",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luxe&backgroundColor=b6e3f4",
    bio: "✨ Luxury lifestyle | Travel | Fashion",
    followers: 2400000,
    following: 312,
    likes: 18500000,
    country: "AE",
    isVerified: true,
    isLive: false,
  },
  {
    id: "u2",
    username: "zero_beats",
    displayName: "Zero Beats",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=beats&backgroundColor=ffd5dc",
    bio: "🎵 Music producer | DJ | Vibes",
    followers: 890000,
    following: 156,
    likes: 5200000,
    country: "US",
    isVerified: true,
    isLive: true,
  },
  {
    id: "u3",
    username: "chef_noir",
    displayName: "Chef Noir",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chef&backgroundColor=c0aede",
    bio: "🍽️ Michelin star chef | Fine dining",
    followers: 1200000,
    following: 89,
    likes: 9800000,
    country: "FR",
    isVerified: true,
    isLive: false,
  },
  {
    id: "u4",
    username: "tokyo_style",
    displayName: "Tokyo Style",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tokyo&backgroundColor=d1d4f9",
    bio: "🗼 Fashion | Street style | Tokyo",
    followers: 3100000,
    following: 445,
    likes: 22000000,
    country: "JP",
    isVerified: true,
    isLive: false,
  },
  {
    id: "u5",
    username: "gold_fitness",
    displayName: "Gold Fitness",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fitness&backgroundColor=b6e3f4",
    bio: "💪 Elite trainer | Nutrition | Mindset",
    followers: 560000,
    following: 234,
    likes: 3400000,
    country: "GB",
    isVerified: false,
    isLive: true,
  },
  {
    id: "u6",
    username: "afro_queen",
    displayName: "Afro Queen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=afro&backgroundColor=ffd5dc",
    bio: "👸 Beauty | Culture | Empowerment",
    followers: 4500000,
    following: 678,
    likes: 35000000,
    country: "NG",
    isVerified: true,
    isLive: false,
  },
];

export const MOCK_VIDEOS: Video[] = [
  {
    id: "v1",
    userId: "u1",
    user: MOCK_USERS[0],
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: "https://picsum.photos/seed/v1/400/700",
    caption: "Living the luxury life in Dubai ✨ Nothing but the best #luxury #dubai #zerolive",
    likes: 284000,
    comments: 3200,
    shares: 12000,
    views: 2100000,
    duration: 45,
    tags: ["luxury", "dubai", "lifestyle"],
    country: "AE",
    createdAt: "2024-01-15",
    isLiked: false,
    isFollowing: false,
    music: "Gold Rush - Drake",
  },
  {
    id: "v2",
    userId: "u2",
    user: MOCK_USERS[1],
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail: "https://picsum.photos/seed/v2/400/700",
    caption: "New beat just dropped 🎵🔥 This one hits different #music #producer #beats",
    likes: 156000,
    comments: 8900,
    shares: 45000,
    views: 980000,
    duration: 30,
    tags: ["music", "producer", "beats"],
    country: "US",
    createdAt: "2024-01-14",
    isLiked: true,
    isFollowing: true,
    music: "Original Sound - Zero Beats",
  },
  {
    id: "v3",
    userId: "u3",
    user: MOCK_USERS[2],
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail: "https://picsum.photos/seed/v3/400/700",
    caption: "3-star Michelin recipe revealed 🍽️ The secret is in the sauce #cooking #chef #finedining",
    likes: 421000,
    comments: 15600,
    shares: 89000,
    views: 5600000,
    duration: 60,
    tags: ["cooking", "chef", "finedining"],
    country: "FR",
    createdAt: "2024-01-13",
    isLiked: false,
    isFollowing: false,
    music: "La Vie en Rose - Édith Piaf",
  },
  {
    id: "v4",
    userId: "u4",
    user: MOCK_USERS[3],
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnail: "https://picsum.photos/seed/v4/400/700",
    caption: "Tokyo street fashion week 🗼 The future is now #fashion #tokyo #streetstyle",
    likes: 892000,
    comments: 23400,
    shares: 156000,
    views: 12000000,
    duration: 25,
    tags: ["fashion", "tokyo", "streetstyle"],
    country: "JP",
    createdAt: "2024-01-12",
    isLiked: false,
    isFollowing: false,
    music: "Futuristic Vibes - Tokyo Style",
  },
  {
    id: "v5",
    userId: "u5",
    user: MOCK_USERS[4],
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnail: "https://picsum.photos/seed/v5/400/700",
    caption: "Morning routine that changed my life 💪 5AM club is real #fitness #motivation #health",
    likes: 67000,
    comments: 4500,
    shares: 23000,
    views: 450000,
    duration: 55,
    tags: ["fitness", "motivation", "health"],
    country: "GB",
    createdAt: "2024-01-11",
    isLiked: true,
    isFollowing: false,
    music: "Eye of the Tiger - Survivor",
  },
  {
    id: "v6",
    userId: "u6",
    user: MOCK_USERS[5],
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    thumbnail: "https://picsum.photos/seed/v6/400/700",
    caption: "African beauty secrets passed down for generations 👸✨ #beauty #culture #africa",
    likes: 1200000,
    comments: 45000,
    shares: 234000,
    views: 18000000,
    duration: 40,
    tags: ["beauty", "culture", "africa"],
    country: "NG",
    createdAt: "2024-01-10",
    isLiked: false,
    isFollowing: false,
    music: "Afrobeats Mix - Afro Queen",
  },
];

export const MOCK_LIVE_STREAMS: LiveStream[] = [
  {
    id: "l1",
    userId: "u2",
    user: MOCK_USERS[1],
    title: "🎵 Live DJ Set - Midnight Vibes",
    thumbnail: "https://picsum.photos/seed/l1/400/700",
    viewers: 45600,
    gifts: 12400,
    country: "US",
    startedAt: "2024-01-15T20:00:00Z",
    tags: ["music", "dj", "live"],
  },
  {
    id: "l2",
    userId: "u5",
    user: MOCK_USERS[4],
    title: "💪 Live Workout - Full Body Burn",
    thumbnail: "https://picsum.photos/seed/l2/400/700",
    viewers: 12300,
    gifts: 3400,
    country: "GB",
    startedAt: "2024-01-15T18:00:00Z",
    tags: ["fitness", "workout", "live"],
  },
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: "c1",
    userId: "u2",
    user: MOCK_USERS[1],
    text: "This is absolutely incredible! 🔥🔥🔥",
    likes: 1240,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "c2",
    userId: "u4",
    user: MOCK_USERS[3],
    text: "Living my best life watching this ✨",
    likes: 890,
    createdAt: "2024-01-15T10:25:00Z",
  },
  {
    id: "c3",
    userId: "u6",
    user: MOCK_USERS[5],
    text: "Goals! 👑 You inspire me every day",
    likes: 567,
    createdAt: "2024-01-15T10:20:00Z",
  },
  {
    id: "c4",
    userId: "u3",
    user: MOCK_USERS[2],
    text: "The quality of this content is unmatched 💎",
    likes: 345,
    createdAt: "2024-01-15T10:15:00Z",
  },
  {
    id: "c5",
    userId: "u1",
    user: MOCK_USERS[0],
    text: "Zero Live is the future of content! 🚀",
    likes: 234,
    createdAt: "2024-01-15T10:10:00Z",
  },
];

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function getRecommendedVideos(country: string, userId?: string): Video[] {
  // Smart recommendation: prioritize same country, then by engagement rate
  const videos = [...MOCK_VIDEOS];
  
  return videos.sort((a, b) => {
    // Boost same country content
    const aCountryBoost = a.country === country ? 2 : 1;
    const bCountryBoost = b.country === country ? 2 : 1;
    
    // Engagement rate = (likes + comments * 2 + shares * 3) / views
    const aEngagement = ((a.likes + a.comments * 2 + a.shares * 3) / a.views) * aCountryBoost;
    const bEngagement = ((b.likes + b.comments * 2 + b.shares * 3) / b.views) * bCountryBoost;
    
    return bEngagement - aEngagement;
  });
}
