import { create } from 'zustand';

interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('token') : false,
  login: (token, user) => {
    if (typeof window !== 'undefined') localStorage.setItem('token', token);
    set({ token, user, isAuthenticated: true });
  },
  logout: () => {
    if (typeof window !== 'undefined') localStorage.removeItem('token');
    set({ token: null, user: null, isAuthenticated: false });
  },
}));

interface CityState {
  cityState: any;
  junctions: any[];
  roads: any[];
  hospitals: any[];
  incidents: any[];
  alerts: any[];
  predictions: any;
  weather: any;
  aqi: any;
  setCityData: (data: Partial<CityState>) => void;
}

export const useCityStore = create<CityState>((set) => ({
  cityState: null,
  junctions: [],
  roads: [],
  hospitals: [],
  incidents: [],
  alerts: [],
  predictions: null,
  weather: null,
  aqi: null,
  setCityData: (data) => set((state) => ({ ...state, ...data })),
}));

interface UIState {
  sidebarOpen: boolean;
  activeLayer: string;
  selectedJunction: any | null;
  mapCenter: [number, number];
  setSidebarOpen: (open: boolean) => void;
  setActiveLayer: (layer: string) => void;
  setSelectedJunction: (junction: any | null) => void;
  setMapCenter: (center: [number, number]) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  activeLayer: 'traffic',
  selectedJunction: null,
  mapCenter: [28.6139, 77.2090], // Delhi center
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActiveLayer: (layer) => set({ activeLayer: layer }),
  setSelectedJunction: (junction) => set({ selectedJunction: junction }),
  setMapCenter: (center) => set({ mapCenter: center }),
}));
