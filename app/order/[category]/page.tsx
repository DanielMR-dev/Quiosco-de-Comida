
type CategoryProps = {
    category: string
}

export default async function OrderPage({ params } : { params:Promise<CategoryProps> }) {

    const { category } =  await params
    console.log(category);

    return (
        <div>OrderPage</div>
    );
};
