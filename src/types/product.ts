interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    model: string;
    brand: string;
    createdAt: string;
    quantity: number;
  }
  
  interface ProductCartProps {
    product: Product;
  }

  interface ProductListProps {
    searchQuery: string;
    filters: FilterValues;
    brands: string[];
    models: string[];
  }
  