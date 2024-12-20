"use server"

import { prisma } from "@/src/lib/prisma";
import { OrderIdSchema } from "@/src/schema";

export async function completeOrder(formData : FormData) {
    const data = {
        orderId : formData.get('order_id') // Obtener el id del pedido
    }
    const result = OrderIdSchema.safeParse(data); // Validar que el id del pedido sea válido
    if(result.success) { // Si es válido cambiar el estado de la orden
        try {
            await prisma.order.update({
                where: { // Buscar la orden por id
                    id: result.data.orderId
                },
                data: { // Actualizar el estado y la hora de la orden cuando está lista
                    status: true,
                    orderReadyAt: new Date(Date.now())
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    
};