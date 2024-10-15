"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    console.log('Initial localStorage cart:', storedCart);
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);
      setCartItemsCount(parsedCart.length);
      console.log('Initialized cart from localStorage:', parsedCart);
    }
    setIsInitialized(true);
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    if (isInitialized) {
      console.log('Updating localStorage with cart:', cart);
      localStorage.setItem('cart', JSON.stringify(cart));
      setCartItemsCount(cart.length);
    }
  }, [cart, isInitialized]);

  const addToCart = (product) => {
    console.log('Adding to cart:', product);
    setCart((prev) => {
      const updatedCart = [...prev, product];
      console.log('Updated cart:', updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const updatedCart = prev.filter((item) => item._id !== id);
      console.log('Removed item, updated cart:', updatedCart);
      return updatedCart;
    });
  };

  const clearCart = () => {
    console.log('Clearing cart');
    setCart([]);
  };

  const totalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalPrice, cartItemsCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};