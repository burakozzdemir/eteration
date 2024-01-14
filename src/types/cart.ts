type CartItem = {
    model: string;
    brand: string;
    name: string;
    quantity: number;
    price: number;
    id: string;
};

interface CartState {
    cart: CartItem[];
}
