import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { addCart } from "@/store/slice/cartSlice";
import toast from "react-hot-toast";

const ProductCart: React.FC<ProductCartProps> = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAddToCard = () => {
    const productToAdd = { ...product, quantity: 1 };
    dispatch(addCart(productToAdd));
    toast.success("Product added to cart successfully!");
  };

  const goToProductDetail = (id: string) => {
    router.push(`/products/${id}`);
  };

  return (
    <>
      <Card className="m-2">
        <CardMedia
          component="img"
          height="140"
          image={product.image}
          onClick={() => goToProductDetail(product.id)}
        />
        <CardContent className="text-center">
          <Typography variant="body1" color="primary">
            {product.price} $
          </Typography>
          <Typography gutterBottom variant="h6" className="mt-2 -mb-1">
            {product.brand} - {product.model}
          </Typography>
          <Typography gutterBottom variant="h6" className="mt-2 -mb-1">
            <Typography>
              {new Date(product.createdAt).toLocaleString("tr-TR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </Typography>
          </Typography>
        </CardContent>
        <CardActions className="justify-center">
          <Button
            variant="contained"
            className="w-full bg-[#1068bf] mb-2"
            size="medium"
            onClick={() => handleAddToCard()}
          >
            Add To Card
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
export default ProductCart;
