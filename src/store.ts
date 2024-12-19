import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

interface Store {
    order: OrderItem[]; // La orden es un array con los types de OrderItem  
    addToOrder: (product : Product) => void; // Función para agregar un item a la orden
};

export const useStore = create<Store>((set) => ({
    order: [], // Iniciar las ordenes vacías
    addToOrder: (product) => {

        const {categoryId, image, ...data} = product; // Destructurar el producto para obtener los datos necesarios

        set((state) => ({
            order: [...state.order, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }));
    }
}));