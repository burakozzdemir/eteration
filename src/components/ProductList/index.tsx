import React, { useEffect, useState } from "react";
import apiClient from "@/services/apiClient";
import ProductCart from "@/components/ProductCart";
import ReactPaginate from "react-paginate";
import toast from "react-hot-toast";

const ProductList: React.FC<ProductListProps> = ({ filters, searchQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [productsLoaded, setProductsLoaded] = useState<boolean>(false);

  const PER_PAGE = 12;
  const offset = currentPage * PER_PAGE;
  const currentPageData = filteredProducts.slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(filteredProducts.length / PER_PAGE);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await apiClient.get("/products");
        setProducts(response.data);
        setProductsLoaded(true); 
        toast.success("Products loaded successfully!");
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("An error occurred while loading the products!");
      }
    })();
  }, []);

  useEffect(() => {
    let sortedAndFilteredProducts = [...products];

    // Sıralama işlemi
    if (filters.sortBy === "priceHighToLow") {
      sortedAndFilteredProducts.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === "priceLowToHigh") {
      sortedAndFilteredProducts.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "newToOld") {
      sortedAndFilteredProducts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (filters.sortBy === "oldToNew") {
      sortedAndFilteredProducts.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    // Filtreleme işlemi
    sortedAndFilteredProducts = sortedAndFilteredProducts.filter((product) => {
      const matchesBrand =
        filters.brands.length === 0 || filters.brands.includes(product.brand);
      const matchesModel =
        filters.models.length === 0 || filters.models.includes(product.model);
      const matchesSearch =
        searchQuery === "" ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.model.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesBrand && matchesModel && matchesSearch;
    });

    // Filtrelenmiş ve sıralanmış ürünleri duruma kaydet
    setFilteredProducts(sortedAndFilteredProducts);
  
  }, [products, filters, searchQuery]);

  return (
    <div className="p-4">
      {productsLoaded ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-3 gap-4">
            {filteredProducts.length > 0 ? (
              currentPageData.map((product: Product) => (
                <div key={product.id} className="cursor-pointer">
                  <ProductCart product={product} />
                </div>
              ))
            ) : (
              (searchQuery !== "" || Object.values(filters).some(filter => filter.length > 0)) && (
                <div className="col-span-full flex justify-center items-center mt-[25%] ml-6">
                  <p className="text-lg font-semibold">No Results Found...</p>
                </div>
              )
            )}
          </div>
  
          {filteredProducts.length > 0 && (
            <div className="flex justify-center mt-2 mb-[90px]">
              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName="list-none flex justify-center items-center my-[1rem] font-size-[1.2rem] gap-5"
                previousLinkClassName="p-3 py-2 rounded-md font-normal hover:bg-[#1068bf] hover:text-white"
                nextLinkClassName="p-3 py-2 rounded-md font-normal hover:bg-[#1068bf] hover:text-white"
                activeClassName="bg-[#1068bf] text-white px-2"
                breakLabel={<span className="pagination__break">...</span>}
                pageRangeDisplayed={5}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center mt-[25%]">
          <p className="text-lg font-semibold">...Loading</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
