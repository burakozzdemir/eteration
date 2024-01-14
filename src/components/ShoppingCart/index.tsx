import { selectCart } from "@/store/slice/cartSlice";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

const ShoppingCart = () => {
  const cart = useSelector(selectCart);

  return (
    <div className="relative inline-block cursor-pointer">
      <FontAwesomeIcon
        icon={faShoppingCart}
        width={50}
        className="text-[#fff] scale-150 hover:text-[#ff7f50] transition duration-300"
        />
      {cart.length > 0 && (
        <span className="absolute top-0 right-1 transform translate-x-1/2 -translate-y-1/2 text-danger font-bold">
          {cart.reduce((x, y) => x + y.quantity, 0)}
        </span>
      )}
    </div>
  );
};

export default ShoppingCart;
