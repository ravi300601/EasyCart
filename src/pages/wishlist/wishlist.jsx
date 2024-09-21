import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";
import { ZmdiDelete } from "../../components/icons/icon";
import myContext from "../../context/data/myContext";

function Wishlist() {
	const [loading, setLoading] = useState(true);
	const [wishListItems, setWishListItems] = useState(() => {
		return JSON.parse(localStorage.getItem("wishlist")) || [];
	});
	const context = useContext(myContext);
	const { mode } = context;

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
					<thead
						className=""
						style={{
						border: mode === "dark" ? "white" : "",
						color: mode === "dark" ? "white" : "",
						}}
					>
						<tr className="">
						<th className="py-3 text-left">Product</th>
						<th className="py-3 md:table-cell"></th>
						</tr>
					</thead>
					<tbody>
						{wishListItems?.map((item) => (
						<>
							<tr className="md:table-row">
							<td className="w-4/5 border hover:bg-slate-300/20">
								<div className="md:flex block items-center gap-x-10 w-full p-2" onClick={() =>(window.location.href = `/productinfo/${item.id}`)}>
									<img src={item?.imageUrl}
									className="w-36 object-cover hover:opacity-80 md:mx-0 mx-auto"
									alt="404 not found"/>
									<div>
										<p className="text-gray-900"
											style={{ color: mode === "dark" ? "white" : "" }}>
											{item?.title}
										</p>
										<p className="text-gray-900"
										style={{ color: mode === "dark" ? "white" : "" }}>
										RS. {item.price}
										</p>
									</div>
								</div>
							</td>
							<td className="p-5 border text-center hover:bg-slate-300/20">
								<button onClick={() => handleRemoveFromWishlist(item)}>
								<ZmdiDelete className="dark:text-red-400" />
								</button>
							</td>
							</tr>
						</>
						))}

						{!wishListItems?.length && (
						<tr className="text-center bg-gray-100 h-20" style={{
							backgroundColor: mode === "dark" ? "#282c34" : "",
							color: mode === "dark" ? "white" : "",
						  }}>
							<td style={{color: mode === "dark" ? "white" : ""}}>
							You haven't added any items to your wishlist. Discover
							something special today!
							</td>
						</tr>
						)}
					</tbody>
				</table>
			</div>
		</Layout>
	);
}

export default Wishlist;
