import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { toast } from "react-toastify";

import myContext from "../../context/data/myContext";
import { fireDB } from "../../firebase/FirebaseConfig";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";

import { BytesizeHeart, IlHeart } from "../../components/icons/icon";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";

function ProductInfo() {
  const params = useParams();
  const [isInWishList, setIsInWishList] = useState(false);
  const [wishlistItems, setWishlistItems] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });
  const [products, setProducts] = useState("");
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const context = useContext(myContext);

  const { mode, loading, setLoading, cartQuantity, setCartQuantity } = context;

  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", params.id));
      setProducts({ ...productTemp.data(), id: params.id });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const addQuantity = (item, increment) => {
    setCartQuantity(
      cartQuantity
        .map((cartItem) => {
          if (cartItem.id === item.id) {
            const newQuantity = increment
              ? cartItem.quantity + 1
              : Math.max(0, cartItem.quantity - 1);
            return { ...cartItem, quantity: newQuantity };
          }
          return cartItem;
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const getItemQuantity = (item) => {
    const cartItem = cartQuantity.find((cartItem) => cartItem.id === item.id);
    return cartItem ? cartItem.quantity : 0;
  };

  // add to cart
  const addCart = (product) => {
    const existingProduct = cartQuantity.find((item) => item.id === product.id);

    if (existingProduct) {
      // Increment quantity if the product already exists in the cart
      setCartQuantity(
        cartQuantity.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      // Add new product to cart with quantity 1
      setCartQuantity([...cartQuantity, { id: product.id, quantity: 1 }]);
    }

    dispatch(addToCart(product));
    toast.success("Product added to Cart");
  };

  // add to wishlist
  const handleOnClickWishlist = () => {
    if (!isInWishList) {
      wishlistItems.push(products);
      setWishlistItems([...wishlistItems]);
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    }
    setIsInWishList(true);
  };
  // remove from wishlist
  const handleOnClickRemoveWishList = () => {
    wishlistItems.splice(
      wishlistItems.findIndex((item) => item.id === products.id),
      1,
    );
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    setIsInWishList(false);
  };

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    cartItems.forEach((cartItem) => {
      const cartItemQuantity = getItemQuantity(cartItem);
      if (cartItemQuantity < 1) {
        dispatch(deleteFromCart(cartItem));
        return;
      }
    });
    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem("cartQuantity", JSON.stringify(cartQuantity));
  }, [cartItems, cartQuantity]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    setIsInWishList(wishlistItems.some((item) => item.id === products.id));
  });

  return (
    <Layout>
      {loading && <Loader />}
      <section
        className="text-gray-600 body-font overflow-hidden"
        style={{ color: mode === "dark" ? "white" : "" }}
      >
        <div className="container px-5 py-10 mx-auto">
          {products && (
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/3 w-full lg:h-auto object-contain object-center rounded"
                src={products.imageUrl}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  BRAND NAME
                </h2>
                <h1
                  className="text-gray-900 text-3xl title-font font-medium mb-1"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {products.title}
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-gray-600 ml-3">4 Reviews</span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                      </svg>
                    </a>
                  </span>
                </div>
                <p
                  className="leading-relaxed border-b-2 mb-5 pb-5"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {products.description}
                </p>

                <div className="flex">
                  <span
                    className="title-font font-medium text-2xl text-gray-900"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    ₹{products.price}
                  </span>

                  {getItemQuantity(products) == 0 ? (
                    <button
                      type="button"
                      onClick={() => addCart(products)}
                      className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                    >
                      Add To Cart
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => addQuantity(products, true)}
                        className="bg-gray-500 ml-auto text-white font-bold text-xs py-2 px-6 rounded-l-lg"
                      >
                        +
                      </button>
                      <button className="bg-gray-300 text-gray-800 font-bold py-2 px-6 text-xs">
                        {getItemQuantity(products)}
                      </button>
                      <button
                        onClick={() => addQuantity(products, false)}
                        className="bg-gray-500 text-white font-bold py-2 px-6 rounded-r-lg text-xs"
                      >
                        -
                      </button>
                    </>
                  )}
                  {isInWishList ? (
                    <button
                      className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                      onClick={handleOnClickRemoveWishList}
                    >
                      <IlHeart />
                    </button>
                  ) : (
                    <button
                      className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                      onClick={handleOnClickWishlist}
                    >
                      <BytesizeHeart />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default ProductInfo;
