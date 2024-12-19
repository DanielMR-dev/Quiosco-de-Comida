"use client"

import { Product } from "@prisma/client"
import { useStore } from "@/src/store";

// Solo el botón es el que se va a ejecutar en el cliente

type AddProductButtonProps = {
    product: Product;
};

export default function AddProductButton({product} : AddProductButtonProps) {

    const addToOrder = useStore((state) => state.addToOrder); // Función para agregar producto a la orden

    return (
        <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer transition-colors rounded-lg shadow-lg"
            onClick={() => addToOrder(product)}
        >Agregar</button>
    )
}
