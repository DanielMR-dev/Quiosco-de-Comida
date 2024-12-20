import OrderCard from "@/components/order/OrderCard";
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

		<>
			<Heading>Administrar Ordenes</Heading>

			{orders.length ? (
				<div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
					{orders.map(order => (
						<OrderCard 
							key={order.id}
							order={order}
						/>
					))}
				</div>	
			) : <p className="text-center">No hay ordenes Pendiente</p>}
		</>
    );
};
