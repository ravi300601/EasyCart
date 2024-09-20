import React, { useContext, useEffect } from "react";
import myContext from "../../context/data/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";

function ProductCard() {
  const context = useContext(myContext);
  const {
    mode,
    product,
    cartQuantity,
    setCartQuantity,
    searchkey,
    filterType,
    filterPrice,
  } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

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

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1
            className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Our Latest Collection
          </h1>
          <div className="h-1 w-20 bg-pink-600 rounded"></div>
        </div>

        <div className="flex flex-wrap -m-4">
          {product
            .filter((obj) => obj.title.toLowerCase().includes(searchkey))
            .filter((obj) =>
              obj.category.toLowerCase().includes(filterType.toLowerCase()),
            )
            .filter((obj) => {
                if (filterPrice){
                    const priceNumber = parseInt(obj.price.replace(/,/g, ""));
                    // Extract minimum and maximum prices from filterPrice string
                    const priceRange = filterPrice.slice(1, -1).split(","); // Remove brackets
                    const minPrice = parseFloat(priceRange[0]);
                    const maxPrice = parseFloat(priceRange[1]);

                    return priceNumber >= minPrice && priceNumber <= maxPrice;
                }
				return true
			}).slice(0, 8)
            .map((item, index) => {
              const { title, price, description, imageUrl, id } = item;
              const quantityInCart = getItemQuantity(item);
              return (
                <div key={index} className="p-4 md:w-1/4  drop-shadow-lg">
                  <div
                    className="border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                    style={{
                      backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    <div
                      onClick={() =>
                        (window.location.href = `/productinfo/${id}`)
                      }
                    >
                      <div className="flex justify-center cursor-pointer">
                        <img
                          className="rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out"
                          src={imageUrl}
                          alt="blog"
                        />
                      </div>
                      <div className="p-5 border-t-2">
                        <h2
                          className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          Easy Cart
                        </h2>
                        <h1
                          className="title-font text-lg font-medium text-gray-900 mb-3"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          {title}
                        </h1>
                        {/* <p className="leading-relaxed mb-3">{item.description.}</p> */}
                        <p
                          className="leading-relaxed"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          ₹{price}
                        </p>
                      </div>
                    </div>
                    <div className="mb-2 px-2">
                      {quantityInCart === 0 ? (
                        <div className="flex justify-center">
                          <button
                            type="button"
                            onClick={() => addCart(item)}
                            className="focus:outline-none text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2"
                          >
                            Add To Cart
                          </button>
                        </div>
                      ) : (
                        <div className="button-group flex justify-center">
                          <button
                            onClick={() => addQuantity(item, true)}
                            className="bg-gray-500 text-white font-bold text-xs py-2 px-4 rounded-l-lg"
                          >
                            +
                          </button>
                          <button className="bg-gray-300 text-gray-800 font-bold py-2 px-4 text-xs">
                            {quantityInCart}
                          </button>
                          <button
                            onClick={() => addQuantity(item, false)}
                            className="bg-gray-500 text-white font-bold py-2 px-4 rounded-r-lg text-xs"
                          >
                            -
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
