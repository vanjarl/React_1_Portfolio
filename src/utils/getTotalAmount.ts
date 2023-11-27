import { CartSlyceItem } from "../../src/store/slices/cartSlyce";

 export function getTotalAmount (items: CartSlyceItem[]) {
	return items.reduce((sum, item) => {
		return sum + item.amount;
	}, 0);
 }