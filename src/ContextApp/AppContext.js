import { Children, createContext, useState , useEffect } from "react";
import {productUrl} from '../baseUrl';
import { useLocation } from "react-router-dom";
import { IoEllipseSharp } from "react-icons/io5";

 

export const AppContext = createContext();

export default function AppContextProvider({children}){
         let cartBox = JSON.parse(localStorage.getItem("cartItems")) || [];
    const [loading , setLoading] = useState(false);
    const [products , setProducts] = useState([]);
    const [page , setPages] = useState(1);
    const [totalPages , setTotalPages] = useState(null);
    const [drawerOpen , setdrawer] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const location = useLocation();
    // console.log(location , 'sdfsd');
    async function fetchProducts(newUrl) {
        console.log(newUrl , 'url')
        setLoading(true);
        let url = `https://dummyjson.com/${newUrl}`;
        try{
            const res = await fetch(url);
            const data = await res.json();
            if(data.products){
                setProducts(data.products);
                setPages(page);
                setTotalPages(data.limit)
            }else{
                setProducts(data);
            }
                  
        }
        catch(error){
            console.log(error);
        }
        setLoading(false);

    }

 
    const value = {
        loading,
        setLoading,
        products,
        setProducts,
        page,
        setPages,
        totalPages,
        setTotalPages,
        fetchProducts,
        setdrawer,
        drawerOpen,
        cartItems,
        setCartItems,
        cartBox
    }

    return <AppContext.Provider value={value} >
    {children}
    </AppContext.Provider>
}

 