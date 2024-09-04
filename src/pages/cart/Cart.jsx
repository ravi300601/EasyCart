import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Modal from '../../components/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';


function Cart() {

    const context = useContext(myContext)
    const { mode, cartQuantity, setCartQuantity } = context;

    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart);

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));

        setCartQuantity(cartQuantity.filter(cartItem => cartItem.id !== item.id))
        toast.success("Deleted from cart");
    }

    const addQuantity = (item, increment) => {
        setCartQuantity(cartQuantity.map(cartItem => {
            if (cartItem.id === item.id) {
                const newQuantity = increment ? cartItem.quantity + 1 : Math.max(0, cartItem.quantity - 1);
                return { ...cartItem, quantity: newQuantity };
            }
            return cartItem;
        }).filter(item => item.quantity > 0));
    }

    const getItemQuantity = (item) => {
        const cartItem = cartQuantity.find(cartItem => cartItem.id === item.id);
        return cartItem ? cartItem.quantity : 0;
    };

    const [totalAmount, setTotalAmount] = useState(0);
    const [shippingAmount, setShippingAmount] = useState(0);

    useEffect(() => {
        let shipping = 0;
        let temp = 0;
        cartItems.forEach((cartItem) => {
            const cartItemQuantity = getItemQuantity(cartItem)
            if (cartItemQuantity < 1){
                dispatch(deleteFromCart(cartItem));
                return
            }
            temp = temp + parseInt(cartItem.price) * cartItemQuantity
        })
        if (temp > 0 && temp < 300){
            shipping = parseInt(100);
        }
        setTotalAmount(temp);
        setShippingAmount(shipping);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));
    }, [cartItems, cartQuantity])

    const grandTotal = shippingAmount + totalAmount;

    const [name, setName] = useState("")
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const buyNow = async () => {
        // validation
        if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
            return toast.error("All fields are required", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }

        const addressInfo = {
            name,
            address,
            pincode,
            phoneNumber,
            date: new Date().toLocaleString(
                "en-US",
                {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }
            )
        }

        var options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            key_secret: import.meta.env.VITE_RAZORPAY_SECRET_KEY,
            amount: parseInt(grandTotal * 100),
            currency: "INR",
            order_receipt: 'order_rcptid_' + name,
            name: "Easy Cart",
            description: "for testing purpose",
            handler: function (response) {

                // console.log(response)
                toast.success('Payment Successful')

                const paymentId = response.razorpay_payment_id;
                // store in firebase
                const orderInfo = {
                    cartItems,
                    addressInfo,
                    date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                    ),
                    email: JSON.parse(localStorage.getItem("user")).user.email,
                    userid: JSON.parse(localStorage.getItem("user")).user.uid,
                    paymentId
                }

                try {
                    const result = addDoc(collection(fireDB, "orders"), orderInfo)
                } catch (error) {
                    console.log(error)
                }

                cartItems.forEach((cartItem) => {
                    dispatch(deleteFromCart(cartItem));
                })
                setCartQuantity([])
            },

            theme: {
              color: "#3399cc"
            }
        };
        var pay = new window.Razorpay(options);
        pay.open();
    };

    return (
        <Layout >
            <div className="h-auto bg-gray-100 pt-5" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
                <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    <div className="rounded-lg md:w-2/3 ">
                        {cartItems.map((item, index) => {
                            const quantityInCart = getItemQuantity(item);
                            return (
                                <div className="justify-between mb-6 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
                                    <img src={item.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" onClick={() => window.location.href = `/productinfo/${item.id}`}/>
                                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                        <div className="mt-5 sm:mt-0" onClick={() => window.location.href = `/productinfo/${item.id}`}>
                                            <h2 className="text-lg font-bold text-gray-900 w-72" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
                                            <h2 className="text-sm text-gray-900 truncate w-72 my-2" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.description}</h2>
                                            <p className="mt-1 text-lg font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{item.price}</p>
                                        </div>
                                        <div className="mt-4 flex justify-between sm:mt-0 sm:space-x-2">
                                            <div className="button-group">
                                                <button onClick={() => addQuantity(item, true)} className="bg-gray-500 text-white font-bold text-xs py-2 px-4 rounded-l-lg">+</button>
                                                <button className="bg-gray-300 text-gray-800 font-bold py-2 px-4 text-xs">{quantityInCart}</button>
                                                <button onClick={() => addQuantity(item, false)} className="bg-gray-500 text-white font-bold py-2 px-4 rounded-r-lg text-xs">-</button>
                                            </div>
                                            <svg onClick={() => deleteCart(item)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-1">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 sticky top-32" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Subtotal</p>
                            <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{totalAmount}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Shipping Charge</p>
                            <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{shippingAmount}</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between mb-3">
                            <p className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total</p>
                            <div className>
                                <p className="mb-1 text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{grandTotal}</p>
                            </div>
                        </div>
                        {/* <Modal  /> */}
                        {/* Props passing */}
                        <Modal
                        name={name}
                        address={address}
                        pincode={pincode}
                        phoneNumber={phoneNumber}
                        setName={setName}
                        setAddress={setAddress}
                        setPincode={setPincode}
                        setPhoneNumber={setPhoneNumber}
                        buyNow={buyNow}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Cart
