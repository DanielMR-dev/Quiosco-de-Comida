import ProductsPagination from "@/components/products/ProductsPagination";
import ProductsTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function productCount() {
    return await prisma.product.count(); // Retorna el número de produtos
}

async function getProducts(page : number, pageSize : number) {
    const skip = (page - 1) * pageSize; // Calcular el número de productos a saltar para mostrar
    const products = await prisma.product.findMany({ // Obtener todos los productos
        take: pageSize, // Numero de productos a mostrar
        skip: skip, // Saltar los productos que no se van a mostrar
        include: {
            category: true,
        }
    }); 
    return products;
};

export type ProductsWithCategory = Awaited< ReturnType<typeof getProducts> >; // Dejar que TypeScript sepa que getProducts devuelve un arreglo de productos con categoría

export default async function ProductsPage({searchParams} : {searchParams : {page: string}}) {

    const page = +searchParams.page || 1; // Obtener el número de página actual desde los Params de la URL y si no existe, establecerlo en 1
    const pageSize = 10;

    const productsData = getProducts(page, pageSize); // Llamar a la función para obtener los productos
    const totalProductsData = productCount(); // Obtener el número total de productos
    const [ products, totalProducts ] = await Promise.all([productsData, totalProductsData]); // Obtener los datos de los productos y el número total de productos de manera asíncrona
    const totalPages = Math.ceil(totalProducts / pageSize);

    return (
        <>
            <Heading>Administrar Productos</Heading>

            <ProductsTable 
                products={products}
            />

            <ProductsPagination 
                page={page}
                totalPages={totalPages}
            />
        </>
    );
};
