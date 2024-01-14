import React, { useEffect, useState } from "react";
import CheckoutMenu from "@/components/CheckoutMenu";
import FilterPanel from "@/components/FilterPanel";
import ProductList from "@/components/ProductList";
import Header from "@/components/Header";
import apiClient from "@/services/apiClient";
import { useDispatch } from "react-redux";
import { addCart } from "@/store/slice/cartSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterValues>({
    brands: [],
    models: [],
    sortBy: "oldToNew",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get<Product[]>("/products");
        const products = response.data;

        const uniqueBrands = Array.from(new Set(products.map((p) => p.brand)));
        const uniqueModels = Array.from(new Set(products.map((p) => p.model)));

        setBrands(uniqueBrands);
        setModels(uniqueModels);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setIsClient(true);
    const persistedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    persistedCart.forEach((item: CartItem) => {
      dispatch(addCart(item));
    });
  }, [dispatch]);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  const handleSearchChange = (query: React.SetStateAction<string>) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Header onSearchChange={handleSearchChange} />
      <div className="flex h-screen bg-[#EEEEEE]">
        <div className="w-1/5 ">
          <FilterPanel
            onFilterChange={handleFilterChange}
            brands={brands}
            models={models}
          />
        </div>
        <div className="w-3/5 overflow-y-auto bg-[#fff]">
          <ProductList
            filters={filters}
            searchQuery={searchQuery}
            brands={brands}
            models={models}
          />
        </div>
        <div className="w-1/5">
          <CheckoutMenu />
        </div>
      </div>
    </>
  );
};

export default Home;
