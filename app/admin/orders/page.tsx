import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function getPendingOrders() {
	const orders = await prisma.order.findMany({ // Traer todos los pedidos pendientes 
		where : {
			status: false
		},
		include : { // Incluir el contenido del producto
			orderProducts : {
				include : {
					product : true
				}
			}
		}
	});

	return orders;
};

export default async function OrdersPage() {
	const orders = await getPendingOrders(); 
	console.log(orders);
    return (
        <Heading>
            Administrar Ordenes
        </Heading>
    );
};
