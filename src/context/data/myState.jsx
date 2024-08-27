import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../firebase/FirebaseConfig';

function myState(props) {

    const [mode, setMode] = useState('light');

    const toggleMode = () => {
        if(mode == 'light') {
            setMode('dark')
            document.body.style.backgroundColor = "rgb(17, 24, 39)"
        }
        else{
            setMode('light')
            document.body.style.backgroundColor = "white"
        }
    }

    const [loading, setLoading] = useState(false);

    const [products, setProducts] = useState({
        title: null,
        price: null,
        imageUrl: null,
        category: null,
        description: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }
        )
    });

    const addProduct = async () => {
        if(products.title == null || products.price == null || products.imageUrl == null || 
        products.category == null || products.description == null){
            return toast.error("All fields are required")
        }

        setLoading(true)

        try{
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, products)
            toast.success("Add product successfully");
            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 800);
            getProductData();
            setLoading(false)

        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const [product, setProduct] = useState([]);

    const getProductData = async () => {

        setLoading(true)

        try {
            const q = query(
                collection(fireDB, 'products'),
                orderBy('time')
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({...doc.data(), id: doc.id})
                });
                setProduct(productArray);
                setLoading(false)
            });

            return () => data;

        } catch (error){
            console.log(error);
            setLoading(false)
        }
    }

    useEffect(() => {
        getProductData();
    }, []);

    // Update product function

    const edithandle = (item) => {
        setProducts(item)
    }

    const updateProduct = async (item) => {
        setLoading(true)
        try {
            await setDoc(doc(fireDB, 'products', products.id), products)
            toast.success("Product Updated successfully")
            getProductData();
            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 800)
            setLoading(false)

        }catch (error){
            setLoading(false)
            console.log(error);
        }
        setProducts("")
    }

    //delete product

    const deleteProduct = async (item) => {
        setLoading(true)
        try {
          setLoading(true)
          await deleteDoc(doc(fireDB, "products", item.id));
          toast.success('Product Deleted successfully')
          setLoading(false)
          getProductData()
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const [cartQuantity, setCartQuantity] = useState(() => {
        // Load cartQuantity from localStorage or initialize as an empty array
        return JSON.parse(localStorage.getItem('cartQuantity')) || [];
    });

    const [order, setOrder] = useState([]);

    const getOrderData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDB, "orders"))
            const ordersArray = [];
            result.forEach((doc) => {
            ordersArray.push(doc.data());
            setLoading(false)
            });
            setOrder(ordersArray);
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const [user, setUser] = useState([]);

    const getUserData = async () => {
        setLoading(true)
        try {
        const result = await getDocs(collection(fireDB, "users"))
        const usersArray = [];
        result.forEach((doc) => {
            const docData = doc.data();

            const updatedDocData = {
                ...docData,
                date: docData.time.toDate().toString() // Assuming time is stored in Firestore Timestamp format
            };
            usersArray.push(updatedDocData);
            setLoading(false)
        });
            setUser(usersArray);
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    useEffect(() => {
        getOrderData();
        getUserData();
    }, []);

    useEffect(() => {
        // Update localStorage whenever cartQuantity changes
        localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));
    }, [cartQuantity]);

    return (
        <MyContext.Provider value={{mode, toggleMode, loading, setLoading,
        product, products, setProducts, addProduct, order, user,
        edithandle, updateProduct, deleteProduct, cartQuantity, setCartQuantity }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default myState
