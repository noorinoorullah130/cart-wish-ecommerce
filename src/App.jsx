import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import UserContext from "./contexts/UserContext";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { getJwt, getUser } from "./services/userServices";
import setAuthToken from "./utils/setAuthToken";
import {
    addToCartAPI,
    decreaseProductAPI,
    getCartAPI,
    increaseProductAPI,
    removeFromCartAPI,
} from "./services/cartServices";
import "react-toastify/dist/ReactToastify.css";
import CartContext from "./contexts/CartContext";

setAuthToken(getJwt());

const App = () => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        try {
            const jwtUser = getUser();
            if (Date.now() >= jwtUser.exp * 1000) {
                localStorage.removeItem("token");
                location.reload();
            } else {
                setUser(jwtUser);
            }
        } catch (error) {}
    }, []);

    const addToCart = (product, quantity) => {
        const updatedCart = [...cart];
        const productIndex = updatedCart.findIndex(
            (item) => item.product._id === product._id
        );

        if (productIndex === -1) {
            updatedCart.push({ product, quantity });
        } else {
            updatedCart[productIndex].quantity += quantity;
        }

        setCart(updatedCart);

        addToCartAPI(product._id, quantity)
            .then((res) => {
                toast.success("Product Added Successfully!");
            })
            .catch((error) => {
                toast.error("Failed to add product!");
                setCart(cart);
            });
    };

    const removeFromCart = (id) => {
        const oldCart = [...cart];
        const newCart = oldCart.filter((item) => item.product._id !== id);
        setCart(newCart);

        removeFromCartAPI(id).catch((err) => {
            toast.error("Something went wrong");
            setCart(oldCart);
        });
    };

    const updateCart = (type, id) => {
        const oldCart = [...cart];
        const updatedCart = [...cart];
        const productIndex = updatedCart.findIndex(
            (item) => item.product._id === id
        );

        if (type === "increase") {
            updatedCart[productIndex].quantity += 1;
            setCart(updatedCart);

            increaseProductAPI(id).catch((err) => {
                toast.error("Something went wrong");
                setCart(oldCart);
            });
        }
        if (type === "decrease") {
            updatedCart[productIndex].quantity -= 1;
            setCart(updatedCart);

            decreaseProductAPI(id).catch((err) => {
                toast.error("Something went wrong");
                setCart(oldCart);
            });
        }
    };

    const getCart = () => {
        getCartAPI()
            .then((res) => {
                setCart(res.data);
            })
            .catch((err) => {
                toast.error("Something went wrong!");
            });
    };

    useEffect(() => {
        if (user) {
            getCart();
        }
    }, [user]);

    return (
        <UserContext.Provider value={user}>
            <CartContext.Provider
                value={{ cart, addToCart, removeFromCart, updateCart, setCart }}
            >
                <div className="app">
                    <Navbar />
                    <main>
                        <ToastContainer />
                        <Routing />
                    </main>
                </div>
            </CartContext.Provider>
        </UserContext.Provider>
    );
};

export default App;
