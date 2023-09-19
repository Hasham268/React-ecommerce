import React, { createContext, useContext, useEffect, useReducer } from "react"
import reducer from "../reducer/cartReducer";

const CartContext = createContext();

const getLocalCartData = () => {
    let localCartData = localStorage.getItem("shoppingCart");

    if (localCartData.length === 0) {
        return [];
    } else {
        return JSON.parse(localCartData);
    }
}

const initialState = {
    cart: getLocalCartData(),
    total_item: "",
    total_price: "",
    shipping_fee: 50000
}

const CartContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addToCart = (id, color, amount, product) => {
        dispatch({type: "ADD-TO-CART", payload: {id, color, amount, product}})
    }   

    const removeItem = (id) => {
        dispatch({ type: "REMOVE_ITEM", payload: id });
    };

    const setDecrease = (id) => {
        dispatch({ type: "SET_DECREMENT", payload: id });
    };

    const setIncrease = (id) => {
        dispatch({ type: "SET_INCREMENT", payload: id });
    };

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };

    useEffect(()=>{
        dispatch({ type: "CART_ITEM_PRICE_TOTAL" });
        localStorage.setItem('shoppingCart', JSON.stringify(state.cart))
    },[state.cart])
    

    return (
        <CartContext.Provider value={{...state, addToCart, clearCart, removeItem, setDecrease, setIncrease}}>
          {children}
        </CartContext.Provider>
      );
}

const useCartContext = () => {
    return useContext(CartContext);
};

export { CartContextProvider, CartContext, useCartContext };