import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import apiClient from "@/services/apiClient";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Header from "@/components/Header";
import CheckoutMenu from "@/components/CheckoutMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addCart } from "@/store/slice/cartSlice";
import toast from "react-hot-toast";

const ProductDetails: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      apiClient
        .get(`/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product details: ", error);
        });
    }
  }, [router.query]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleSearchChange = (query: React.SetStateAction<string>) => {
    setSearchQuery(query);
  };

  const handleAddToCard = () => {
    const productToAdd = { ...product, quantity: 1 }; 
    dispatch(addCart(productToAdd));
    toast.success("Product added to cart successfully!");
  };

  return (
    <>
      <Header onSearchChange={handleSearchChange} />
      <Grid container spacing={3} className="pt-[3rem] px-[5rem]">
        <Grid item xs={12} md={9}>
          <button
            onClick={() => router.push("/home")}
            className="absolute left-2 top-[105px] w-[30px] h-[30px] rounded-tr-xl rounded-br-xl bg-[#ffe587] flex items-center justify-center duration-300"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <Card className="mt-2">
            <Grid container>
              <Grid item xs={6}>
                <CardMedia
                  component="img"
                  image={product.image}
                  className="h-full w-full object-cover"
                />
              </Grid>
              <Grid item xs={6}>
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {product.brand} - {product.model}
                  </Typography>
                  <Typography variant="h6" className="text-secondary">
                    Price: {product.price} $
                  </Typography>
                  <Button
                    variant="contained"
                    className="w-full bg-[#1068bf] mt-3"
                    size="medium"
                    onClick={() => handleAddToCard()}
                  >
                    Add To Card
                  </Button>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    className="mt-4"
                  >
                    {product.description}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <CheckoutMenu />
        </Grid>
      </Grid>
    </>
  );
};

export default ProductDetails;
