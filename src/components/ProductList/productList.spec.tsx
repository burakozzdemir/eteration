import React from "react";
import { render, screen } from "@testing-library/react";
import ProductList from "@/components/ProductList";
import "@testing-library/jest-dom";

describe("ProductList Component", () => {
  test("renders ProductList component", () => {
    const mockFilters = {
      brands: [],
      models: [],
      sortBy: "",
    };
    const mockSearchQuery = "";

    render(
      <ProductList
        filters={mockFilters}
        searchQuery={mockSearchQuery}
        brands={[]}
        models={[]}
      />
    );

    expect(screen.getByText(/...Loading/i)).toBeInTheDocument();
  });
});
