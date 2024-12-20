import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

// Función encargada de obtener todos los productos
async function getProducts(category : string) {
    const products = await prisma.product.findMany({ // Buscar todos los productos
        where: {
            category: {
                slug: category // Buscar productos por categoría
            }
        }
    });

    return products; // Retorna un array de productos
}

export default async function OrderPage({ params } : { params : { category: string} } ) {

    const category = ((await params).category); // Obtiene la categoría de la URL
    const products = await getProducts(category); // Obtiene los productos de la categoría
    // console.log(products);

    return (
        <>
            <Heading>
                Elige y personaliza tu pedido a continuación
            </Heading>

            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start">
                {products.map(product => (
                    <ProductCard 
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </>
    );
};
