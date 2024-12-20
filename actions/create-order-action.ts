"use server"

import { prisma } from "@/src/lib/prisma";
import { OrderSchema } from "@/src/schema"

export async function createOrder(data: unknown) {
    const result = OrderSchema.safeParse(data);
    if(!result.success) {
        return {
            errors: result.error.issues
        };
    };
    try {
        await prisma.order.create({ // Crear un nuevo pedido
            data: {  
                name: result.data.name, // Nombre del cliente
                total: result.data.total, // Total del pedido
                orderProducts: { // Crear un nuevo producto en el pedido
                    create: result.data.order.map(product => ({ //
                        productId: product.id,
                        quantity: product.quantity
                    }))
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}