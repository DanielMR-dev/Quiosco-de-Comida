import { prisma } from "@/src/lib/prisma";

async function getProducts(category : string) {
    const products = await prisma.product.findMany({ // Buscar todos los productos
        where: {
            category: {
                slug: category
            }
        }
    });

    return products; // Retorna un array de productos
}

export default async function OrderPage({ params } : { params : { category: string} } ) {

    const category = ((await params).category); // Obtiene la categoría de la URL
    const products = await getProducts(category);
    console.log(products);

    return (
        <div>OrderPage</div>
    );
};
