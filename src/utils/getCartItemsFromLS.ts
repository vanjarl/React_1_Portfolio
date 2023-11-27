import { CartSlyceItem } from "../../src/store/slices/cartSlyce"
import { getTotalAmount } from "./getTotalAmount";
import { getTotalPrice } from "./getTotalPrice";

export function getCartItemsFromLS () {
const value = localStorage.getItem("items");
if (typeof value === 'string') {
	const items = JSON.parse(value) as CartSlyceItem[];
	return {
		items,
		totalPrice: getTotalPrice(items),
		totalAmount: getTotalAmount(items)	
	}
}
}