import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCart,
  selectCart,
  updateQuantity,
} from "@/store/slice/cartSlice";
import apiClient from "@/services/apiClient";
import "bootstrap/dist/css/bootstrap.min.css";
import toast from "react-hot-toast";

const CheckoutMenu = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const router = useRouter();

  const [product, setProduct] = useState({});

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleQuantityChange = (productId: string, changeType: string) => {
    const productIndex = cart.findIndex((item) => item.id === productId);

    if (productIndex !== -1) {
      const updatedCart = [...cart];
      const product = { ...updatedCart[productIndex] };
      if (changeType === "increase") {
        product.quantity += 1;
      } else if (changeType === "decrease") {
        product.quantity = Math.max(1, product.quantity - 1);
      }

      updatedCart[productIndex] = product;

      dispatch(updateQuantity({ id: productId, quantity: product.quantity }));
    }
  };

  const handleClose = (product: { id: string }) => {
    dispatch(deleteCart(product.id));
    toast.success("Product successfully removed!");
  };

  useEffect(() => {
    const { id } = router.query;

    if (!id) {
      return;
    }

    apiClient
      .get(`/products/${id}`)
      .then((response) => {
        const productData = response.data[0];
        if (productData) {
          const itemInCart = cart.find((item) => item.id === productData.id);
          const initialQuantity = itemInCart ? itemInCart.quantity : 1;

          setProduct({
            ...productData,
            quantity: initialQuantity,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [router.query, cart]);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Please add products to your cart before checking out!");
    } else {
      toast.success("Your order has been placed!");
    }
  };

  return (
    <div className={`${router.query.id ? "-mt-8" : "my-4 px-1"}`}>
      <h4 className="px-2 d-flex justify-content-between align-items-center">
        <span className="text-primary">Your card</span>
        <span className="badge bg-primary rounded-pill">{cart.length}</span>
      </h4>
      <ul className="list-group">
        {cart.map((product, index) => (
          <li key={index}>
            <Card variant="outlined">
              <IconButton
                onClick={() => handleClose(product)}
                className={`flex absolute top-35 ${
                  router.query.id ? "left-0" : "right-50"
                }`}
              >
                <CloseIcon className="text-[red]" />
              </IconButton>
              <CardContent>
                <div className="flex items-center justify-between mb-1 -mt-4">
                  <div className="flex-grow">
                    <Typography>
                      {product.brand} - {product.model}
                    </Typography>
                  </div>
                  <div>
                    <Typography>{product.price} $</Typography>
                  </div>
                </div>

                <div className="flex items-center justify-center -mb-3">
                  <IconButton
                    onClick={() => handleQuantityChange(product.id, "decrease")}
                    disabled={product.quantity === 1}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography className="bg-[#1068bf] px-2 text-white">
                    {product.quantity}
                  </Typography>
                  <IconButton
                    onClick={() => handleQuantityChange(product.id, "increase")}
                  >
                    <AddIcon />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
        <li className="list-group-item d-flex justify-content-between text-primary">
          <h4 className="mt-2 text-[18px]">Total Price :</h4>
          <h4 className="mt-2 text-[18px]">
            {cart.reduce((x, y) => x + y.price * y.quantity, 0)} $
          </h4>
        </li>
        <Button
          variant="contained"
          className="w-full mx-auto bg-[#1068bf] mt-3"
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </ul>
    </div>
  );
};

export default CheckoutMenu;
