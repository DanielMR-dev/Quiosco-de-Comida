import Heading from "@/components/ui/Heading";

export default async function SearchPage({searchParams} : {searchParams: {search: string} }) {
    const search = ((await searchParams).search); // Obtiene la búsqueda de la URL
    console.log(search);
    return (
        <>
            <Heading>Resultados de búsqueda</Heading>
        </>
    )
};