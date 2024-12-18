import { prisma } from "@/src/lib/prisma";

async function getCategories() {
    return await prisma.category.findMany(); // Obtener todas las categorías
}

export default async function OrderSidebar() {

    const categories = await getCategories(); // Llamar a la función para obtener las categorías
    console.log(categories);

    return (
        <aside className="md:w-72 md:h-screen bg-white">
            OrderSidebar
        </aside>
    )
}
