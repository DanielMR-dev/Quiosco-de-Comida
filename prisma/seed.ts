import { categories } from "./data/categories";
import { products } from "./data/products";
import { PrismaClient } from "@prisma/client"; // Funciones para interactuar con la DB

const prisma = new PrismaClient(); // Instancia de PrismaClient para interactuar con la DB

async function main() {
    try {
        await prisma.category.createMany({ // Crea las categorías
            data: categories, // Agregar el array de categories a la tabla de categories en la DB
        });
        await prisma.product.createMany({ // Crea las productos
            data: products, // Agregar el array de products a la tabla de products en la DB
        });
    } catch (error) {
        console.log(error);
    };
};

main()
    .then( async () => {
        await prisma.$disconnect(); // Cierra la conexión con la DB
    })
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1); // 
    })