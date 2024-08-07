import { create } from 'zustand';

// *** APP STORE ***

interface AppStore {
  // App View
  activeView: string;
  setActiveView: (view: string) => void;

  // Tables View
  selectedTable: string | null;
  setSelectedTable: (table: string) => void;

  // Order View
  activeCategory: string;
  setActiveCategory: (category: string) => void;

  // Drawer
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;

  // Shopping Cart
  items: any[];
  addItem: (item: any) => void;
  removeItem: (id: number) => void;
  clearItems: () => void;

  setState: (state: any) => void;

  // Total
  getTotal: (items: any) => number;
};

const useAppStore = create<AppStore>((set) => ({
  selectedTable: null,
  setSelectedTable: (table: string) => set({ selectedTable: table, activeView: "order" }),

  activeView: "tables",
  setActiveView: (view: string) => set({ activeView: view }),

  activeCategory: "drinks",
  setActiveCategory: (category: string) => set({ activeCategory: category }),

  drawerOpen: false,
  setDrawerOpen: (open: boolean) => set({ drawerOpen: open }),

  items: [],
  addItem: (item: any) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id: number) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  clearItems: () => set({ items: [] }),

  setState: (state: any) => set((prevState) => ({ ...prevState, ...state })),
  getTotal: (items: any) => {
    return items.reduce((total: number, item: any) => total + item.price, 0);
  }
}));


// *** SUPABASE STORE ***

interface SupabaseUser {
  id: string;
  email: string;
  app_metadata: {
      provider: string;
  };
  user_metadata: {
      name: string;
  };
}

interface SupabaseSession {
  access_token: string;
  token_type: string;
  user: SupabaseUser;
}

interface SupabaseStore {
  session: SupabaseSession | null;
  setSession: (session: SupabaseSession | null) => void;
}

const useSupabaseStore = create<SupabaseStore>((set) => ({
  // states
  session: null,
  // actions
  setSession: (session: any) => set({ session }),
}));


export { useSupabaseStore, useAppStore };
