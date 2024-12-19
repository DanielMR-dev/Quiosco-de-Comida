"use client"
import { useStore } from "@/src/store";
import OrderDetails from "./OrderDetails";
import { useMemo } from "react";
import { formatCurrency } from "@/src/utils";
import { createOrder } from "@/actions/create-order-action";
import { OrderSchema } from "@/src/schema";

export default function OrderSummary() {

    const order = useStore((state) => state.order); // Obtener el estado de la orden

    // Función para calcular el total a pagar 
    const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order]);

    const handleCreateOrder = (formData: FormData) => {
        const data = { // Crear un objeto con los datos de la orden
            name: formData.get('name')
        };

        const result = OrderSchema.safeParse(data); // Validar los datos de la orden
        console.log(result);
        return;
        createOrder();
    };

    return (
        <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
            <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

            {order.length === 0 ? <p className="text-center my-10">El pedido está vacío</p> : (
                <div className="mt-5">
                    {order.map(item => (
                        <OrderDetails 
                            key={item.id}
                            item={item}
                        />
                    ))}

                    <p className="text-2xl mt-20 text-center">
                        Total a pagar: {''}
                        <span className="font-bold">{formatCurrency(total)}</span>
                    </p>

                    <form
                        className="w-full mt-10 space-y-5"
                        action={handleCreateOrder}
                    >
                        <input 
                            type="text" 
                            placeholder="Tu Nombre"
                            className="bg-white border border-gray-100 p-2 w-full"
                            name="name"
                        />

                        <input 
                            type="submit"
                            className="py-2 rounded-lg uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
                            value="Confirmar Pedido"
                        />

                    </form>
                </div>
            )}
        </aside>
    );
};
