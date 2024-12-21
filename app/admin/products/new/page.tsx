import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";

export default function CreateProductPage() {
    return (
		<>
			<Heading>Nuevo Producto</Heading>
			
			{/* Utilizando Composición para poder renderizar un Component de Servidor dentro de un Componente de Cliente */}
			<AddProductForm>
				<ProductForm /> {/* Componente de Servidor entro de un Componente de Cliente */}		
			</AddProductForm>
		
		</>
    )
}
  