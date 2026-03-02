"use client";

// Simple in-memory store using localStorage for persistence
// In a real app, this would use a proper state management library + API

export interface AppState {
  currentUser: {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    country: string;
    isLoggedIn: boolean;
  } | null;
  selectedCountry: string;
  likedVideos: string[];
  followingUsers: string[];
}

const DEFAULT_STATE: AppState = {
  currentUser: null,
  selectedCountry: "ALL",
  likedVideos: [],
  followingUsers: [],
};

export function getState(): AppState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const stored = localStorage.getItem("zerolive_state");
    if (stored) return JSON.parse(stored);
  } catch {}
  return DEFAULT_STATE;
}

export function setState(updates: Partial<AppState>): void {
  if (typeof window === "undefined") return;
  const current = getState();
  const next = { ...current, ...updates };
  localStorage.setItem("zerolive_state", JSON.stringify(next));
}

export function login(username: string, displayName: string): void {
  setState({
    currentUser: {
      id: `user_${Date.now()}`,
      username,
      displayName,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}&backgroundColor=b6e3f4`,
      country: "US",
      isLoggedIn: true,
    },
  });
}

export function logout(): void {
  setState({ currentUser: null });
}

export function toggleLike(videoId: string): boolean {
  const state = getState();
  const liked = state.likedVideos.includes(videoId);
  if (liked) {
    setState({ likedVideos: state.likedVideos.filter((id) => id !== videoId) });
    return false;
  } else {
    setState({ likedVideos: [...state.likedVideos, videoId] });
    return true;
  }
}

export function toggleFollow(userId: string): boolean {
  const state = getState();
  const following = state.followingUsers.includes(userId);
  if (following) {
    setState({ followingUsers: state.followingUsers.filter((id) => id !== userId) });
    return false;
  } else {
    setState({ followingUsers: [...state.followingUsers, userId] });
    return true;
  }
}

export function setCountry(country: string): void {
  setState({ selectedCountry: country });
}
