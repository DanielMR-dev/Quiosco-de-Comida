"use client"
import { SearchSchema } from "@/src/schema";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ProductSearchForm() {
    const router = useRouter(); // Obtener la instancia del hook useRouter() para redirigir al usuario

    const handleSearchForm = (formData: FormData) => {
        const data = {
            search: formData.get('search'), // Se obtiene el valor del campo search
        };
        const result = SearchSchema.safeParse(data); // Validar que el objeto cumpla con el schema
        if(!result.success) { // Si no pasa la validación del Schema
            result.error.issues.forEach(issue => {
                toast.error(issue.message);
            });
            return
        };
        router.push(`/admin/products/search?search=${result.data.search}`); // Redireccionar a la ruta de búsqueda
    };

    return (
        <form 
            action={handleSearchForm}
            className="flex items-center"
        >
                <input 
                    type="text" 
                    placeholder="Buscar Producto"
                    className="p-3 placeholder-gray-400 rounded mr-2 w-full"
                    name="search"
                />

                <input 
                    type="submit" 
                    className="bg-indigo-400 hover:bg-indigo-600 p-3 uppercase text-white cursor-pointer rounded transition-colors"
                    value={'Buscar'}
                />
        </form>
    );
};
