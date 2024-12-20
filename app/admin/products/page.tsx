import ProductsTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function getProducts() {
    const products = await prisma.product.findMany(); // Obtener todos los productos
    return products;
};

export default async function ProductsPage() {

    const products = await getProducts(); // Llamar a la función para obtener los productos

    return (
        <>
            <Heading>Administrar Productos</Heading>

            <ProductsTable 
                products={products}
            />
        </>
    );
};
