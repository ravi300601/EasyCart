import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";
import { ZmdiDelete } from "../../components/icons/icon";

function Wishlist() {
  const [loading, setLoading] = useState(true);
  const [wishListItems, setWishListItems] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  const handleRemoveFromWishlist = (item) => {
    const updatedWishListItems = wishListItems.filter(
      (wItem) => wItem.id != item.id,
    );
    setWishListItems(updatedWishListItems);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishListItems));
  };
  useEffect(() => {
    setLoading(false);
  });
  return (
    <Layout>
      {loading && <Loader />}
      <div className="w-4/5 mx-auto my-5">
        <table className="w-full">
          <thead className="border-b-2 border-black">
            <tr className="">
              <th className="py-3 text-left">Product</th>
              <th className="py-3 hidden md:table-cell"></th>
            </tr>
          </thead>
          <tbody>
            {wishListItems?.map((item) => (
              <>
                <tr className="hidden md:table-row">
                  <td className="w-4/5 border hover:bg-slate-300/20">
                    <div className="flex items-center gap-x-10 w-full p-2">
                      <Link to={"/productInfo/" + item.id}>
                        <img
                          src={item?.imageUrl}
                          className="w-36 object-cover hover:opacity-80"
                          alt="404 not found"
                        />
                      </Link>
                      <div className="font-bold">
                        <Link to={"/productInfo/" + item.id}>
                          <p className="text-gray-900 hover:text-[#5e3fde]">
                            {item?.title}
                          </p>
                        </Link>
                        <p className="text-gray-900">RS. {item.price}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 border text-center hover:bg-slate-300/20">
                    <button onClick={() => handleRemoveFromWishlist(item)}>
                      <ZmdiDelete />
                    </button>
                  </td>
                </tr>
              </>
            ))}

            {!wishListItems?.length && (
              <tr>
                <td>No Items here..</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Wishlist;
