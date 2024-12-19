import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

interface Store {
    order: OrderItem[]; // La orden es un array con los types de OrderItem  
    addToOrder: (product : Product) => void; // Función para agregar un item a la orden
    increaseQuantity: (id: Product['id']) => void; // Función para aumentar la cantidad de un item en la orden 
    decreaseQuantity: (id: Product['id']) => void; // Función para disminuir la cantidad de un item en la orden 
};

export const useStore = create<Store>((set, get) => ({
    order: [], // Iniciar las ordenes vacías
    addToOrder: (product) => {

        const {categoryId, image, ...data} = product; // Destructurar el producto para obtener los datos necesarios
        let order : OrderItem[] = []

        if(get().order.find( item => item.id === product.id )) { // Si ya existe un item en la orden con el mismo id, actualizarlo
            order = get().order.map( item => item.id === product.id ? { // Map para actualizar el item
                ...item, // Tomar una copia de item
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item);
        } else {
            order = [...get().order, { // Agregar el producto a la orden
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        };

        set(() => ({
            order
        }));
    },
    increaseQuantity: (id) => {
        set((state) => ({
            order: state.order.map( item => item.id === id ? {
                ...item, // Tomar una copia de item
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item )
        }))
    },
    decreaseQuantity: (id) => {
        const order = get().order.map(item => item.id === id ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: item.price * (item.quantity - 1)
        } : item)
        
        set(() => ({
            order
        }))
    }
}));