import { CartSlyceItem } from "../../src/store/slices/cartSlyce";

 export function getTotalPrice (items: CartSlyceItem[]) {
	return items.reduce((sum, item) => {
		return sum + Number(item.price) * item.amount;
	}, 0);
 }