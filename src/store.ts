import { create } from "zustand";
import { OrderItem } from "./types";

interface Store {
    order: OrderItem[]; // El carrito es un array con los types de OrderItem  
};

export const useStore = create<Store>(() => ({
    order: [], // Iniciar las ordenes vacías
}));