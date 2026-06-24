import { create } from "zustand";

export type GroceryCategory = "Produce" | "Dairy" | "Bakery" | "Pantry" | "Snacks";
export type GroceryPriority = "low" | "medium" | "high";

export type GroceryItem = {
  id: string;
  name: string;
  category: GroceryCategory;
  quantity: number;
  purchased: boolean;
  priority: GroceryPriority;
};

export type CreateItemInput = {
  name: string;
  category: GroceryCategory;
  quantity: number;
  priority: GroceryPriority;
};

type ItemsResponse = { items: GroceryItem[] };
type ItemResponse = { item: GroceryItem };

type GroceryStore = {
  items: GroceryItem[];
  isLoading: boolean;
  error: string | null;
  loadItems: () => Promise<void>;
  addItem: (input: CreateItemInput) => Promise<GroceryItem | void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  togglePurchased: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearPurchased: () => Promise<void>;
};

export const useGroceryStore = create<GroceryStore>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  loadItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/items");
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const payload = (await res.json()) as ItemsResponse;
      set({ items: payload.items });
    } catch (error) {
      console.error("Error loading items:", error);
      set({ error: "Something went wrong" });
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (input) => {
    set({ error: null });

    const tempId = `temp-${Date.now()}`;
    const optimisticItem: GroceryItem = {
      id: tempId,
      name: input.name,
      category: input.category,
      quantity: Math.max(1, input.quantity),
      priority: input.priority,
      purchased: false,
    };

    set((state) => ({ items: [optimisticItem, ...state.items] }));

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: input.name,
          category: input.category,
          quantity: Math.max(1, input.quantity),
          priority: input.priority,
        }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const payload = (await res.json()) as ItemResponse;

      set((state) => ({
        items: state.items.map((item) => (item.id === tempId ? payload.item : item)),
      }));
      return payload.item;
    } catch (error) {
      console.error("Error adding item:", error);
      set((state) => ({
        items: state.items.filter((item) => item.id !== tempId), // rollback
        error: "Something went wrong",
      }));
    }
  },

  updateQuantity: async (id, quantity) => {
    const nextQuantity = Math.max(1, quantity);
    const previousItems = get().items;
    set({ error: null });

    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: nextQuantity } : item
      ),
    }));

    try {
      const res = await fetch(`/api/items/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: nextQuantity }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const payload = (await res.json()) as ItemResponse;

      set((state) => ({
        items: state.items.map((item) => (item.id === id ? payload.item : item)),
      }));
    } catch (error) {
      console.error("Error updating quantity:", error);
      set({ items: previousItems, error: "Something went wrong" }); 
    }
  },

  togglePurchased: async (id) => {
    const previousItems = get().items;
    const currentItem = previousItems.find((item) => item.id === id);
    if (!currentItem) return;

    const nextPurchased = !currentItem.purchased;
    set({ error: null });

    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, purchased: nextPurchased } : item
      ),
    }));

    try {
      const res = await fetch(`/api/items/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purchased: nextPurchased }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const payload = (await res.json()) as ItemResponse;

      set((state) => ({
        items: state.items.map((item) => (item.id === id ? payload.item : item)),
      }));
    } catch (error) {
      console.error("Error toggling purchased:", error);
      set({ items: previousItems, error: "Something went wrong" }); 
    }
  },

  removeItem: async (id) => {
    const previousItems = get().items;
    set({ error: null });

    set((state) => ({ items: state.items.filter((item) => item.id !== id) }));

    try {
      const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
    } catch (error) {
      console.error("Error removing item:", error);
      set({ items: previousItems, error: "Something went wrong" }); 
    }
  },

  clearPurchased: async () => {
    const previousItems = get().items;
    set({ error: null });

    set((state) => ({ items: state.items.filter((item) => !item.purchased) }));

    try {
      const res = await fetch("/api/items/clear-purchased", { method: "POST" });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
    } catch (error) {
      console.error("Error clearing purchased:", error);
      set({ items: previousItems, error: "Something went wrong" }); 
    }
  },
}));