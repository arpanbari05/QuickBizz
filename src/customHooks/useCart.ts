import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../axios.config";
import Product from "../types/Product.type";

interface Cart {
  cart_items: Product[];
  total_price: number;
}

const useCart = (user: string | null) => {
  const [cart, setCart] = useState<Cart>({ cart_items: [], total_price: 0 });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      if (user) {
        try {
          setIsLoading(true);
          const cart = await (await axios.get(baseUrl + "/cart/" + user)).data;
          setCart(cart);
        } catch (e) {}
        setIsLoading(false);
      }
    };
    fetch();
  }, [user]);

  return { cart, isLoading };
};

export default useCart;
