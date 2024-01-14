import { TextField } from "@mui/material";
import { useState } from "react";
import ShoppingCart from "../ShoppingCart";
import { useSelector } from "react-redux";
import { selectCart } from "@/store/slice/cartSlice";

const Header: React.FC<SearchProps> = ({ onSearchChange }) => {
  const cart = useSelector(selectCart);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e: any) => {
    setSearchValue(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <header className="bg-[#0F1035] text-white p-3">
      <div className="container mx-auto grid grid-cols-3 items-center">
        <div className="justify-self-start">
          <span className="text-xl font-bold">Eteration</span>
        </div>
        <TextField
          label="Search..."
          variant="filled"
          size="small"
          className="bg-white rounded-lg"
          value={searchValue}
          onChange={handleSearchChange}
        />
        <div className="justify-self-end flex items-center">
          <ShoppingCart />
          <div className="ml-4 flex text-[20px]">
            <span className="mr-2">Total Price:</span>
            <span className="text-[#ff7f50]">
              {cart.reduce((x, y) => x + y.price * y.quantity, 0)} $
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
