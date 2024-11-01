import { Card } from "@/types";
import CardItem from "./CardItem";

const CardList = ({ items }: { items: Card[] }) => {
    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[60px]">
            {items.map((item) => 
                <li key={item.product_id}>
                    <CardItem item={item} />
                </li>
            )}
        </ul>
    )
}

export default CardList;